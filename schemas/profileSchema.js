
export const createProfileSchema = {
  type: 'object',
  required: ['nome', 'profile_password', 'cpf', 'data_nascimento', 'telefone', 'email'],
  properties: {
    email: { type: 'string', format: 'email' },
    profile_password: { type: 'string', minLength: 6 },
    cpf: { type: 'string' },
    telefone: { type: 'string' },
    data_nascimento: { type: 'string', format: 'date' },
    nome: { type: 'string' },
    avatar_url: { type: 'string', format: 'url'},
  },
  additionalProperties: false
}

export const profileParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', format: 'uuid' }
  },
  additionalProperties: false
}