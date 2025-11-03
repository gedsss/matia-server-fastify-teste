import { FastifyRequest, FastifyReply } from 'fastify'
import { ValidationErrorItem, Op } from 'sequelize' 
import profile, { ProfileAttributes } from '../models/profile.js' 
import { cpf } from 'cpf-cnpj-validator'
import { success, fail } from '../utils/response.js'
import bcrypt from 'bcrypt'

// Interface para o formato de erro que você está passando no 'fail'
interface CustomErrorDetail {
  message: string;
  path: string[];
}

interface CreateBody extends Omit<ProfileAttributes, 'id' | 'created_at' | 'updated_at'> {
    cpf: string;
    email: string;
    password?: string;
}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createProfile = async (
    request: FastifyRequest<{ Body: CreateBody }>, 
    reply: FastifyReply
) => {
  const payload = request.body
  const cpf_number = payload.cpf

  try {
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }

    const cleanedCpf = String(cpf_number).replace(/\D/g, '')

    if(!cleanedCpf || !cpf.isValid(cleanedCpf)){
      return fail(reply, 400, 'Dados inválidos', [{
        message: 'O CPF fornecido é matematicamente inválido',
        path: ['cpf']
      } as CustomErrorDetail]) // <--- CORREÇÃO AQUI
    }

    payload.cpf = cleanedCpf

    const existingProfile = await profile.findOne({
      where: { cpf: cleanedCpf },
      attributes: ['id']
    })

    const existingEmail = await profile.findOne({
      where: { email: payload.email },
      attributes: ['id']
    })

    if (existingEmail){
      return fail(reply, 409, 'Erro de integridade de dados', [{
        message: 'Este e-mail já está cadastrado no sistema.',
        path: ['email']
      } as CustomErrorDetail]) // <--- CORREÇÃO AQUI
    }
    
    if (existingProfile){
      return fail(reply, 409, 'Erro de integridade de dados', [{
        message: 'Este CPF já está cadastrado no sitema.',
        path: ['cpf']
      } as CustomErrorDetail]) // <--- CORREÇÃO AQUI
    }

    if (payload.password){
      const hashedPassword = await bcrypt.hash(payload.password, 10)
      payload.password = hashedPassword
    }

    const created = await profile.create(payload as any)
    return success(reply, 201, { data: created.toJSON(), message: 'Perfil criado com sucesso' })

  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', (err as any).errors as (ValidationErrorItem | CustomErrorDetail)[]) // <--- CORREÇÃO AQUI (para o catch)
    }
    return fail(reply, 500, 'Erro ao criar Perfil', err.message)
  }
}

// ... (O restante das funções updateProfile e deleteProfile também precisam de correções semelhantes onde o fail é usado com arrays customizados)

// Exemplo da correção em updateProfile:

export const updateProfile = async (
    request: FastifyRequest<{ Body: UpdateBody, Params: Params }>, 
    reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const payload = request.body
    
    // ...
    
    if (payload.cpf){
      const cleanedCpf = String(payload.cpf).replace(/\D/g, '')

      if (!cpf.isValid(cleanedCpf)) {
        return fail(reply, 400, 'CPF inválido', [{
            message: 'O CPF fornecido é matematicamente inválido',
            path: ['cpf']
        } as CustomErrorDetail]); // <--- CORREÇÃO AQUI
      }
      
      payload.cpf = cleanedCpf

      const existingProfile = await profile.findOne({
        where: {
          cpf: cleanedCpf,
          id: { [Op.ne]: id } 
        },
        attributes: ['id']
      })

      if (existingProfile) {
        return fail(reply, 409, 'Erro de integridade', [{
          message: 'Este CPF já está cadastrado em outra conta',
          path: ['cpf']
        } as CustomErrorDetail]); // <--- CORREÇÃO AQUI
      }
    }

    if (payload.email) {
      const existingEmailProfile = await profile.findOne({
        where: {
          email: payload.email,
          id: { [Op.ne]: id } 
        },
        attributes: ['id']
      });

      if (existingEmailProfile) {
        return fail(reply, 409, 'Erro de integridade', [{
          message: 'Este e-mail já está cadastrado em outra conta.',
          path: ['email']
        } as CustomErrorDetail]); // <--- CORREÇÃO AQUI
      }
    }
    
    // ... (o restante da função)

    // Tratamento de erro no catch do updateProfile
  } catch (err: any) {
    const isValidationError = err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError');
    if (isValidationError) {
      const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      return fail(reply, statusCode, 'Dados inválidos ou duplicados', (err as any).errors as (ValidationErrorItem | CustomErrorDetail)[]) // <--- CORREÇÃO AQUI (para o catch)
    }
    return fail(reply, 500, 'Erro ao atualizar Perfil', err.message)
  }
}

// ... (Restante das funções que não usam o quarto argumento customizado estão OK)