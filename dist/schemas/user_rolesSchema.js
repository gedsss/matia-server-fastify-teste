export const createUserRoleSchema = {
    body: {
        type: 'object',
        required: ['user_id', 'role'],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            role: { type: 'string', enum: ['admin', 'publico'] },
        },
        additionalProperties: false,
    },
};
export const updateUserRoleSchema = {
    body: {
        type: 'object',
        required: [],
        properties: {
            user_id: { type: 'string', format: 'uuid' },
            role: { type: 'string', enum: ['admin', 'publico'] },
        },
        additionalProperties: false,
    },
};
export const userRoleParamsSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'string', format: 'uuid', description: 'UUID do registro' },
        },
        additionalProperties: false,
    },
};
//# sourceMappingURL=user_rolesSchema.js.map