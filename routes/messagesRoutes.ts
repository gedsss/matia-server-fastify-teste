import { FastifyInstance, RouteOptions } from 'fastify'
import * as messagesController from '../controllers/messagesController.js'

import { createMessagesSchema, messagesParamsSchema } from '../schemas/messagesSchema.js'

const messagesRoutes = async (fastify: FastifyInstance, options: RouteOptions) => {
    
    fastify.post('/messages', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Cria uma nova mensagem', 
            body: createMessagesSchema.body, 
        } 
    }, messagesController.createMessages)

    fastify.get('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Busca uma mensagem pelo seu ID',
            params: messagesParamsSchema.params,
        } 
    }, messagesController.getMessagesById)

    fastify.put('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Atualiza o conteúdo de uma mensagem existente', 
            params: messagesParamsSchema.params, 
            body: createMessagesSchema.body,
        } 
    }, messagesController.updateMessages)
    
    fastify.delete('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Deleta uma mensagem pelo ID', 
            params: messagesParamsSchema.params,
        } 
    }, messagesController.deleteMessages)
}

export default messagesRoutes