import * as profileController from '../controllers/profileController.js' 

import { createProfileSchema, profileParamsSchema } from '../schemas/profileSchema.js'

const profileRoutes = async (fastify, options) => {
    
    // ROTA POST / (Criação)
    fastify.post('/', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Cria um novo usuário no sistema', 
            body: createProfileSchema,
        } 
    }, profileController.createProfile)

    // ROTA GET /:id (Busca)
    fastify.get('/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Busca um usuário pelo seu ID',
            params: profileParamsSchema,
        } 
    }, profileController.getProfileById)

    // ROTA PUT /:id (Atualização)
    fastify.put('/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Atualiza informações de um usuário existente', 
            params: profileParamsSchema, 
            body: createProfileSchema,
        } 
    }, profileController.updateProfile)
    
    // ROTA DELETE /:id (Deleção)
    fastify.delete('/:id', { 
        schema: { 
            tags: ['Profile'], 
            summary: 'Deleta um usuário pelo ID', 
            params: profileParamsSchema,
        } 
    }, profileController.deleteProfile)
}

export default profileRoutes