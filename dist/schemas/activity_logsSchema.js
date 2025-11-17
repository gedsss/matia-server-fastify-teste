export const createActivityLogsSchema = {
    body: {
        type: 'object',
        required: ['action', 'user_id'],
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
        },
        additionalProperties: false,
    },
};
export const updateActivityLogsSchema = {
    body: {
        type: 'object',
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
        },
        additionalProperties: false,
    },
};
export const activityLogsParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
                description: 'UUID do Registro de Log de Atividade.',
            },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=activity_logsSchema.js.map