import * as profileController from '../controllers/profileController.js' 

import { createProfileSchema, profileParamsSchema } from '../schemas/profileSchema.js'

const profileRoutes = async (fastify, options) => {
    
    // ROTA POST /profile (Criação)
    fastify.post('/profile', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Cria um novo usuário no sistema', 
            body: createProfileSchema,
        } 
    }, profileController.createProfile)

    // ROTA GET /profile/:id (Busca)
    fastify.get('/profile/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Busca um usuário pelo seu ID',
            params: profileParamsSchema,
        } 
    }, profileController.getProfileById)

    // ROTA PUT /profile/:id (Atualização)
    fastify.put('/profile/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Atualiza informações de um usuário existente', 
            params: profileParamsSchema, 
            body: createProfileSchema,
        } 
    }, profileController.updateProfile)
    
    // ROTA DELETE /profile/:id (Deleção)
    fastify.delete('/profile/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Deleta um usuário pelo ID', 
            params: profileParamsSchema,
        } 
    }, profileController.deleteProfile)
}

export default profileRoutes