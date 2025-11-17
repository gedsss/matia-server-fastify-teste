import type { FastifyInstance } from 'fastify'
import * as userActivityController from '../controllers/user_activity_logController.js'
import {
  createUserActivityLogSchema,
  userActivityLogParamsSchema,
  updateUserActivityLogSchema,
} from '../schemas/user_activity_logSchema.js'

const userActivityLogsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/user-activity-log',
    {
      schema: {
        tags: ['UserActivityLogs'],
        summary: 'Cria um novo registro de log de atividade de um usuário',
        body: createUserActivityLogSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    userActivityController.createUserActivityLog
  )

  fastify.get(
    '/user-activity-log/:id',
    {
      schema: {
        tags: ['UserActivityLogs'],
        summary: 'Busca um registro de log de atividade de um usuário pelo ID',
        params: userActivityLogParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    userActivityController.getUserActivityLogById
  )

  fastify.put(
    '/user-activity-log/:id',
    {
      schema: {
        tags: ['UserActivityLogs'],
        summary:
          'Atualiza um registro de log de atividade de um usuário existente',
        params: userActivityLogParamsSchema.params,
        body: updateUserActivityLogSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    userActivityController.updateUserActivityLog
  )

  fastify.delete(
    '/user-activity-log/:id',
    {
      schema: {
        tags: ['UserActivityLogs'],
        summary: 'Deleta um registro de log de atividade de um usuário pelo ID',
        params: userActivityLogParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    userActivityController.deleteUserActivityLog
  )
}

export default userActivityLogsRoutes
