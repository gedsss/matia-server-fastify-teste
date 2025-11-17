import * as documentsAnalysisController from '../controllers/documents_analysisController.js';
import { createDocumentsAnalysisSchema, documentsAnalysisParamsSchema, updateDocumentsAnalysisSchema, } from '../schemas/documents_analysisSchema.js';
const documentsAnalysesRoutes = async (fastify) => {
    fastify.post('/documents-analyses', {
        schema: {
            tags: ['DocumentsAnalyses'],
            summary: 'Cria um novo registro de análise de documento',
            body: createDocumentsAnalysisSchema.body,
        },
    }, documentsAnalysisController.createDocumentsAnalisys);
    fastify.get('/documents-analyses/:id', {
        schema: {
            tags: ['DocumentsAnalyses'],
            summary: 'Busca um registro de análise de documento pelo ID',
            params: documentsAnalysisParamsSchema.params,
        },
    }, documentsAnalysisController.getDocumentsAnalisysById);
    fastify.put('/documents-analyses/:id', {
        schema: {
            tags: ['DocumentsAnalyses'],
            summary: 'Atualiza um registro de análise de documento existente',
            params: documentsAnalysisParamsSchema.params,
            body: updateDocumentsAnalysisSchema.body,
        },
    }, documentsAnalysisController.updateDocumentsAnalisys);
    fastify.delete('/documents-analyses/:id', {
        schema: {
            tags: ['DocumentsAnalyses'],
            summary: 'Deleta um registro de análise de documento pelo ID',
            params: documentsAnalysisParamsSchema.params,
        },
    }, documentsAnalysisController.deleteDocumentsAnalisys);
};
export default documentsAnalysesRoutes;
//# sourceMappingURL=documents_analysisRoutes.js.map