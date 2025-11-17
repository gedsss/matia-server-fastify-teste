import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConversationDocumentsAttributes } from '../models/conversation_documents.js';
interface CreateBody extends Omit<ConversationDocumentsAttributes, 'id' | 'created_at' | 'updated_at'> {
}
interface UpdateBody extends Partial<CreateBody> {
}
interface Params {
    id: string;
}
export declare const createConversationDocuments: (request: FastifyRequest<{
    Body: CreateBody;
}>, reply: FastifyReply) => Promise<never>;
export declare const getConversationDocumentsById: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const updateConversationDocuments: (request: FastifyRequest<{
    Body: UpdateBody;
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const deleteConversationDocuments: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createConversationDocuments: (request: FastifyRequest<{
        Body: CreateBody;
    }>, reply: FastifyReply) => Promise<never>;
    getConversationDocumentsById: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    updateConversationDocuments: (request: FastifyRequest<{
        Body: UpdateBody;
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    deleteConversationDocuments: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
};
export default _default;
