import * as documentsController from '../controllers/documentsController.js'

import { createDocumentsSchema, documentsParamsSchema } from '../schemas/documentsSchema.js'

const documentsRoutes = async (fastify, options) => {
    
    fastify.post('/documents', { 
        schema: { 
            tags: ['Documents'], 
            summary: 'Cria um novo documento (realiza o upload)', 
            body: createDocumentsSchema, 
        } 
    }, documentsController.createDocuments)

    fastify.get('/documents/:id', { 
        schema: { 
            tags: ['Documents'], 
            summary: 'Busca um documento pelo seu ID',
            params: documentsParamsSchema,
        } 
    }, documentsController.getDocumentsById)

    fastify.put('/documents/:id', { 
        schema: { 
            tags: ['Documents'], 
            summary: 'Atualiza metadados ou informações de um documento existente', 
            params: documentsParamsSchema, 
            body: createDocumentsSchema,
        } 
    }, documentsController.updateDocuments)
    
    fastify.delete('/documents/:id', { 
        schema: { 
            tags: ['Documents'], 
            summary: 'Deleta um documento pelo ID', 
            params: documentsParamsSchema,
        } 
    }, documentsController.deleteDocuments)
}

export default documentsRoutes