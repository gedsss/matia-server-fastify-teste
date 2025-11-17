import documentsTagRelation from '../models/documents_tags_relation.js';
import { fail, success } from '../utils/response.js';
export const createDocumentsTagsRelation = async (request, reply) => {
    try {
        const payload = request.body;
        if (!payload || Object.keys(payload).length === 0) {
            return fail(reply, 400, 'Corpo da requisição vazio');
        }
        const created = await documentsTagRelation.create(payload);
        return success(reply, 201, {
            data: created.toJSON(),
            message: 'relação de tag criado com sucesso',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao criar relação de tag', err.message);
    }
};
export const getDocumentsTagsRelationById = async (request, reply) => {
    try {
        const { id } = request.params;
        const item = await documentsTagRelation.findByPk(id);
        if (!item)
            return fail(reply, 404, 'tag não encontrado');
        return success(reply, 200, { data: item.toJSON() });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao buscar relação de tag', err.message);
    }
};
export const updateDocumentsTagsRelation = async (request, reply) => {
    try {
        const { id } = request.params;
        const [updatedRows] = await documentsTagRelation.update(request.body, {
            where: { id },
        });
        if (updatedRows === 0)
            return fail(reply, 404, 'relação de tag não encontrado');
        const updated = await documentsTagRelation.findByPk(id);
        return success(reply, 200, {
            data: updated?.toJSON(),
            message: 'relação de tag atualizado',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao atualizar relação de tag', err.message);
    }
};
export const deleteDocumentsTagsRelation = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleted = await documentsTagRelation.destroy({ where: { id } });
        if (deleted === 0)
            return fail(reply, 404, 'relação de tag não encontrado');
        return success(reply, 200, {
            message: 'relação de tag deletado com sucesso',
        });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao deletar relação de tag', err.message);
    }
};
export default {
    createDocumentsTagsRelation,
    getDocumentsTagsRelationById,
    updateDocumentsTagsRelation,
    deleteDocumentsTagsRelation,
};
//# sourceMappingURL=documents_tags_relationController.js.map