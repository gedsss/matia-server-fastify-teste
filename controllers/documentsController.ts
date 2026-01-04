import type { FastifyReply, FastifyRequest } from 'fastify'
import type { DocumentsAttributes } from '../models/documents.js'
import documents from '../models/documents.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface CreateBody
  extends Omit<DocumentsAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocuments = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await documents.create(payload as any)
    return successResponse(created, 'Documento criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao criar o documento', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getDocumentsById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await documents.findByPk(id)
    if (!item) throw new DocumentNotFoundError()
    return successResponse(item, 'Documento encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const updateDocuments = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await documents.update(request.body as UpdateBody, {
      where: { id },
    })
    if (updatedRows === 0) throw new DocumentNotFoundError()
    const updated = await documents.findByPk(id)
    return successResponse(updated, 'Documento atualizado com sucesso')
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

export const deleteDocuments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params as Params
    const deleted = await documents.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse(reply, 'Documento deletado com sucesso')
  } catch (err: any) {
    throw new InternalServerError('Erro ao deletar o documento', {
      code: ErrorCodes.DELETE_FAILED,
    })
  }
}

export default {
  createDocuments,
  getDocumentsById,
  updateDocuments,
  deleteDocuments,
}
