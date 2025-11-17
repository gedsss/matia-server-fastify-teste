export const createDocumentsSchema = {
    body: {
        type: 'object',
        required: [
            'user_id',
            'original_name',
            'storage_path',
            'file_type',
            'file_size',
        ],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            original_name: { type: 'string' },
            storage_path: { type: 'string' },
            file_type: { type: 'string' },
            file_size: { type: 'string' },
        },
        additionalProperties: false,
    },
};
export const updateDocumentsSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            original_name: { type: 'string' },
            storage_path: { type: 'string' },
            file_type: { type: 'string' },
            file_size: { type: 'string' },
        },
        additionalProperties: false,
    },
};
export const documentsParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=documentsSchema.js.map