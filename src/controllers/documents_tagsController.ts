import type { FastifyReply, FastifyRequest } from 'fastify'
import type { DocumentsTagsAttributes } from '../models/documents_tags.js'
import documentsTag from '../models/documents_tags.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
  DataBaseError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface CreateBody
  extends Omit<DocumentsTagsAttributes, 'id' | 'created_at' | 'updated_at'> {}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createDocumentsTags = async (request: FastifyRequest) => {
  try {
    const payload = request.body as CreateBody
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }
    const created = await documentsTag.create(payload as any)
    const data = created.toJSON()
    return successResponse(data, 'Relatório criado com sucesso')
  } catch (err: any) {
    if (err && err.name === 'SequelizeValidationError') {
      throw new ValidationError('Dados inválidos', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao criar o relatório', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getDocumentsTagsById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await documentsTag.findByPk(id)
    const data = item?.toJSON()
    if (!item) throw new DocumentNotFoundError()
    return successResponse(data, 'Documento encontrado com sucesso')
  } catch (err: any) {
    throw new DocumentNotFoundError()
  }
}

export const getDocumentsTags = async () => {
  try {
    const item = await documentsTag.findAll()
    if (item.length === 0) {
      return successResponse([], 'nenhum DocumentsTags encontrado')
    }
    return successResponse(item, 'listando todos os DocumentsTags')
  } catch (err: any) {
    throw new DataBaseError()
  }
}

export const updateDocumentsTags = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const [updatedRows] = await documentsTag.update(
      request.body as UpdateBody,
      {
        where: { id },
      }
    )
    if (updatedRows === 0) throw new DocumentNotFoundError()
    return successResponse(updatedRows, 'Documento atualizado com sucesso')
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

export const deleteDocumentsTags = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await documentsTag.destroy({ where: { id } })
    if (deleted === 0) throw new DocumentNotFoundError()
    return successResponse('Documento deletado com sucesso')
  } catch (err: any) {
    throw new InternalServerError('Erro ao deletar o documento', {
      code: ErrorCodes.DELETE_FAILED,
    })
  }
}

export default {
  createDocumentsTags,
  getDocumentsTagsById,
  updateDocumentsTags,
  deleteDocumentsTags,
}
