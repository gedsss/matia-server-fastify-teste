import * as activityLogsController from '../controllers/activity_logsController.js';
import { createActivityLogsSchema, activityLogsParamsSchema, updateActivityLogsSchema, } from '../schemas/activity_logsSchema.js';
const activityLogsRoutes = async (fastify) => {
    fastify.post('/activity-logs', {
        schema: {
            tags: ['ActivityLogs'],
            summary: 'Cria um novo registro de log de atividade',
            body: createActivityLogsSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, activityLogsController.createActivityLogs);
    fastify.get('/activity-logs/:id', {
        schema: {
            tags: ['ActivityLogs'],
            summary: 'Busca um registro de log de atividade pelo ID',
            params: activityLogsParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, activityLogsController.getActivityLogsById);
    fastify.put('/activity-logs/:id', {
        schema: {
            tags: ['ActivityLogs'],
            summary: 'Atualiza um registro de log de atividade existente',
            params: activityLogsParamsSchema.params,
            body: updateActivityLogsSchema.body,
        },
        preHandler: [fastify.authenticate],
    }, activityLogsController.updateActivityLogs);
    fastify.delete('/activity-logs/:id', {
        schema: {
            tags: ['ActivityLogs'],
            summary: 'Deleta um registro de log de atividade pelo ID',
            params: activityLogsParamsSchema.params,
        },
        preHandler: [fastify.authenticate],
    }, activityLogsController.deleteActivityLogs);
};
export default activityLogsRoutes;
//# sourceMappingURL=activity_logsRoutes.js.map