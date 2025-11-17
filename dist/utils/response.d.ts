import type { FastifyReply } from 'fastify';
import type { ValidationErrorItem } from 'sequelize';
export interface CustomErrorDetail {
    message: string;
    path: string[];
}
type SuccesPayload = Record<string, unknown>;
export declare const success: (reply: FastifyReply, code?: number, payload?: SuccesPayload) => FastifyReply;
type ErrorDetails = string | (ValidationErrorItem | CustomErrorDetail)[];
export declare const fail: (reply: FastifyReply, code?: number, message?: string, details?: ErrorDetails | null) => FastifyReply;
export {};
