import documentsTag from '../models/documents_tags.js'
import { success, fail } from '../utils/response.js'

export const createDocumentsTags = async (request, reply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documentsTag.create(payload)
    return success(reply, 201, { data: created, message: 'tag criado com sucesso' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao criar tag', err.message)
  }
}

export const getDocumentsTagsById = async (request, reply) => {
  try {
    const { id } = request.params
    const item = await documentsTag.findByPk(id)
    if (!item) return fail(reply, 404, 'tag não encontrado')
    return success(reply, 200, { data: item })
  } catch (err) {
    return fail(reply, 500, 'Erro ao buscar tag', err.message)
  }
}

export const updateDocumentsTags = async (request, reply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await documentsTag.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'tag não encontrado')
    const updated = await documentsTag.findByPk(id)
    return success(reply, 200, { data: updated, message: 'tag atualizado' })
  } catch (err) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', err.errors)
    }
    return fail(reply, 500, 'Erro ao atualizar tag', err.message)
  }
}

export const deleteDocumentsTags = async (request, reply) => {
  try {
    const { id } = request.params
    const deleted = await documentsTag.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'tag não encontrado')
    return success(reply, 200, { message: 'tag deletado com sucesso' })
  } catch (err) {
    return fail(reply, 500, 'Erro ao deletar tag', err.message)
  }
}

export default {
  createDocumentsTags,
  getDocumentsTagsById,
  updateDocumentsTags,
  deleteDocumentsTags
}