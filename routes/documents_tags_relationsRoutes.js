import * as documentsTagsRelationsController from '../controllers/documents_tags_relationController.js'
import { 
    createDocumentsTagsRelationSchema, 
    documentsTagsRelationParamsSchema 
} from '../schemas/documents_tags_relationSchema.js' 

const documentsTagsRelationsRoutes = async (fastify, options) => {
    
    fastify.post('/documents-tags-relations', { 
        schema: { 
            tags: ['DocumentsTagsRelations'], 
            summary: 'Associa tags a documentos', 
            body: createDocumentsTagsRelationSchema, 
        } 
    }, documentsTagsRelationsController.createDocumentsTagsRelation)

    fastify.get('/documents-tags-relations/:id', { 
        schema: { 
            tags: ['DocumentsTagsRelations'], 
            summary: 'Busca associações documento/tag pelo ID',
            params: documentsTagsRelationParamsSchema,
        } 
    }, documentsTagsRelationsController.getDocumentsTagsRelationById)

    fastify.put('/documents-tags-relations/:id', { 
        schema: { 
            tags: ['DocumentsTagsRelations'], 
            summary: 'Atualiza associações documento/tag existentes', 
            params: documentsTagsRelationParamsSchema, 
            body: createDocumentsTagsRelationSchema,
        } 
    }, documentsTagsRelationsController.updateDocumentsTagsRelation)
    
    fastify.delete('/documents-tags-relations/:id', { 
        schema: { 
            tags: ['DocumentsTagsRelations'], 
            summary: 'Remove associações de tags a documentos pelo ID', 
            params: documentsTagsRelationParamsSchema,
        } 
    }, documentsTagsRelationsController.deleteDocumentsTagsRelation)
}

export default documentsTagsRelationsRoutes