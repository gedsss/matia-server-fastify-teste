import type { FastifyReply } from 'fastify'
import type { ValidationErrorItem } from 'sequelize'

export interface CustomErrorDetail {
  message: string
  path: string[]
}

type SuccesPayload = Record<string, unknown>

export const success = (
  reply: FastifyReply,
  code = 200,
  payload: SuccesPayload = {}
): FastifyReply => {
  return reply.code(code).send({ success: true, ...payload })
}

type ErrorDetails = string | (ValidationErrorItem | CustomErrorDetail)[]

export const fail = (
  reply: FastifyReply,
  code = 500,
  message = 'Erro interno',
  details?: ErrorDetails | null
): FastifyReply => {
  const body: Record<string, unknown> = { success: false, message }

  if (details) {
    if (typeof details === 'string') {
      body.details = details
    } else {
      body.errors = details
    }
  }

  return reply.code(code).send(body)
}
