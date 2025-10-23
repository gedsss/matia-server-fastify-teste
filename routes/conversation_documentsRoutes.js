import * as conversationDocumentsController from '../controllers/conversation_documentsController.js'

import { conversationDocumentsParamsSchema, createConversationDocumentsSchema } from '../schemas/conversation_documentsSchema.js'

const conversationDocumentsRoutes = async (fastify, options) => {
    
    fastify.post('/conversations-documents', { 
        schema: { 
            tags: ['ConversationDocuments'], 
            summary: 'Associa um ou mais documentos a uma conversa', 
            body: createConversationDocumentsSchema, 
        } 
    }, conversationDocumentsController.createConversationDocuments)

    fastify.get('/conversations-documents/:id', { 
        schema: { 
            tags: ['ConversationDocuments'], 
            summary: 'Busca uma associação conversa/documento pelo ID',
            params: conversationDocumentsParamsSchema,
        } 
    }, conversationDocumentsController.getConversationDocumentsById)

    fastify.put('/conversations-documents/:id', { 
        schema: { 
            tags: ['ConversationDocuments'], 
            summary: 'Atualiza uma associação conversa/documento existente', 
            params: conversationDocumentsParamsSchema, 
            body: createConversationDocumentsSchema,
        } 
    }, conversationDocumentsController.updateConversationDocuments)
    
    fastify.delete('/conversations-documents/:id', { 
        schema: { 
            tags: ['ConversationDocuments'], 
            summary: 'Remove a associação de um documento a uma conversa pelo ID', 
            params: conversationDocumentsParamsSchema,
        } 
    }, conversationDocumentsController.deleteConversationDocuments)
}

export default conversationDocumentsRoutes