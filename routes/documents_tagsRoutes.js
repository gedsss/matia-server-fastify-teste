import * as documentsTagsController from '../controllers/documents_tagsController.js'

import { createDocumentsTagsSchema, documentsTagsParamsSchema } from '../schemas/documents_tagsSchema.js'

const documentsTagsRoutes = async (fastify, options) => {
    
    fastify.post('/documents-tags', { 
        schema: { 
            tags: ['DocumentsTags'], 
            summary: 'Cria uma nova tag para documentos', 
            body: createDocumentsTagsSchema, 
        } 
    }, documentsTagsController.createDocumentsTags)

    fastify.get('/documents-tags/:id', { 
        schema: { 
            tags: ['DocumentsTags'], 
            summary: 'Busca uma tag de documento pelo seu ID',
            params: documentsTagsParamsSchema,
        } 
    }, documentsTagsController.getDocumentsTagsById)

    fastify.put('/documents-tags/:id', { 
        schema: { 
            tags: ['DocumentsTags'], 
            summary: 'Atualiza uma tag de documento existente', 
            params: documentsTagsParamsSchema, 
            body: createDocumentsTagsSchema,
        } 
    }, documentsTagsController.updateDocumentsTags)
    
    fastify.delete('/documents-tags/:id', { 
        schema: { 
            tags: ['DocumentsTags'], 
            summary: 'Deleta uma tag de documento pelo ID', 
            params: documentsTagsParamsSchema,
        } 
    }, documentsTagsController.deleteDocumentsTags)
}

export default documentsTagsRoutes