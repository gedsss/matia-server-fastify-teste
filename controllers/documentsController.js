import documents from '../models/documents.js'
import { success, fail } from '../utils/response.js'

export const createDocuments = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documents.create(payload)
    return success(reply, 201, { data: created, message: 'documento criado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar documento', err.message)
  }
}

export const getDocumentsById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await documents.findByPk(id)
    if (!item) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar documento', err.message)
  }
}

export const updateDocuments = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await documents.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'documento não encontrado')
    const updated = await documents.findByPk(id)
    return success(reply, 200, { data: updated, message: 'documento atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar documento', err.message)
  }
}

export const deleteDocuments = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await documents.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { message: 'documento deletado' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar documento', err.message)
  }
}

export default {
  createDocuments,
  getDocumentsById,
  updateDocuments,
  deleteDocuments
}