import type { FastifyInstance } from 'fastify'
import * as activityLogsController from '../controllers/activity_logsController.js'
import {
  createActivityLogsSchema,
  activityLogsParamsSchema,
  updateActivityLogsSchema,
} from '../schemas/activity_logsSchema.js'

const activityLogsRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['ActivityLogs'],
        summary: 'Cria um novo registro de log de atividade',
        body: createActivityLogsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    activityLogsController.createActivityLogs
  )

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['ActivityLogs'],
        summary: 'Busca um registro de log de atividade pelo ID',
        params: activityLogsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    activityLogsController.getActivityLogsById
  )

  fastify.get(
    '/',
    {
      schema: {
        tags: ['ActivityLogs'],
        summary: 'Lista todos os registros de atividades',
      },
      preHandler: [fastify.authenticate],
    },
    activityLogsController.getActivityLogs
  )

  fastify.put(
    '/:id',
    {
      schema: {
        tags: ['ActivityLogs'],
        summary: 'Atualiza um registro de log de atividade existente',
        params: activityLogsParamsSchema.params,
        body: updateActivityLogsSchema.body,
      },

      preHandler: [fastify.authenticate],
    },
    activityLogsController.updateActivityLogs
  )

  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['ActivityLogs'],
        summary: 'Deleta um registro de log de atividade pelo ID',
        params: activityLogsParamsSchema.params,
      },

      preHandler: [fastify.authenticate],
    },
    activityLogsController.deleteActivityLogs
  )
}

export default activityLogsRoutes
