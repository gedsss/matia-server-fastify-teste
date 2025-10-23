import * as documentsAnalysisController from '../controllers/documents_analysisController.js'

import { createDocumentsAnalysisSchema, documentsAnalysisParamsSchema } from '../schemas/documents_analysisSchema.js'

const documentsAnalysesRoutes = async (fastify, options) => {
    
    fastify.post('/documents-analyses', { 
        schema: { 
            tags: ['DocumentsAnalyses'], 
            summary: 'Cria um novo registro de análise de documento', 
            body: createDocumentsAnalysisSchema, 
        } 
    }, documentsAnalysisController.createDocumentsAnalisys)

    fastify.get('/documents-analyses/:id', { 
        schema: { 
            tags: ['DocumentsAnalyses'], 
            summary: 'Busca um registro de análise de documento pelo ID',
            params: documentsAnalysisParamsSchema,
        } 
    }, documentsAnalysisController.getDocumentsAnalisysById)

    fastify.put('/documents-analyses/:id', { 
        schema: { 
            tags: ['DocumentsAnalyses'], 
            summary: 'Atualiza um registro de análise de documento existente', 
            params: documentsAnalysisParamsSchema, 
            body: createDocumentsAnalysisSchema,
        } 
    }, documentsAnalysisController.updateDocumentsAnalisys)
    
    fastify.delete('/documents-analyses/:id', { 
        schema: { 
            tags: ['DocumentsAnalyses'], 
            summary: 'Deleta um registro de análise de documento pelo ID', 
            params: documentsAnalysisParamsSchema,
        } 
    }, documentsAnalysisController.deleteDocumentsAnalisys)
}

export default documentsAnalysesRoutes