export const createDocumentsTagsSchema = {
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string' },
            color: { type: 'string' },
        },
        additionalProperties: false,
    },
};
export const updateDocumentsTagsSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            name: { type: 'string' },
            color: { type: 'string' },
        },
        additionalProperties: false,
    },
};
export const documentsTagsParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=documents_tagsSchema.js.map