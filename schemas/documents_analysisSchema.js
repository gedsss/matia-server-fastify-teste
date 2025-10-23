export const createDocumentsAnalysisSchema = {
  type: 'object',
  required: ['document_id'],
  properties: {
    document_id: { type: 'string', format: 'uuid' },
    conversation_id: { type: 'string', format: 'uuid' },
    analysis_type: { type: 'string', enum: ['summary', 'legal_review', 'entity_extraction'] },
  },
  additionalProperties: false
}

export const documentsAnalysisParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
  },
  additionalProperties: false
}