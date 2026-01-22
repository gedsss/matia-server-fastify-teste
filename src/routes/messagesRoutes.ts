import type { FastifyInstance } from 'fastify'
import * as messagesController from '../controllers/messagesController.js'

import {
  createMessagesSchema,
  messagesParamsSchema,
  updateMessagesSchema,
} from '../schemas/messagesSchema.js'

const messagesRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/messages',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Cria uma nova mensagem',
        body: createMessagesSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    messagesController.createMessages
  )

  fastify.get(
    '/messages/:id',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Busca uma mensagem pelo seu ID',
        params: messagesParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    messagesController.getMessagesById
  )

  fastify.get(
    '/messages',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Listar todas as mensagens',
      },

      preHandler: [fastify.authenticate],
    },
    messagesController.getMessages
  )

  fastify.put(
    '/messages/:id',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Atualiza o conteúdo de uma mensagem existente',
        params: messagesParamsSchema.params,
        body: updateMessagesSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    messagesController.updateMessages
  )

  fastify.delete(
    '/messages/:id',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Deleta uma mensagem pelo ID',
        params: messagesParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    messagesController.deleteMessages
  )
}

export default messagesRoutes
