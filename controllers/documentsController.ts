import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { DocumentsAttributes } from '../models/documents.js'
import documents from '../models/documents.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<DocumentsAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocuments = async (
  request: FastifyRequest<{ Body: CreateBody }>,
  reply: FastifyReply
) => {
  try {
    const payload = request.body
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documents.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'documento criado',
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

export const getDocumentsById = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const item = await documents.findByPk(id)
    if (!item) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar documento', err.message)
  }
}

export const updateDocuments = async (
  request: FastifyRequest<{ Body: UpdateBody; Params: Params }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const [updatedRows] = await documents.update(request.body, {
      where: { id },
    })
    if (updatedRows === 0) return fail(reply, 404, 'documento não encontrado')
    const updated = await documents.findByPk(id)
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

export const deleteDocuments = async (
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params
    const deleted = await documents.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'documento não encontrado')
    return success(reply, 200, { message: 'documento deletado' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar documento', err.message)
  }
}

export default {
  createDocuments,
  getDocumentsById,
  updateDocuments,
  deleteDocuments,
}
