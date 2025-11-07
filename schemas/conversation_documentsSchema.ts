import type { FastifySchema } from 'fastify'

export const createConversationDocumentsSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['document_id', 'conversation_id'],
    properties: {
      document_id: { type: 'string', format: 'uuid' },
      conversation_id: { type: 'string', format: 'uuid' },
    } as const,
    additionalProperties: false,
  },
}

export const conversationDocumentsParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
    } as const,
    additionalProperties: false,
  },
}
