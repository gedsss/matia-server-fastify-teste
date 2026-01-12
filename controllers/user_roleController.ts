import type { FastifyReply, FastifyRequest } from 'fastify'
import userRole, { type UserRoleAttributes } from '../models/user_roles.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface CreateBody extends Omit<UserRoleAttributes, 'id' | 'created_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createUserRole = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await userRole.create(payload as any)
    return successResponse(created, 'Cargo criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos.')
    }
    throw new InternalServerError('Erro ao criar o registro', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getUserRoleById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await userRole.findByPk(id)
    if (!item) throw new DocumentNotFoundError()
    return successResponse(item, 'Registro encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const updateUserRole = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await userRole.update(request.body as UpdateBody, {
      where: { id },
    })
    if (updatedRows === 0) throw new DocumentNotFoundError()
    const updated = await userRole.findByPk(id)
    return successResponse(updated, 'Registro atualizado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao atualizar o registro', {
      code: ErrorCodes.UPDATE_FAILED,
    })
  }
}

export const deleteUserRole = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await userRole.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse('Registro deletado com sucesso')
  } catch (err: any) {
    throw new ValidationError('Erro ao deletar o registro', {
      code: ErrorCodes.DELETE_FAILED,
    })
  }
}

export default {
  createUserRole,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
}
