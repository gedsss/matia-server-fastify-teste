export const createConversationDocumentsSchema = {
    body: {
        type: 'object',
        required: ['document_id', 'conversation_id'],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            conversation_id: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
    },
};
export const updateConversationsDocumentsSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            conversation_id: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
    },
};
export const conversationDocumentsParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=conversation_documentsSchema.js.map