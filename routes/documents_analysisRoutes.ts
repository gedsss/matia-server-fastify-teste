import type { FastifyInstance } from 'fastify'
import * as documentsAnalysisController from '../controllers/documents_analysisController.js'

import {
  createDocumentsAnalysisSchema,
  documentsAnalysisParamsSchema,
  updateDocumentsAnalysisSchema,
} from '../schemas/documents_analysisSchema.js'

const documentsAnalysesRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/documents-analyses',
    {
      schema: {
        tags: ['DocumentsAnalyses'],
        summary: 'Cria um novo registro de análise de documento',
        body: createDocumentsAnalysisSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    documentsAnalysisController.createDocumentsAnalisys
  )

  fastify.get(
    '/documents-analyses/:id',
    {
      schema: {
        tags: ['DocumentsAnalyses'],
        summary: 'Busca um registro de análise de documento pelo ID',
        params: documentsAnalysisParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsAnalysisController.getDocumentsAnalisysById
  )

  fastify.get(
    '/documents-analyses',
    {
      schema: {
        tags: ['DocumentsAnalyses'],
        summary: 'Lista todas as análises de documentos',
      },
      preHandler: [fastify.authenticate],
    },
    documentsAnalysisController.getDocumentsAnalisys
  )

  fastify.put(
    '/documents-analyses/:id',
    {
      schema: {
        tags: ['DocumentsAnalyses'],
        summary: 'Atualiza um registro de análise de documento existente',
        params: documentsAnalysisParamsSchema.params,
        body: updateDocumentsAnalysisSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    documentsAnalysisController.updateDocumentsAnalisys
  )

  fastify.delete(
    '/documents-analyses/:id',
    {
      schema: {
        tags: ['DocumentsAnalyses'],
        summary: 'Deleta um registro de análise de documento pelo ID',
        params: documentsAnalysisParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    documentsAnalysisController.deleteDocumentsAnalisys
  )
}

export default documentsAnalysesRoutes
