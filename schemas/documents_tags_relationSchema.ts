import { FastifySchema } from "fastify"

export const createDocumentsTagsRelationSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['document_id', 'tag_id'],
    properties: {
      document_id: { type: 'string', format: 'uuid' },
      tag_id: { type: 'string', format: 'uuid' }
    } as const,
    additionalProperties: false
  }
}

export const documentsTagsRelationParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
    } as const,
    additionalProperties: false
  }
}