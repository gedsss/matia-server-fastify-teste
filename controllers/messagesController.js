import messages from '../models/messages.js'
import { success, fail } from '../utils/response.js'

export const createMessages = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await messages.create(payload)
    return success(reply, 201, { data: created, message: 'messages criado com sucesso' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar messages', err.message)
  }
}

export const getMessagesById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await messages.findByPk(id)
    if (!item) return fail(reply, 404, 'messages não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar messages', err.message)
  }
}

export const updateMessages = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await messages.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'messages não encontrado')
    const updated = await messages.findByPk(id)
    return success(reply, 200, { data: updated, message: 'messages atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar messages', err.message)
  }
}

export const deleteMessages = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await messages.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'messages não encontrado')
    return success(reply, 200, { message: 'messages deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar messages', err.message)
  }
}

export default {
  createMessages,
  getMessagesById,
  updateMessages,
  deleteMessages
}