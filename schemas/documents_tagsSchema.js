export const createDocumentsTagsSchema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    color: { type: 'string' }
  },
  additionalProperties: false
}

export const documentsTagsParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
  },
  additionalProperties: false
}