import type { FastifyReply } from 'fastify/types/reply.js'
import type { FastifyRequest } from 'fastify/types/request.js'
import { verifyCredentials } from '../utils/verifyCredentials.js'

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as {
    email: string
    password: string
  }

  const user = await verifyCredentials(password, email)

  if (!user) {
    return reply.code(401).send({ message: 'Credenciais inválidas' })
  }

  const payload = {
    user_id: user.id,
    user_role: user.role ?? 'publico',
  }

  const token = request.server.jwt.sign(payload, {
    expiresIn: '7d',
  })

  return reply.code(200).send({
    message: 'Login bem-sucedido',
    token: token,
    userData: payload,
  })
}
