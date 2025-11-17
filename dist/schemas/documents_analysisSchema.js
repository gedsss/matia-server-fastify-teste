export const createDocumentsAnalysisSchema = {
    body: {
        type: 'object',
        required: ['document_id', 'conversation_id', 'analysis_type'],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            conversation_id: { type: 'string', format: 'uuid' },
            analysis_type: {
                type: 'string',
                enum: ['summary', 'legal_review', 'entity_extraction'],
            },
        },
        additionalProperties: false,
    },
};
export const updateDocumentsAnalysisSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            document_id: { type: 'string', format: 'uuid' },
            conversation_id: { type: 'string', format: 'uuid' },
            analysis_type: {
                type: 'string',
                enum: ['summary', 'legal_review', 'entity_extraction'],
            },
        },
        additionalProperties: false,
    },
};
export const documentsAnalysisParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do Registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=documents_analysisSchema.js.map