import type { FastifySchema } from 'fastify'

export const createActivityLogsSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['action'],
    properties: {
      action: {
        type: 'string',
        enum: ['pendente', 'em_progresso', 'concluido'],
      },
      user_id: {
        type: 'string',
        format: 'uuid',
      },
      entity_type: {
        type: 'string',
        enum: ['document', 'user', 'conversation'],
      },
      entity_id: {
        type: 'string',
        format: 'uuid',
      },
      metadata: {
        type: 'object',
      },
      ip_address: {
        type: 'string',
      },
    } as const,
    additionalProperties: false,
  },
}

export const activityLogsParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'UUID do Registro de Log de Atividade.',
      },
    } as const,
    additionalProperties: false,
  },
}
