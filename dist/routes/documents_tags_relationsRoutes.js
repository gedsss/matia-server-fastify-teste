import * as documentsTagsRelationsController from '../controllers/documents_tags_relationController.js';
import { createDocumentsTagsRelationSchema, documentsTagsRelationParamsSchema, updateDocumentsTagsRelationSchema, } from '../schemas/documents_tags_relationSchema.js';
const documentsTagsRelationsRoutes = async (fastify) => {
    fastify.post('/documents-tags-relations', {
        schema: {
            tags: ['DocumentsTagsRelations'],
            summary: 'Associa tags a documentos',
            body: createDocumentsTagsRelationSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, documentsTagsRelationsController.createDocumentsTagsRelation);
    fastify.get('/documents-tags-relations/:id', {
        schema: {
            tags: ['DocumentsTagsRelations'],
            summary: 'Busca associações documento/tag pelo ID',
            params: documentsTagsRelationParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, documentsTagsRelationsController.getDocumentsTagsRelationById);
    fastify.put('/documents-tags-relations/:id', {
        schema: {
            tags: ['DocumentsTagsRelations'],
            summary: 'Atualiza associações documento/tag existentes',
            params: documentsTagsRelationParamsSchema.params,
            body: updateDocumentsTagsRelationSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, documentsTagsRelationsController.updateDocumentsTagsRelation);
    fastify.delete('/documents-tags-relations/:id', {
        schema: {
            tags: ['DocumentsTagsRelations'],
            summary: 'Remove associações de tags a documentos pelo ID',
            params: documentsTagsRelationParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, documentsTagsRelationsController.deleteDocumentsTagsRelation);
};
export default documentsTagsRelationsRoutes;
//# sourceMappingURL=documents_tags_relationsRoutes.js.map