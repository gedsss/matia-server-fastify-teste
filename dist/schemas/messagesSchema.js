export const createMessagesSchema = {
    body: {
        type: 'object',
        required: ['conversations_id', 'content', 'role'],
        properties: {
            conversations_id: { type: 'string', format: 'uuid' },
            content: { type: 'string' },
            role: { type: 'string', enum: ['user', 'assistant', 'system'] },
            metadata: { type: 'object' },
        },
        additionalProperties: false,
    },
};
export const updateMessagesSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            conversations_id: { type: 'string', format: 'uuid' },
            content: { type: 'string' },
            role: { type: 'string', enum: ['user', 'assistant', 'system'] },
            metadata: { type: 'object' },
        },
        additionalProperties: false,
    },
};
export const messagesParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'ID do documento' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=messagesSchema.js.map