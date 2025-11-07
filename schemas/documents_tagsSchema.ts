import type { FastifySchema } from 'fastify'

export const createDocumentsTagsSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      color: { type: 'string' },
    } as const,
    additionalProperties: false,
  },
}

export const documentsTagsParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
    } as const,
    additionalProperties: false,
  },
}
