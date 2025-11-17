export const createDocumentsTagsRelationSchema = {
    body: {
        type: 'object',
        required: ['document_id', 'tag_id'],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            tag_id: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
    },
};
export const updateDocumentsTagsRelationSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            tag_id: { type: 'string', format: 'uuid' },
        },
        additionalProperties: false,
    },
};
export const documentsTagsRelationParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=documents_tags_relationSchema.js.map