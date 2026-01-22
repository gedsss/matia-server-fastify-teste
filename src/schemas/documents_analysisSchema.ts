import type { FastifySchema } from 'fastify'

export const createDocumentsAnalysisSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['document_id', 'conversation_id', 'analysis_type'],
    properties: {
      document_id: { type: 'string', format: 'uuid' },
      conversation_id: { type: 'string', format: 'uuid' },
      analysis_type: {
        type: 'string',
        enum: ['summary', 'legal_review', 'entity_extraction'],
      },
    } as const,
    additionalProperties: false,
  },
}

export const updateDocumentsAnalysisSchema: FastifySchema = {
  body: {
    type: 'object',
    required: [],
    properties: {
      document_id: { type: 'string', format: 'uuid' },
      conversation_id: { type: 'string', format: 'uuid' },
      analysis_type: {
        type: 'string',
        enum: ['summary', 'legal_review', 'entity_extraction'],
      },
    } as const,
    additionalProperties: false,
  },
}

export const documentsAnalysisParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
    } as const,
    additionalProperties: false,
  },
}
