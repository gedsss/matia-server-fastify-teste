import * as documentsTagsController from '../controllers/documents_tagsController.js';
import { createDocumentsTagsSchema, documentsTagsParamsSchema, updateDocumentsTagsSchema, } from '../schemas/documents_tagsSchema.js';
const documentsTagsRoutes = async (fastify) => {
    fastify.post('/documents-tags', {
        schema: {
            tags: ['DocumentsTags'],
            summary: 'Cria uma nova tag para documentos',
            body: createDocumentsTagsSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, documentsTagsController.createDocumentsTags);
    fastify.get('/documents-tags/:id', {
        schema: {
            tags: ['DocumentsTags'],
            summary: 'Busca uma tag de documento pelo seu ID',
            params: documentsTagsParamsSchema.params,
        },
    }, documentsTagsController.getDocumentsTagsById);
    fastify.put('/documents-tags/:id', {
        schema: {
            tags: ['DocumentsTags'],
            summary: 'Atualiza uma tag de documento existente',
            params: documentsTagsParamsSchema.params,
            body: updateDocumentsTagsSchema.body,
        },
    }, documentsTagsController.updateDocumentsTags);
    fastify.delete('/documents-tags/:id', {
        schema: {
            tags: ['DocumentsTags'],
            summary: 'Deleta uma tag de documento pelo ID',
            params: documentsTagsParamsSchema.params,
        },
    }, documentsTagsController.deleteDocumentsTags);
};
export default documentsTagsRoutes;
//# sourceMappingURL=documents_tagsRoutes.js.map