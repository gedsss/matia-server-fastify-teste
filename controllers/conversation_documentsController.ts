import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { ConversationDocumentsAttributes } from '../models/conversation_documents.js'
import conversationDocuments from '../models/conversation_documents.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<
    ConversationDocumentsAttributes,
    'id' | 'created_at' | 'updated_at'
  > {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createConversationDocuments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await conversationDocuments.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'documento criado com sucesso',
    })
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(
        reply,
        400,
        'Dados inválidos',
        (err as any).errors as ValidationErrorItem[]
      )
    }
    return fail(reply, 500, 'Erro ao criar documento', err.message)
  }
}

export const getConversationDocumentsById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await conversationDocuments.findByPk(id)
    if (!item) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar documento', err.message)
  }
}

export const updateConversationDocuments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await conversationDocuments.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'documento não encontrado')
    const updated = await conversationDocuments.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'documento atualizado',
    })
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(
        reply,
        400,
        'Dados inválidos',
        (err as any).errors as ValidationErrorItem[]
      )
    }
    return fail(reply, 500, 'Erro ao atualizar documento', err.message)
  }
}

export const deleteConversationDocuments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await conversationDocuments.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { message: 'documento deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar documento', err.message)
  }
}

export default {
  createConversationDocuments,
  getConversationDocumentsById,
  updateConversationDocuments,
  deleteConversationDocuments,
}
