import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import UserActivityLog, {
  type UserActivityLogAttributes,
} from '../models/user_activity_log.js'
import { fail, success } from '../utils/response.js'

// Model `user_activity_logs` disables updatedAt, so remove it here.
interface CreateBody
  extends Omit<UserActivityLogAttributes, 'id' | 'created_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createUserActivityLog = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await UserActivityLog.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'log criado com sucesso',
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
    return fail(reply, 500, 'Erro ao criar log', err.message)
  }
}

export const getUserActivityLogById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await UserActivityLog.findByPk(id)
    if (!item) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar log', err.message)
  }
}

export const updateUserActivityLog = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await UserActivityLog.update(
      request.body as CreateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'log não encontrado')
    const updated = await UserActivityLog.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'log atualizado',
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
    return fail(reply, 500, 'Erro ao atualizar log', err.message)
  }
}

export const deleteUserActivityLog = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const deleted = await UserActivityLog.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { message: 'log deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar log', err.message)
  }
}

export default {
  createUserActivityLog,
  getUserActivityLogById,
  updateUserActivityLog,
  deleteUserActivityLog,
}
