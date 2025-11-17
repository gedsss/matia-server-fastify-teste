import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { DocumentsTagsRelationsAttributes } from '../models/documents_tags_relation.js'
import documentsTagRelation from '../models/documents_tags_relation.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<
    DocumentsTagsRelationsAttributes,
    'id' | 'created_at' | 'updtade_at'
  > {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocumentsTagsRelation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documentsTagRelation.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'relação de tag criado com sucesso',
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
    return fail(reply, 500, 'Erro ao criar relação de tag', err.message)
  }
}

export const getDocumentsTagsRelationById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await documentsTagRelation.findByPk(id)
    if (!item) return fail(reply, 404, 'tag não encontrado')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar relação de tag', err.message)
  }
}

export const updateDocumentsTagsRelation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await documentsTagRelation.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0)
      return fail(reply, 404, 'relação de tag não encontrado')
    const updated = await documentsTagRelation.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON(),
      message: 'relação de tag atualizado',
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
    return fail(reply, 500, 'Erro ao atualizar relação de tag', err.message)
  }
}

export const deleteDocumentsTagsRelation = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await documentsTagRelation.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'relação de tag não encontrado')
    return success(reply, 200, {
      message: 'relação de tag deletado com sucesso',
    })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar relação de tag', err.message)
  }
}

export default {
  createDocumentsTagsRelation,
  getDocumentsTagsRelationById,
  updateDocumentsTagsRelation,
  deleteDocumentsTagsRelation,
}
