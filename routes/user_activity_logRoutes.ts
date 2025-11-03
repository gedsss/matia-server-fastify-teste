import { FastifyInstance, RouteOptions } from 'fastify'
import * as userActivityController from '../controllers/user_activity_logController.js'
import { createUserActivityLogSchema, userActivityLogParamsSchema } from '../schemas/user_activity_logSchema.js'

const userActivityLogsRoutes = async (fastify: FastifyInstance, options: RouteOptions) => {
    
    fastify.post('/user_activity_log', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Cria um novo registro de log de atividade de um usuário', 
            body: createUserActivityLogSchema .body
        } 
    }, userActivityController.createUserActivityLog)

    fastify.get('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Busca um registro de log de atividade de um usuário pelo ID',
            params: userActivityLogParamsSchema.params
        } 
    }, userActivityController.getUserActivityLogById)

    fastify.put('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Atualiza um registro de log de atividade de um usuário existente', 
            params: userActivityLogParamsSchema.params,
            body: createUserActivityLogSchema.body
        } 
    }, userActivityController.updateUserActivityLog)
    
    fastify.delete('/user_activity_log/:id', { 
        schema: { 
            tags: ['ActivityLogs'], 
            summary: 'Deleta um registro de log de atividade de um usuário pelo ID', 
            params: userActivityLogParamsSchema.params
        } 
    }, userActivityController.deleteUserActivityLog)
}

export default userActivityLogsRoutes