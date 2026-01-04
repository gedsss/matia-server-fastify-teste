import jwt from 'jsonwebtoken'
import type { FastifyReply } from 'fastify/types/reply.js'
import type { FastifyRequest } from 'fastify/types/request.js'
import { verifyCredentials } from '../utils/verifyCredentials.js'
import {
  ValidationError,
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface LoginBody {
  email: string
  password: string
}

type LoginRequest = FastifyRequest<{
  Body: LoginBody
}>

const SECRET_KEY = process.env.JWT_SECRET

export const login = async (request: LoginRequest, reply: FastifyReply) => {
  const { email, password } = request.body

  const user = await verifyCredentials(password, email)

  if (!user) {
    return reply.code(401).send({ message: 'Credenciais inválidas' })
  }

  const payload = {
    user_id: user.id,
    user_role: user.role ?? 'publico',
  }

  if (!SECRET_KEY) {
    return reply.code(500).send({
      message: 'Erro de configuração do servidor (JWT_SECRET não definido)',
    })
  }

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '7d',
  })

  return reply.code(200).send({
    message: 'Login bem-sucedido',
    token: token,
    userData: payload,
  })
}
