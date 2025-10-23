import * as activityLogsController from '../controllers/activity_logsController.js'
import { createActivityLogsSchema, activityLogsParamsSchema} from '../schemas/activity_logsSchema.js'

const activityLogsRoutes = async (fastify, options) => {
    
    fastify.post('/activity-logs', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Cria um novo registro de log de atividade', 
            body: createActivityLogsSchema, 
        } 
    }, activityLogsController.createActivityLogs)

    fastify.get('/activity-logs/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Busca um registro de log de atividade pelo ID',
            params: activityLogsParamsSchema,
        } 
    }, activityLogsController.getActivityLogsById)

    fastify.put('/activity-logs/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Atualiza um registro de log de atividade existente', 
            params: activityLogsParamsSchema, 
            body: createActivityLogsSchema,
        } 
    }, activityLogsController.updateActivityLogs)
    
    fastify.delete('/activity-logs/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Deleta um registro de log de atividade pelo ID', 
            params: activityLogsParamsSchema,
        } 
    }, activityLogsController.deleteActivityLogs)
}

export default activityLogsRoutes