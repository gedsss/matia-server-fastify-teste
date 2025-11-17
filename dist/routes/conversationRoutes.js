import * as conversationsController from '../controllers/conversationController.js';
import { conversationsParamsSchema, createConversationsSchema, updateConversationsSchema, } from '../schemas/conversationSchema.js';
const conversationsRoutes = async (fastify) => {
    fastify.post('/conversations', {
        schema: {
            tags: ['Conversations'],
            summary: 'Inicia uma nova conversa',
            body: createConversationsSchema.body,
        },
    }, conversationsController.createConversation);
    fastify.get('/conversations/:id', {
        schema: {
            tags: ['Conversations'],
            summary: 'Busca uma conversa pelo seu ID',
            params: conversationsParamsSchema.params,
        },
    }, conversationsController.getConversationById);
    fastify.put('/conversations/:id', {
        schema: {
            tags: ['Conversations'],
            summary: 'Atualiza uma conversa existente (metadados)',
            params: conversationsParamsSchema.params,
            body: updateConversationsSchema.body,
        },
    }, conversationsController.updateConversation);
    fastify.delete('/conversations/:id', {
        schema: {
            tags: ['Conversations'],
            summary: 'Deleta uma conversa pelo ID',
            params: conversationsParamsSchema.params,
        },
    }, conversationsController.deleteConversation);
};
export default conversationsRoutes;
//# sourceMappingURL=conversationRoutes.js.map