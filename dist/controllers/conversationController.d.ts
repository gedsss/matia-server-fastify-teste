import type { FastifyReply, FastifyRequest } from 'fastify';
import type { ConversationAttributes } from '../models/conversation.js';
interface CreateBody extends Omit<ConversationAttributes, 'id' | 'created_at' | 'updated_at'> {
}
interface UpdateBody extends Partial<CreateBody> {
}
interface Params {
    id: string;
}
export declare const createConversation: (request: FastifyRequest<{
    Body: CreateBody;
}>, reply: FastifyReply) => Promise<never>;
export declare const getConversationById: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const updateConversation: (request: FastifyRequest<{
    Body: UpdateBody;
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const deleteConversation: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createConversation: (request: FastifyRequest<{
        Body: CreateBody;
    }>, reply: FastifyReply) => Promise<never>;
    getConversationById: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    updateConversation: (request: FastifyRequest<{
        Body: UpdateBody;
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    deleteConversation: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
};
export default _default;
