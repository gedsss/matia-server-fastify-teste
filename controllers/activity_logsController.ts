import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationError, ValidationErrorItem } from 'sequelize'
import type { ActivityLogsAttributes } from '../models/activity_logs.js'
import activityLogs from '../models/activity_logs.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<ActivityLogsAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createActivityLogs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await activityLogs.create(payload as any)
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
        (err as ValidationError).errors as ValidationErrorItem[]
      )
    }
    return fail(reply, 500, 'Erro ao criar log', err.message)
  }
}

export const getActivityLogsById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await activityLogs.findByPk(id)
    if (!item) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar log', err.message)
  }
}

export const updateActivityLogs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await activityLogs.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'log não encontrado')
    const updated = await activityLogs.findByPk(id)
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
        (err as ValidationError).errors as ValidationErrorItem[]
      )
    }
    return fail(reply, 500, 'Erro ao atualizar log', err.message)
  }
}

export const deleteActivityLogs = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await activityLogs.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'log não encontrado')
    return success(reply, 200, { message: 'log deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar log', err.message)
  }
}

export default {
  createActivityLogs,
  getActivityLogsById,
  updateActivityLogs,
  deleteActivityLogs,
}
