import type { FastifyReply, FastifyRequest } from 'fastify';
export declare const createMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getMessagesById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const updateMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const deleteMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    getMessagesById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    updateMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    deleteMessages: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
};
export default _default;
