import UserActivityLog from '../models/user_activity_log.js'
import { success, fail } from '../utils/response.js'

export const createUserActivityLog = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await UserActivityLog.create(payload)
    return success(reply, 201, { data: created, message: 'log criado com sucesso' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar log', err.message)
  }
}

export const getUserActivityLogById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await UserActivityLog.findByPk(id)
    if (!item) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar log', err.message)
  }
}

export const updateUserActivityLog = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await UserActivityLog.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'log não encontrado')
    const updated = await UserActivityLog.findByPk(id)
    return success(reply, 200, { data: updated, message: 'log atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar log', err.message)
  }
}

export const deleteUserActivityLog = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await UserActivityLog.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { message: 'log deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar log', err.message)
  }
}

export default {
  createUserActivityLog,
  getUserActivityLogById,
  updateUserActivityLog,
  deleteUserActivityLog
}