import type { FastifyReply, FastifyRequest } from 'fastify'
import { ForbiddenError } from '../errors/errors.js'

/**
 * Middleware de autorização que verifica se o usuário tem o role necessário
 * @param allowedRoles - Array de roles permitidos
 * @returns Função middleware para usar em preHandler
 */
export function authorize(...allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // Primeiro verifica se está autenticado
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Acesso negado: Token inválido ou expirado.',
          statusCode: 401,
        },
      })
      return
    }

    // Extrai o role do JWT
    const userPayload = request.user as { user_id: string; user_role: string }
    const userRole = userPayload?.user_role

    // Verifica se o usuário tem um dos roles permitidos
    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ForbiddenError(
        `Acesso negado. Roles necessários: ${allowedRoles.join(', ')}`
      )
    }
  }
}

/**
 * Variante simplificada para apenas um role
 */
export function authorizeRole(role: string) {
  return authorize(role)
}

/**
 * Variante para admin apenas
 */
export function adminOnly() {
  return authorize('admin')
}

/**
 * Cria uma função que pode ser reutilizada
 */
export function createAuthorizeMiddleware(role: string) {
  return authorize(role)
}
