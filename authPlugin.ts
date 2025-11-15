import fp from 'fastify-plugin'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify(): Promise<any>
  }
}
export default fp(async (fastify: FastifyInstance) => {
  const SECRET_KEY = process.env.JWT_SECRET

  if (!SECRET_KEY) {
    throw new Error('JWT_SECRET não está definido. Verifique seu arquivo .env.')
  }
  fastify.register(fastifyJwt, {
    secret: SECRET_KEY,
  })

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply
          .code(401)
          .send({ message: 'Acesso negado: Token inválido ou expirado.' })
      }
    }
  )
})
