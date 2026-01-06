import helmet from '@fastify/helmet'
import type { FastifyInstance } from 'fastify'

export async function helmetPlugin(fastify: FastifyInstance) {
  await fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Necessário para Swagger UI
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'https:', 'data:'],
      },
    },
  })
}
