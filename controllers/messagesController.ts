import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import messages, { type MessagesAttributes } from '../models/messages.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<MessagesAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createMessages = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await messages.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'messages criado com sucesso',
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
    return fail(reply, 500, 'Erro ao criar messages', err.message)
  }
}

export const getMessagesById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await messages.findByPk(id)
    if (!item) return fail(reply, 404, 'messages não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar messages', err.message)
  }
}

export const updateMessages = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await messages.update(request.body as UpdateBody, {
      where: { id },
    })
    if (updatedRows === 0) return fail(reply, 404, 'messages não encontrado')
    const updated = await messages.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'messages atualizado',
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
    return fail(reply, 500, 'Erro ao atualizar messages', err.message)
  }
}

export const deleteMessages = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await messages.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'messages não encontrado')
    return success(reply, 200, { message: 'messages deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar messages', err.message)
  }
}

export default {
  createMessages,
  getMessagesById,
  updateMessages,
  deleteMessages,
}
