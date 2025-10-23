import conversationDocuments from '../models/conversation_documents.js'
import { success, fail } from '../utils/response.js'

export const createConversationDocuments = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await conversationDocuments.create(payload)
    return success(reply, 201, { data: created, message: 'documento criado com sucesso' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar documento', err.message)
  }
}

export const getConversationDocumentsById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await conversationDocuments.findByPk(id)
    if (!item) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar documento', err.message)
  }
}

export const updateConversationDocuments = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await conversationDocuments.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'documento não encontrado')
    const updated = await conversationDocuments.findByPk(id)
    return success(reply, 200, { data: updated, message: 'documento atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar documento', err.message)
  }
}

export const deleteConversationDocuments = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await conversationDocuments.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { message: 'documento deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar documento', err.message)
  }
}

export default {
  createConversationDocuments,
  getConversationDocumentsById,
  updateConversationDocuments,
  deleteConversationDocuments
}