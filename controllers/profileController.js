import profile from '../models/profile.js'
import { cpf } from 'cpf-cnpj-validator'
import { success, fail } from '../utils/response.js'
import bcrypt from 'bcrypt'

export const createProfile = async (request, reply) => {
  const payload = request.body
  const cpf_number = payload.cpf

  try {
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }

    const cleanedCpf = cpf_number ? String(cpf_number).replace(/\D/g, '') : null;

    if(!cleanedCpf || !cpf.isValid(cleanedCpf)){
      return fail(reply, 400, 'Dados inválidos', [{
        message: 'O CPF fornecido é matematicamente inválido',
        path: ['cpf']
      }])
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
      }])
    }
    
    if (existingProfile){
      return fail(reply, 409, 'Erro de integridade de dados', [{
        message: 'Este CPF já está cadastrado no sitema.',
        path: ['cpf']
      }])
    }

    if (payload.password){
      const hashedPassword = await bcrypt.hash(payload.password, 10)
      payload.password = hashedPassword
    }

    const created = await profile.create(payload)
    return success(reply, 201, { data: created, message: 'Perfil criado com sucesso' })

  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar Perfil', err.message)
  }
}

export const getProfileById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await profile.findByPk(id)
    if (!item) return fail(reply, 404, 'Perfil não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar Perfil', err.message)
  }
}

export const updateProfile = async (request, reply) => {
  try {
    const { id } = request.params
    const payload = request.body
    
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio. Nenhum dado fornecido para atualização.')
    }

    if (payload.cpf){
      const cleanedCpf = String(payload.cpf).replace(/\D/g, '')

      if (!cpf.isValid(cleanedCpf)) {
        return fail(reply, 400, 'CPF inválido', [{
            message: 'O CPF fornecido é matematicamente inválido',
            path: ['cpf']
        }]);
      }
      
      payload.cpf = cleanedCpf

      const existingProfile = await profile.findOne({
        where: {
          cpf: cleanedCpf,
          id: {[ profile.sequelize.Op.ne ]: id } 
        },
        attributes: ['id']
      })

      if (existingProfile) {
        return fail(reply, 409, 'Erro de integridade', [{
          message: 'Este CPF já está cadastrado em outra conta',
          path: ['cpf']
        }]);
      }
    }

    if (payload.email) {
      const existingEmailProfile = await profile.findOne({
        where: {
          email: payload.email,
          id: {[ profile.sequelize.Op.ne ]: id } 
        },
        attributes: ['id']
      });

      if (existingEmailProfile) {
        return fail(reply, 409, 'Erro de integridade', [{
          message: 'Este e-mail já está cadastrado em outra conta.',
          path: ['email']
        }]);
      }
    }

    if (payload.password) {
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
    }

    const [updatedRows] = await profile.update(payload, { where: { id } })
    
    if (updatedRows === 0) return fail(reply, 404, 'Perfil não encontrado')
    const updated = await profile.findByPk(id)
    return success(reply, 200, { data: updated, message: 'Perfil atualizado' })
  } catch (err) {
    if (err && (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError')) {
      const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      return fail(reply, statusCode, 'Dados inválidos ou duplicados', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar Perfil', err.message)
  }
}

export const deleteProfile = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await profile.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'Perfil não encontrado')
    return success(reply, 200, { message: 'Perfil deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar perfil', err.message)
  }
}

export default {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile
}