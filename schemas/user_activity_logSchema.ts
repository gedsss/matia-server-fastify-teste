import { FastifySchema } from "fastify";

export const createUserActivityLogSchema: FastifySchema = {

  body: {
    type: 'object',
    required: ['user_id', 'action_type'],
    properties: {
      user_id: { type: 'string', format: 'uuid' },
      action_type: {
        type: 'string',
        description: 'Tipo de ação realizada (Enum)',
        enum: [
          'login',
          'logout',
          'conversation_created',
          'message_sent',
          'document_uploaded',
          'document_viewed',
          'document_deleted',
          'profile_updated',
          'password_changed',
        ],
      },
      resource_type: { type: 'string', nullable: true },
      resource_id: { type: 'string', format: 'uuid', nullable: true },
      details: { type: ['object', 'array', 'null'], nullable: true },
      ip_address: { type: 'string', maxLength: 45, nullable: true },
      user_agent: { type: 'string', nullable: true },
    } as const,
    additionalProperties: false
  }
};

export const userActivityLogParamsSchema: FastifySchema = {
  params:{
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'UUID do registro de log'}
  } as const,
  additionalProperties: false
}
};