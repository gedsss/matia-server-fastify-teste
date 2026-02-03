import type { FastifyInstance } from 'fastify'
import * as documentsTagsController from '../controllers/documents_tagsController.js'

import {
  createDocumentsTagsSchema,
  documentsTagsParamsSchema,
  updateDocumentsTagsSchema,
} from '../schemas/documents_tagsSchema.js'

const documentsTagsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['DocumentsTags'],
        summary: 'Cria uma nova tag para documentos',
        body: createDocumentsTagsSchema.body,
      },

      preHandler: [fastify.authenticate],
    } as const,
    documentsTagsController.createDocumentsTags
  )

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['DocumentsTags'],
        summary: 'Busca uma tag de documento pelo seu ID',
        params: documentsTagsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsTagsController.getDocumentsTagsById
  )

  fastify.get(
    '/',
    {
      schema: {
        tags: ['DocumentsTags'],
        summary: 'Lista todas as tags de documentos',
      },
      preHandler: [fastify.authenticate],
    },
    documentsTagsController.getDocumentsTags
  )

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['DocumentsTags'],
        summary: 'Atualiza uma tag de documento existente',
        params: documentsTagsParamsSchema.params,
        body: updateDocumentsTagsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    documentsTagsController.updateDocumentsTags
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['DocumentsTags'],
        summary: 'Deleta uma tag de documento pelo ID',
        params: documentsTagsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsTagsController.deleteDocumentsTags
  )
}

export default documentsTagsRoutes
