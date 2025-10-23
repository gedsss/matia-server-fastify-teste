export const createDocumentsTagsRelationSchema = {
  type: 'object',
  required: ['document_id', 'tag_id'],
  properties: {
    document_id: { type: 'string', format: 'uuid' },
    tag_id: { type: 'string', format: 'uuid' }
  },
  additionalProperties: false
}

export const documentsTagsRelationParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
  },
  additionalProperties: false
}