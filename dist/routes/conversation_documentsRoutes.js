import * as conversationDocumentsController from '../controllers/conversation_documentsController.js';
import { conversationDocumentsParamsSchema, createConversationDocumentsSchema, updateConversationsDocumentsSchema, } from '../schemas/conversation_documentsSchema.js';
const conversationDocumentsRoutes = async (fastify) => {
    fastify.post('/conversations-documents', {
        schema: {
            tags: ['ConversationDocuments'],
            summary: 'Associa um ou mais documentos a uma conversa',
            body: createConversationDocumentsSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, conversationDocumentsController.createConversationDocuments);
    fastify.get('/conversations-documents/:id', {
        schema: {
            tags: ['ConversationDocuments'],
            summary: 'Busca uma associação conversa/documento pelo ID',
            params: conversationDocumentsParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, conversationDocumentsController.getConversationDocumentsById);
    fastify.put('/conversations-documents/:id', {
        schema: {
            tags: ['ConversationDocuments'],
            summary: 'Atualiza uma associação conversa/documento existente',
            params: conversationDocumentsParamsSchema.params,
            body: updateConversationsDocumentsSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, conversationDocumentsController.updateConversationDocuments);
    fastify.delete('/conversations-documents/:id', {
        schema: {
            tags: ['ConversationDocuments'],
            summary: 'Remove a associação de um documento a uma conversa pelo ID',
            params: conversationDocumentsParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, conversationDocumentsController.deleteConversationDocuments);
};
export default conversationDocumentsRoutes;
//# sourceMappingURL=conversation_documentsRoutes.js.map