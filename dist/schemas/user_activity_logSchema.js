export const createUserActivityLogSchema = {
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
        },
        additionalProperties: false,
    },
};
export const updateUserActivityLogSchema = {
    body: {
        type: 'object',
        required: [],
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
        },
        additionalProperties: false,
    },
};
export const userActivityLogParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                description: 'UUID do registro de log',
            },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=user_activity_logSchema.js.map