import type { FastifyInstance } from 'fastify'
import * as documentsController from '../controllers/documentsController.js'

import {
  createDocumentsSchema,
  documentsParamsSchema,
  updateDocumentsSchema,
} from '../schemas/documentsSchema.js'

const documentsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/documents',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Cria um novo documento (realiza o upload)',
        body: createDocumentsSchema.body,
      },
    },
    documentsController.createDocuments
  )

  fastify.get(
    '/documents/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Busca um documento pelo seu ID',
        params: documentsParamsSchema.params,
      },
    },
    documentsController.getDocumentsById
  )

  fastify.put(
    '/documents/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Atualiza metadados ou informações de um documento existente',
        params: documentsParamsSchema.params,
        body: updateDocumentsSchema.body,
      },
    },
    documentsController.updateDocuments
  )

  fastify.delete(
    '/documents/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Deleta um documento pelo ID',
        params: documentsParamsSchema.params,
      },
    },
    documentsController.deleteDocuments
  )
}

export default documentsRoutes
