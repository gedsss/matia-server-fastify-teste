import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'

export function asyncHandler(
  handler: (Request: FastifyRequest, reply: FastifyReply) => Promise<any>
): RouteHandlerMethod {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    return await handler(request, reply)
  }
}
