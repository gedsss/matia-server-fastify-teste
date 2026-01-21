import { type FastifyReply, type FastifyRequest } from 'fastify'
import UserActivityLog, {
  type UserActivityLogAttributes,
} from '../models/user_activity_log.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
  DataBaseError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

// Model `user_activity_logs` disables updatedAt, so remove it here.
interface CreateBody
  extends Omit<UserActivityLogAttributes, 'id' | 'created_at'> {}

interface Params {
  id: string
}

export const createUserActivityLog = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await UserActivityLog.create(payload as any)
    return successResponse(created, 'Log criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao criar o Log', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getUserActivityLogById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await UserActivityLog.findByPk(id)
    if (!item) throw new DocumentNotFoundError()
    return successResponse(item, 'Documento encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const getUserActivityLogBy = async () => {
  try {
    const item = await UserActivityLog.findAll()
    if (item.length === 0) {
      return successResponse([], 'nenhum UserActivityLog encontrado')
    }
    return successResponse(item, 'listando todos os UserActivityLog')
  } catch (err: any) {
    throw new DataBaseError()
  }
}

export const updateUserActivityLog = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await UserActivityLog.update(
      request.body as CreateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) throw new DocumentNotFoundError()
    const updated = await UserActivityLog.findByPk(id)
    return successResponse(updated, 'Log encontrado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao atualizar o Log', {
      code: ErrorCodes.UPDATE_FAILED,
    })
  }
}

export const deleteUserActivityLog = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await UserActivityLog.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse('Documento deletado com sucesso')
  } catch (err: any) {
    throw new InternalServerError('Erro ao deletar o documento', {
      code: ErrorCodes.DELETE_FAILED,
    })
  }
}

export default {
  createUserActivityLog,
  getUserActivityLogById,
  updateUserActivityLog,
  deleteUserActivityLog,
}
