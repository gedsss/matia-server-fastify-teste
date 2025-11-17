import activityLogs from '../models/activity_logs.js';
import { fail, success } from '../utils/response.js';
export const createActivityLogs = async (request, reply) => {
    try {
        const payload = request.body;
        if (!payload || Object.keys(payload).length === 0) {
            return fail(reply, 400, 'Corpo da requisição vazio');
        }
        const created = await activityLogs.create(payload);
        return success(reply, 201, {
            data: created.toJSON(),
            message: 'log criado com sucesso',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao criar log', err.message);
    }
};
export const getActivityLogsById = async (request, reply) => {
    try {
        const { id } = request.params;
        const item = await activityLogs.findByPk(id);
        if (!item)
            return fail(reply, 404, 'log não encontrado');
        return success(reply, 200, { data: item.toJSON() });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao buscar log', err.message);
    }
};
export const updateActivityLogs = async (request, reply) => {
    try {
        const { id } = request.params;
        const [updatedRows] = await activityLogs.update(request.body, {
            where: { id },
        });
        if (updatedRows === 0)
            return fail(reply, 404, 'log não encontrado');
        const updated = await activityLogs.findByPk(id);
        return success(reply, 200, {
            data: updated?.toJSON(),
            message: 'log atualizado',
        });
    }
    catch (err) {
        if (err && err.name === 'SequelizeValidationError') {
            return fail(reply, 400, 'Dados inválidos', err.errors);
        }
        return fail(reply, 500, 'Erro ao atualizar log', err.message);
    }
};
export const deleteActivityLogs = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleted = await activityLogs.destroy({ where: { id } });
        if (deleted === 0)
            return fail(reply, 404, 'log não encontrado');
        return success(reply, 200, { message: 'log deletado com sucesso' });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao deletar log', err.message);
    }
};
export default {
    createActivityLogs,
    getActivityLogsById,
    updateActivityLogs,
    deleteActivityLogs,
};
//# sourceMappingURL=activity_logsController.js.map