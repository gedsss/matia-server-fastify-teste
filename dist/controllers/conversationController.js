import conversation from '../models/conversation.js';
import { fail, success } from '../utils/response.js';
export const createConversation = async (request, reply) => {
    try {
        const payload = request.body;
        if (!payload || Object.keys(payload).length === 0) {
            return fail(reply, 400, 'Corpo da requisição vazio');
        }
        const created = await conversation.create(payload);
        return success(reply, 201, {
            data: created.toJSON(),
            message: 'registro criado com sucesso',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao criar registro', err.message);
    }
};
export const getConversationById = async (request, reply) => {
    try {
        const { id } = request.params;
        const item = await conversation.findByPk(id);
        if (!item)
            return fail(reply, 404, 'registro não encontrado');
        return success(reply, 200, { data: item.toJSON() });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao buscar registro', err.message);
    }
};
export const updateConversation = async (request, reply) => {
    try {
        const { id } = request.params;
        const [updatedRows] = await conversation.update(request.body, {
            where: { id },
        });
        if (updatedRows === 0)
            return fail(reply, 404, 'registro não encontrado');
        const updated = await conversation.findByPk(id);
        return success(reply, 200, {
            data: updated?.toJSON(),
            message: 'registro atualizado',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao atualizar registro', err.message);
    }
};
export const deleteConversation = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleted = await conversation.destroy({ where: { id } });
        if (deleted === 0)
            return fail(reply, 404, 'registro não encontrado');
        return success(reply, 200, { message: 'registro deletado com sucesso' });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao deletar registro', err.message);
    }
};
export default {
    createConversation,
    getConversationById,
    updateConversation,
    deleteConversation,
};
//# sourceMappingURL=conversationController.js.map