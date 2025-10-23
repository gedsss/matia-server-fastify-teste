export const createConversationDocumentsSchema = {
  type: 'object',
  required: ['document_id', 'conversation_id'],
  properties: {
    document_id: { type: 'string', format: 'uuid' },
    conversation_id: { type: 'string', format: 'uuid' },
  },
  additionalProperties: false
}

export const conversationDocumentsParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
  },
  additionalProperties: false
}