import * as conversationsController from '../controllers/conversationController.js'

import { conversationsParamsSchema, createConversationsSchema } from '../schemas/conversationSchema.js'

const conversationsRoutes = async (fastify, options) => {
    
    fastify.post('/conversations', { 
        schema: { 
            tags: ['Conversations'], 
            summary: 'Inicia uma nova conversa', 
            body: createConversationsSchema, 
        } 
    }, conversationsController.createConversation)

    fastify.get('/conversations/:id', { 
        schema: { 
            tags: ['Conversations'], 
            summary: 'Busca uma conversa pelo seu ID',
            params: conversationsParamsSchema,
        } 
    }, conversationsController.getConversationById)

    fastify.put('/conversations/:id', { 
        schema: { 
            tags: ['Conversations'], 
            summary: 'Atualiza uma conversa existente (metadados)', 
            params: conversationsParamsSchema, 
            body: createConversationsSchema,
        } 
    }, conversationsController.updateConversation)
    
    fastify.delete('/conversations/:id', { 
        schema: { 
            tags: ['Conversations'], 
            summary: 'Deleta uma conversa pelo ID', 
            params: conversationsParamsSchema,
        } 
    }, conversationsController.deleteConversation)
}

export default conversationsRoutes