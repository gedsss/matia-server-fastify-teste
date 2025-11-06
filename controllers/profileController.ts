import { FastifyRequest, FastifyReply } from 'fastify'
import { ValidationErrorItem, Op } from 'sequelize'
import profile, { ProfileAttributes } from '../models/profile.js'
import { cpf } from 'cpf-cnpj-validator'
import { success, fail } from '../utils/response.js'
import bcrypt from 'bcrypt'

// Erro customizado compatível com utils/response.ts
interface CustomErrorDetail {
  message: string;
  path: string[];
}

// Create body: omit DB-only fields and map `password` -> `profile_password`
interface CreateBody extends Omit<ProfileAttributes, 'id' | 'creation_time' | 'updated_at' | 'profile_password'> {
  profile_password?: string;
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

  try {
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }

    if (!payload.cpf) return fail(reply, 400, 'CPF obrigatório')
    if (!payload.email) return fail(reply, 400, 'E-mail obrigatório')
    if (!payload.nome) return fail(reply, 400, 'Nome obrigatório')
    if (!payload.telefone) return fail(reply, 400, 'Telefone obrigatório')
    if (!payload.data_nascimento) return fail(reply, 400, 'Data de nascimento obrigatória')
    if (!payload.profile_password) return fail(reply, 400, 'Senha obrigatória')

    const cleanedCpf = String(payload.cpf).replace(/\D/g, '')
    if (!cpf.isValid(cleanedCpf)) {
      return fail(reply, 400, 'Dados inválidos', [{ message: 'O CPF fornecido é matematicamente inválido', path: ['cpf'] } as CustomErrorDetail])
    }

    // checa unicidade
    const existingProfile = await profile.findOne({ where: { cpf: cleanedCpf }, attributes: ['id'] })
    if (existingProfile) return fail(reply, 409, 'Erro de integridade de dados', [{ message: 'Este CPF já está cadastrado no sistema.', path: ['cpf'] } as CustomErrorDetail])

    const existingEmail = await profile.findOne({ where: { email: payload.email }, attributes: ['id'] })
    if (existingEmail) return fail(reply, 409, 'Erro de integridade de dados', [{ message: 'Este e-mail já está cadastrado no sistema.', path: ['email'] } as CustomErrorDetail])

    const existingPhone = await profile.findOne({ where: { telefone: payload.telefone }, attributes: ['id'] })
    if (existingPhone) return fail(reply, 409, 'Erro de integridade de dados', [{ message: 'Este telefone já está cadastrado no sistema.', path: ['telefone'] } as CustomErrorDetail])

    const hashedPassword = await bcrypt.hash(payload.profile_password as string, 10)

    const createPayload: any = {
      cpf: cleanedCpf,
      email: payload.email,
      nome: payload.nome,
      telefone: payload.telefone,
      data_nascimento: payload.data_nascimento,
      avatar_url: payload.avatar_url ?? null,
      profile_password: hashedPassword
    }

    const created = await profile.create(createPayload)
    const data = created.toJSON() as any
    delete data.profile_password

    return success(reply, 201, { data, message: 'Perfil criado com sucesso' })
  } catch (err: any) {
    const isValidationError = err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')
    if (isValidationError) {
      const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      return fail(reply, statusCode, 'Dados inválidos ou duplicados', (err as any).errors as (ValidationErrorItem | CustomErrorDetail)[])
    }
    return fail(reply, 500, 'Erro ao criar Perfil', err?.message ?? String(err))
  }
}

export const getProfileById = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const item = await profile.findByPk(id)
    if (!item) return fail(reply, 404, 'Perfil não encontrado')
    const data = item.toJSON() as any
    delete data.profile_password
    return success(reply, 200, { data })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar Perfil', err?.message ?? String(err))
  }
}

export const updateProfile = async (
  request: FastifyRequest<{ Body: UpdateBody, Params: Params }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const payload = request.body || {}

    if (payload.cpf) {
      const cleanedCpf = String(payload.cpf).replace(/\D/g, '')
      if (!cpf.isValid(cleanedCpf)) {
        return fail(reply, 400, 'CPF inválido', [{ message: 'O CPF fornecido é matematicamente inválido', path: ['cpf'] } as CustomErrorDetail])
      }
      payload.cpf = cleanedCpf as any

      const existingProfile = await profile.findOne({ where: { cpf: cleanedCpf, id: { [Op.ne]: id } }, attributes: ['id'] })
      if (existingProfile) return fail(reply, 409, 'Erro de integridade', [{ message: 'Este CPF já está cadastrado em outra conta', path: ['cpf'] } as CustomErrorDetail])
    }

    if (payload.email) {
      const existingEmailProfile = await profile.findOne({ where: { email: payload.email, id: { [Op.ne]: id } }, attributes: ['id'] })
      if (existingEmailProfile) return fail(reply, 409, 'Erro de integridade', [{ message: 'Este e-mail já está cadastrado em outra conta.', path: ['email'] } as CustomErrorDetail])
    }

    if (payload.telefone) {
      const existingPhone = await profile.findOne({ where: { telefone: payload.telefone, id: { [Op.ne]: id } }, attributes: ['id'] })
      if (existingPhone) return fail(reply, 409, 'Erro de integridade', [{ message: 'Este telefone já está cadastrado em outra conta.', path: ['telefone'] } as CustomErrorDetail])
    }

    // map possible password field to profile_password
    const updatePayload: any = { ...payload }
    if ((payload as any).password) {
      updatePayload.profile_password = await bcrypt.hash((payload as any).password, 10)
      delete updatePayload.password
    }

    // Prevent updating DB-managed timestamps directly
    delete updatePayload.creation_time
    delete updatePayload.updated_at

    const [updatedRows] = await profile.update(updatePayload, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'Perfil não encontrado')
    const updated = await profile.findByPk(id)
    const data = updated?.toJSON() as any
    if (data) delete data.profile_password
    return success(reply, 200, { data, message: 'Perfil atualizado' })
  } catch (err: any) {
    const isValidationError = err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')
    if (isValidationError) {
      const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      return fail(reply, statusCode, 'Dados inválidos ou duplicados', (err as any).errors as (ValidationErrorItem | CustomErrorDetail)[])
    }
    return fail(reply, 500, 'Erro ao atualizar Perfil', err?.message ?? String(err))
  }
}

export const deleteProfile = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const deleted = await profile.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'Perfil não encontrado')
    return success(reply, 200, { message: 'Perfil deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar Perfil', err?.message ?? String(err))
  }
}

export default {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile
}