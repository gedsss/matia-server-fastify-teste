import type { FastifySchema } from 'fastify'

export const createConversationsSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['user_id', 'title'],
    properties: {
      user_id: { type: 'string', format: 'uuid' },
      title: { type: 'string' },
      is_favorite: { type: 'boolean' },
    } as const,
    additionalProperties: false,
  },
}

export const conversationsParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
    } as const,
    additionalProperties: false,
  },
}
