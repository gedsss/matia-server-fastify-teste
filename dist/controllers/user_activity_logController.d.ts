import type { FastifyReply, FastifyRequest } from 'fastify';
export declare const createUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getUserActivityLogById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const updateUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const deleteUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    getUserActivityLogById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    updateUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    deleteUserActivityLog: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
};
export default _default;
