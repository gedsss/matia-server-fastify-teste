import userRole from '../models/user_roles.js'
import { success, fail } from '../utils/response.js'

export const createUserRole = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await userRole.create(payload)
    return success(reply, 201, { data: created, message: 'registro criado com sucesso' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar registro', err.message)
  }
}

export const getUserRoleById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await userRole.findByPk(id)
    if (!item) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar registro', err.message)
  }
}

export const updateUserRole = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await userRole.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'registro não encontrado')
    const updated = await userRole.findByPk(id)
    return success(reply, 200, { data: updated, message: 'registro atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar registro', err.message)
  }
}

export const deleteUserRole = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await userRole.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { message: 'registro deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar registro', err.message)
  }
}

export default {
  createUserRole,
  getUserRoleById,
  updateUserRole,
  deleteUserRole
}