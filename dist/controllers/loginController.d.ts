import type { FastifyReply } from 'fastify/types/reply.js';
import type { FastifyRequest } from 'fastify/types/request.js';
interface LoginBody {
    email: string;
    password: string;
}
type LoginRequest = FastifyRequest<{
    Body: LoginBody;
}>;
export declare const login: (request: LoginRequest, reply: FastifyReply) => Promise<never>;
export {};
