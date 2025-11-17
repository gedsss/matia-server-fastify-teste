import type { FastifyReply, FastifyRequest } from 'fastify';
import type { DocumentsAnalysisAttributes } from '../models/documents_analysis.js';
interface CreateBody extends Omit<DocumentsAnalysisAttributes, 'id' | 'created_at' | 'updated_at'> {
}
interface UpdateBody extends Partial<CreateBody> {
}
interface Params {
    id: string;
}
export declare const createDocumentsAnalisys: (request: FastifyRequest<{
    Body: CreateBody;
}>, reply: FastifyReply) => Promise<never>;
export declare const getDocumentsAnalisysById: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const updateDocumentsAnalisys: (request: FastifyRequest<{
    Body: UpdateBody;
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
export declare const deleteDocumentsAnalisys: (request: FastifyRequest<{
    Params: Params;
}>, reply: FastifyReply) => Promise<never>;
declare const _default: {
    createDocumentsAnalisys: (request: FastifyRequest<{
        Body: CreateBody;
    }>, reply: FastifyReply) => Promise<never>;
    getDocumentsAnalisysById: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    updateDocumentsAnalisys: (request: FastifyRequest<{
        Body: UpdateBody;
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
    deleteDocumentsAnalisys: (request: FastifyRequest<{
        Params: Params;
    }>, reply: FastifyReply) => Promise<never>;
};
export default _default;
