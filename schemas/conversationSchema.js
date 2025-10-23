export const createConversationsSchema = {
  type: 'object',
  required: ['user_id', 'title'],
  properties: {
    user_id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    is_favorite: { type: 'boolean' },
  },
  additionalProperties: false
}

export const conversationsParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do Registro'}
  },
  additionalProperties: false
}