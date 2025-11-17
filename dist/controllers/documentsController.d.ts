import type { FastifyReply, FastifyRequest } from 'fastify';
import type { DocumentsAttributes } from '../models/documents.js';
interface CreateBody extends Omit<DocumentsAttributes, 'id' | 'created_at' | 'updated_at'> {
}
interface UpdateBody extends Partial<CreateBody> {
}
interface Params {
    id: string;
}
export declare const createDocuments: (request: FastifyRequest<{
    Body: CreateBody;
}>, reply: FastifyReply) => Promise<never>;
export declare const getDocumentsById: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const updateDocuments: (request: FastifyRequest<{
    Body: UpdateBody;
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const deleteDocuments: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createDocuments: (request: FastifyRequest<{
        Body: CreateBody;
    }>, reply: FastifyReply) => Promise<never>;
    getDocumentsById: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    updateDocuments: (request: FastifyRequest<{
        Body: UpdateBody;
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    deleteDocuments: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
};
export default _default;
