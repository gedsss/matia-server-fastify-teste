import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import sequelize from '../src/db.js'
import userActivityLogsRoutes from '../src/routes/user_activity_logRoutes.js'
import UserActivityLog from '../src/models/user_activity_log.js'

describe('UserActivityLogRoutes', async () => {
  let app: FastifyInstance
  let testToken: string
  let createdUserActivityLogID: string

  const testLog = {
    user_id: 'id-de-usuario',
    action_type: 'login',
    resource_type: 'teste',
    resource_id: 'id-do-recurso',
    details: 'dados-adicionais',
    ip_address: 'endereço-de-ip',
    user_agent: 'navegador',
  }

  beforeAll(async () => {
    await sequelize.sync({ force: true })

    app = Fastify()

    await app.register(fastifyJwt, {
      secret: 'test-secret-key',
    })

    app.decorate(
      'authenticate',
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.code(401).send({ message: 'Unauthorized' })
        }
      }
    )

    await app.register(userActivityLogsRoutes, { prefix: '/user-activity-log' })

    await app.ready()

    testToken = app.jwt.sign({ id: 'some-id' })
  })

  afterAll(async () => {
    await app.close()
    await sequelize.close()
  })

  describe('Post /user-activity-log', () => {
    it('deve criar um UserActivityLog com sucesso', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/user-activity-log/user-activity-log',
        payload: testLog,
      })

      const body = JSON.parse(response.body)

      expect(body.statusCode).toBe(201)
      expect(body.success).toBe(true)
      expect(body.data.user_id).toBe(testLog.user_id)
      expect(body.data.id).toBeDefined()

      createdUserActivityLogID = body.data.id
    })
  })
})
