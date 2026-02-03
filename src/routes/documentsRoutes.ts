import type { FastifyInstance } from 'fastify'
import * as documentsController from '../controllers/documentsController.js'

import {
  createDocumentsSchema,
  documentsParamsSchema,
  updateDocumentsSchema,
} from '../schemas/documentsSchema.js'

const documentsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Cria um novo documento (realiza o upload)',
        body: createDocumentsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    documentsController.createDocuments
  )

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Busca um documento pelo seu ID',
        params: documentsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsController.getDocumentsById
  )

  fastify.get(
    '/',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Lista todos os documentos',
      },

      preHandler: [fastify.authenticate],
    },
    documentsController.getDocuments
  )

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Atualiza metadados ou informações de um documento existente',
        params: documentsParamsSchema.params,
        body: updateDocumentsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    documentsController.updateDocuments
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['Documents'],
        summary: 'Deleta um documento pelo ID',
        params: documentsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsController.deleteDocuments
  )
}

export default documentsRoutes
