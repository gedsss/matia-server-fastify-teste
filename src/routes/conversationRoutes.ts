import type { FastifyInstance } from 'fastify'
import * as conversationsController from '../controllers/conversationController.js'

import {
  conversationsParamsSchema,
  createConversationsSchema,
  updateConversationsSchema,
} from '../schemas/conversationSchema.js'

const conversationsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['Conversations'],
        summary: 'Inicia uma nova conversa',
        body: createConversationsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    conversationsController.createConversation
  )

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['Conversations'],
        summary: 'Busca uma conversa pelo seu ID',
        params: conversationsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    conversationsController.getConversationById
  )

  fastify.get(
    '/',
    {
      schema: {
        tags: ['Conversations'],
        summary: 'Lista todas as conversas',
      },
      preHandler: [fastify.authenticate],
    },
    conversationsController.getConversation
  )

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['Conversations'],
        summary: 'Atualiza uma conversa existente (metadados)',
        params: conversationsParamsSchema.params,
        body: updateConversationsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    conversationsController.updateConversation
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['Conversations'],
        summary: 'Deleta uma conversa pelo ID',
        params: conversationsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    conversationsController.deleteConversation
  )
}

export default conversationsRoutes
