import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { ConversationAttributes } from '../models/conversation.js'
import conversation from '../models/conversation.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<ConversationAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createConversation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await conversation.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'registro criado com sucesso',
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
    return fail(reply, 500, 'Erro ao criar registro', err.message)
  }
}

export const getConversationById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await conversation.findByPk(id)
    if (!item) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar registro', err.message)
  }
}

export const updateConversation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await conversation.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'registro não encontrado')
    const updated = await conversation.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'registro atualizado',
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
    return fail(reply, 500, 'Erro ao atualizar registro', err.message)
  }
}

export const deleteConversation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await conversation.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { message: 'registro deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar registro', err.message)
  }
}

export default {
  createConversation,
  getConversationById,
  updateConversation,
  deleteConversation,
}
