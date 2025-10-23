import * as userRoleController from '../controllers/user_roleController.js'

import { createUserRoleSchema, userRoleParamsSchema } from '../schemas/user_rolesSchema.js'

const userRoleRoutes = async (fastify, options) => {
    
    fastify.post('/user-role', { 
        schema: { 
            tags: ['UserRole'], 
            summary: 'Associa uma nova função (role) a um usuário', 
            body: createUserRoleSchema, 
        } 
    }, userRoleController.createUserRole)

    fastify.get('/user-role/:id', { 
        schema: { 
            tags: ['UserRole'], 
            summary: 'Busca a associação usuário/função pelo ID',
            params: userRoleParamsSchema,
        } 
    }, userRoleController.getUserRoleById)

    fastify.put('/user-role/:id', { 
        schema: { 
            tags: ['UserRole'], 
            summary: 'Atualiza a associação de função de um usuário existente', 
            params: userRoleParamsSchema, 
            body: createUserRoleSchema,
        } 
    }, userRoleController.updateUserRole)
    
    fastify.delete('/user-role/:id', { 
        schema: { 
            tags: ['UserRole'], 
            summary: 'Remove a função de um usuário pelo ID da associação', 
            params: userRoleParamsSchema,
        } 
    }, userRoleController.deleteUserRole)
}

export default userRoleRoutes