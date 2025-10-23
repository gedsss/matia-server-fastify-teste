import * as messagesController from '../controllers/messagesController.js'

import { createMessagesSchema, messagesParamsSchema } from '../schemas/messagesSchema.js'

const messagesRoutes = async (fastify, options) => {
    
    fastify.post('/messages', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Cria uma nova mensagem', 
            body: createMessagesSchema, 
        } 
    }, messagesController.createMessages)

    fastify.get('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Busca uma mensagem pelo seu ID',
            params: messagesParamsSchema,
        } 
    }, messagesController.getMessagesById)

    fastify.put('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Atualiza o conteúdo de uma mensagem existente', 
            params: messagesParamsSchema, 
            body: createMessagesSchema,
        } 
    }, messagesController.updateMessages)
    
    fastify.delete('/messages/:id', { 
        schema: { 
            tags: ['Messages'], 
            summary: 'Deleta uma mensagem pelo ID', 
            params: messagesParamsSchema,
        } 
    }, messagesController.deleteMessages)
}

export default messagesRoutes