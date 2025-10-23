export const createActivityLogsSchema = {
  type: 'object',
  required: ['action'],
  properties: {
    action: { 
        type: 'string'
    },
    user_id: { 
        type: 'string', 
        format: 'uuid'
    },
    entity_type: { 
        type: 'string'
    },
    entity_id: { 
        type: 'string', 
        format: 'uuid'
    },
    metadata: { 
        type: 'object'
    },
    ip_address: { 
        type: 'string'
    }
  },
  additionalProperties: false
}

export const activityLogsParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { 
        type: 'string', 
        format: 'uuid', 
        description: 'UUID do Registro de Log de Atividade.'
    }
  },
  additionalProperties: false
}