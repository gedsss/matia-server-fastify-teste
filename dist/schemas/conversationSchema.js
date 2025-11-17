export const createConversationsSchema = {
    body: {
        type: 'object',
        required: ['user_id', 'title'],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            is_favorite: { type: 'boolean' },
        },
        additionalProperties: false,
    },
};
export const updateConversationsSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            is_favorite: { type: 'boolean' },
        },
        additionalProperties: false,
    },
};
export const conversationsParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=conversationSchema.js.map