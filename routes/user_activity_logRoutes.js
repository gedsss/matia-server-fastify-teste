import * as userActivityController from '../controllers/user_activity_logController.js'
import { createUserActivityLogSchema, userActivityLogParamsSchema } from '../schemas/user_activity_logSchema.js'

const userActivityLogsRoutes = async (fastify, options) => {
    
    fastify.post('/user_activity_log', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Cria um novo registro de log de atividade de um usuário', 
            body: createUserActivityLogSchema 
        } 
    }, userActivityController.createUserActivityLog)

    fastify.get('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Busca um registro de log de atividade de um usuário pelo ID',
            params: userActivityLogParamsSchema
        } 
    }, userActivityController.getUserActivityLogById)

    fastify.put('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Atualiza um registro de log de atividade de um usuário existente', 
            params: userActivityLogParamsSchema,
            body: createUserActivityLogSchema
        } 
    }, userActivityController.updateUserActivityLog)
    
    fastify.delete('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Deleta um registro de log de atividade de um usuário pelo ID', 
            params: userActivityLogParamsSchema
        } 
    }, userActivityController.deleteUserActivityLog)
}

export default userActivityLogsRoutes