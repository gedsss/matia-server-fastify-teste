import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ConversationAttributes } from '../models/conversation.js'
import conversation from '../models/conversation.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
  DataBaseError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface CreateBody
  extends Omit<ConversationAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createConversation = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await conversation.create(payload as any)
    const data = created.toJSON()
    return successResponse(data, 'Documento criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao criar o documento', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getConversationById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await conversation.findByPk(id)
    if (!item) throw new DocumentNotFoundError()
    return successResponse(item, 'Documento encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const getConversation = async () => {
  try {
    const item = await conversation.findAll()
    if (item.length === 0) {
      return successResponse([], 'nenhum Conversation encontrado')
    }
    return successResponse(item, 'listando todos os Conversations')
  } catch (err: any) {
    throw new DataBaseError()
  }
}

export const updateConversation = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await conversation.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) throw new DocumentNotFoundError()
    const updated = await conversation.findByPk(id)
    return successResponse(updated, 'Documento atualizado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao atualizar o documento', {
      code: ErrorCodes.UPDATE_FAILED,
    })
  }
}

export const deleteConversation = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await conversation.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse('Documento deletado com sucesso')
  } catch (err: any) {
    throw new InternalServerError('Erro ao deletar o documento')
  }
}

export default {
  createConversation,
  getConversationById,
  updateConversation,
  deleteConversation,
}
