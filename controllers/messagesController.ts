import type { FastifyReply, FastifyRequest } from 'fastify'
import messages, { type MessagesAttributes } from '../models/messages.js'
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
  extends Omit<MessagesAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createMessages = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await messages.create(payload as any)
    return successResponse(created, 'Registro criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro a criar o registro', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getMessagesById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await messages.findByPk(id)
    if (!item) throw new DocumentNotFoundError()
    return successResponse(item, 'Registro encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const getMessages = async () => {
  try {
    const item = await messages.findAll()
    if (item.length === 0) {
      return successResponse([], 'nenhum Messages encontrado')
    }
    return successResponse(item, 'listando todos os Messages')
  } catch (err: any) {
    throw new DataBaseError()
  }
}

export const updateMessages = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await messages.update(request.body as UpdateBody, {
      where: { id },
    })
    if (updatedRows === 0) throw new DocumentNotFoundError()
    const updated = await messages.findByPk(id)
    return successResponse(updated, 'Documento encontrado com sucesso')
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

export const deleteMessages = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await messages.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse('Documento deletado com sucesso')
  } catch (err: any) {
    throw new ValidationError('Erro ao deletar o documentos', {
      code: ErrorCodes.DELETE_FAILED,
    })
  }
}

export default {
  createMessages,
  getMessagesById,
  updateMessages,
  deleteMessages,
}
