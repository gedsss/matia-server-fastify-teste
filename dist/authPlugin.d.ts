import type { FastifyInstance } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        jwtVerify(): Promise<any>;
    }
}
declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}
declare const _default: (fastify: FastifyInstance) => Promise<void>;
export default _default;
