import type { FastifyInstance } from 'fastify'
import { login } from '../controllers/loginController.js'

const loginRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Realiza login e retorna token JWT',
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
          },
        },
      },
      // Rate limit específico para login (mais restritivo)
      config: {
        rateLimit: {
          max: 5,
          timeWindow: '15 minutes',
        },
      },
    },
    login
  )
}

export default loginRoutes
