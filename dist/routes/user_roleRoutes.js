import * as userRoleController from '../controllers/user_roleController.js';
import { createUserRoleSchema, userRoleParamsSchema, updateUserRoleSchema, } from '../schemas/user_rolesSchema.js';
const userRoleRoutes = async (fastify) => {
    fastify.post('/user-role', {
        schema: {
            tags: ['UserRole'],
            summary: 'Associa uma nova função (role) a um usuário',
            body: createUserRoleSchema.body,
        },
    }, userRoleController.createUserRole);
    fastify.get('/user-role/:id', {
        schema: {
            tags: ['UserRole'],
            summary: 'Busca a associação usuário/função pelo ID',
            params: userRoleParamsSchema.params,
        },
    }, userRoleController.getUserRoleById);
    fastify.put('/user-role/:id', {
        schema: {
            tags: ['UserRole'],
            summary: 'Atualiza a associação de função de um usuário existente',
            params: userRoleParamsSchema.params,
            body: updateUserRoleSchema.body,
        },
    }, userRoleController.updateUserRole);
    fastify.delete('/user-role/:id', {
        schema: {
            tags: ['UserRole'],
            summary: 'Remove a função de um usuário pelo ID da associação',
            params: userRoleParamsSchema.params,
        },
    }, userRoleController.deleteUserRole);
};
export default userRoleRoutes;
//# sourceMappingURL=user_roleRoutes.js.map