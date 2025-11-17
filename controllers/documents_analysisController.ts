import type { FastifyReply, FastifyRequest } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'
import type { DocumentsAnalysisAttributes } from '../models/documents_analysis.js'
import documentsAnalysis from '../models/documents_analysis.js'
import { fail, success } from '../utils/response.js'

interface CreateBody
  extends Omit<
    DocumentsAnalysisAttributes,
    'id' | 'created_at' | 'updated_at'
  > {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocumentsAnalisys = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      return fail(reply, 400, 'Corpo da requisição vazio')
    }
    const created = await documentsAnalysis.create(payload as any)
    return success(reply, 201, {
      data: created.toJSON(),
      message: 'analise criada com sucesso',
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
    return fail(reply, 500, 'Erro ao criar analise', err.message)
  }
}

export const getDocumentsAnalisysById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const item = await documentsAnalysis.findByPk(id)
    if (!item) return fail(reply, 404, 'analise não encontrada')
    return success(reply, 200, { data: item.toJSON() })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao buscar analise', err.message)
  }
}

export const updateDocumentsAnalisys = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await documentsAnalysis.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) return fail(reply, 404, 'analise não encontrada')
    const updated = await documentsAnalysis.findByPk(id)
    return success(reply, 200, {
      data: updated?.toJSON,
      message: 'analise atualizada',
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
    return fail(reply, 500, 'Erro ao atualizar analise', err.message)
  }
}

export const deleteDocumentsAnalisys = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await documentsAnalysis.destroy({ where: { id } })
    if (deleted === 0) return fail(reply, 404, 'analise não encontrado')
    return success(reply, 200, { message: 'analise deletado com sucesso' })
  } catch (err: any) {
    return fail(reply, 500, 'Erro ao deletar analise', err.message)
  }
}

export default {
  createDocumentsAnalisys,
  getDocumentsAnalisysById,
  updateDocumentsAnalisys,
  deleteDocumentsAnalisys,
}
