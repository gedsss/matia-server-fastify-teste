import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { DocumentsTagsAttributes } from '../models/documents_tags.js'
import documentsTag from '../models/documents_tags.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<DocumentsTagsAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocumentsTags = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documentsTag.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'tag criado com sucesso',
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
    return fail(reply, 500, 'Erro ao criar tag', err.message)
  }
}

export const getDocumentsTagsById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await documentsTag.findByPk(id)
    if (!item) return fail(reply, 404, 'tag não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar tag', err.message)
  }
}

export const updateDocumentsTags = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await documentsTag.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'tag não encontrado')
    const updated = await documentsTag.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'tag atualizado',
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
    return fail(reply, 500, 'Erro ao atualizar tag', err.message)
  }
}

export const deleteDocumentsTags = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await documentsTag.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'tag não encontrado')
    return success(reply, 200, { message: 'tag deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar tag', err.message)
  }
}

export default {
  createDocumentsTags,
  getDocumentsTagsById,
  updateDocumentsTags,
  deleteDocumentsTags,
}
