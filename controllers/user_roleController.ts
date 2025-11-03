import { FastifyRequest, FastifyReply } from 'fastify'
import { ValidationErrorItem } from 'sequelize'
import userRole, { UserRoleAttributes } from '../models/user_roles.js'
import { success, fail } from '../utils/response.js'

interface CreateBody extends Omit<UserRoleAttributes, 'id' | 'created_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createUserRole = async (request : FastifyRequest<{ Body: CreateBody }>, reply: FastifyReply) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await userRole.create(payload as any)
    return success(reply, 201, { data: created.toJSON(), message: 'registro criado com sucesso' })
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', (err as any).errors as ValidationErrorItem[]);
    }
    return fail(reply, 500, 'Erro ao criar registro', err.message)
  }
}

export const getUserRoleById = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const item = await userRole.findByPk(id)
    if (!item) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar registro', err.message)
  }
}

export const updateUserRole = async (request: FastifyRequest<{ Body: UpdateBody, Params: Params }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const [updatedRows] = await userRole.update(request.body, { where: { id } })
    if (updatedRows === 0) return fail(reply, 404, 'registro não encontrado')
    const updated = await userRole.findByPk(id)
    return success(reply, 200, { data: updated?.toJSON(), message: 'registro atualizado' })
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      return fail(reply, 400, 'Dados inválidos', (err as any).errors as ValidationErrorItem[])
    }
    return fail(reply, 500, 'Erro ao atualizar registro', err.message)
  }
}

export const deleteUserRole = async (request: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
  try {
    const { id } = request.params
    const deleted = await userRole.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'registro não encontrado')
    return success(reply, 200, { message: 'registro deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar registro', err.message)
  }
}

export default {
  createUserRole,
  getUserRoleById,
  updateUserRole,
  deleteUserRole
}