import documentsAnalysis from '../models/documents_analysis.js';
import { fail, success } from '../utils/response.js';
export const createDocumentsAnalisys = async (request, reply) => {
    try {
        const payload = request.body;
        if (!payload || Object.keys(payload).length === 0) {
            return fail(reply, 400, 'Corpo da requisição vazio');
        }
        const created = await documentsAnalysis.create(payload);
        return success(reply, 201, {
            data: created.toJSON(),
            message: 'analise criada com sucesso',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao criar analise', err.message);
    }
};
export const getDocumentsAnalisysById = async (request, reply) => {
    try {
        const { id } = request.params;
        const item = await documentsAnalysis.findByPk(id);
        if (!item)
            return fail(reply, 404, 'analise não encontrada');
        return success(reply, 200, { data: item.toJSON() });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao buscar analise', err.message);
    }
};
export const updateDocumentsAnalisys = async (request, reply) => {
    try {
        const { id } = request.params;
        const [updatedRows] = await documentsAnalysis.update(request.body, {
            where: { id },
        });
        if (updatedRows === 0)
            return fail(reply, 404, 'analise não encontrada');
        const updated = await documentsAnalysis.findByPk(id);
        return success(reply, 200, {
            data: updated?.toJSON,
            message: 'analise atualizada',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao atualizar analise', err.message);
    }
};
export const deleteDocumentsAnalisys = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleted = await documentsAnalysis.destroy({ where: { id } });
        if (deleted === 0)
            return fail(reply, 404, 'analise não encontrado');
        return success(reply, 200, { message: 'analise deletado com sucesso' });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao deletar analise', err.message);
    }
};
export default {
    createDocumentsAnalisys,
    getDocumentsAnalisysById,
    updateDocumentsAnalisys,
    deleteDocumentsAnalisys,
};
//# sourceMappingURL=documents_analysisController.js.map