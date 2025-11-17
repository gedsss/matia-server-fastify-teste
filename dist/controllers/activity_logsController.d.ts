import type { FastifyReply, FastifyRequest } from 'fastify';
export declare const createActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const getActivityLogsById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const updateActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
export declare const deleteActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    getActivityLogsById: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    updateActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
    deleteActivityLogs: (request: FastifyRequest, reply: FastifyReply) => Promise<never>;
};
export default _default;
