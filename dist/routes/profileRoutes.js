import * as profileController from '../controllers/profileController.js';
import { createProfileSchema, profileParamsSchema, updateProfileSchema, } from '../schemas/profileSchema.js';
const profileRoutes = async (fastify) => {
    // ROTA POST / (Criação)
    fastify.post('/profile', {
        schema: {
            tags: ['Profile'],
            summary: 'Cria um novo usuário no sistema',
            body: createProfileSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, profileController.createProfile);
    // ROTA GET /:id (Busca)
    fastify.get('/profile/:id', {
        schema: {
            tags: ['Profile'],
            summary: 'Busca um usuário pelo seu ID',
            params: profileParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, profileController.getProfileById);
    // ROTA PUT /:id (Atualização)
    fastify.put('/profile/:id', {
        schema: {
            tags: ['Profile'],
            summary: 'Atualiza informações de um usuário existente',
            params: profileParamsSchema.params,
            body: updateProfileSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, profileController.updateProfile);
    // ROTA DELETE /:id (Deleção)
    fastify.delete('/profile/:id', {
        schema: {
            tags: ['Profile'],
            summary: 'Deleta um usuário pelo ID',
            params: profileParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, profileController.deleteProfile);
};
export default profileRoutes;
//# sourceMappingURL=profileRoutes.js.map