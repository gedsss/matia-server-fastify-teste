export const createUserRoleSchema = {
    type: 'object',
    required: ['user_id', 'role'],
    properties: {
    user_id: { type: 'string', format: 'uuid' },
    role: { type: 'string', enum: ['admin', 'publico'] },
  },
  additionalProperties: false
}

export const userRoleParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid', description: 'UUID do registro'}
  },
  additionalProperties: false
}