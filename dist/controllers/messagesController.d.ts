import type { FastifyReply, FastifyRequest } from 'fastify';
import { type MessagesAttributes } from '../models/messages.js';
interface CreateBody extends Omit<MessagesAttributes, 'id' | 'created_at' | 'updated_at'> {
}
interface UpdateBody extends Partial<CreateBody> {
}
interface Params {
    id: string;
}
export declare const createMessages: (request: FastifyRequest<{
    Body: CreateBody;
}>, reply: FastifyReply) => Promise<never>;
export declare const getMessagesById: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const updateMessages: (request: FastifyRequest<{
    Body: UpdateBody;
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const deleteMessages: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createMessages: (request: FastifyRequest<{
        Body: CreateBody;
    }>, reply: FastifyReply) => Promise<never>;
    getMessagesById: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    updateMessages: (request: FastifyRequest<{
        Body: UpdateBody;
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    deleteMessages: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
};
export default _default;
