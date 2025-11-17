import type { FastifyReply, FastifyRequest } from 'fastify';
export declare const createConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getConversationById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const updateConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const deleteConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    getConversationById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    updateConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    deleteConversation: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
};
export default _default;
