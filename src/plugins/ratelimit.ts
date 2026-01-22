import rateLimit from '@fastify/rate-limit'
import type { FastifyInstance } from 'fastify'

export async function rateLimitPlugin(fastify: FastifyInstance) {
  await fastify.register(rateLimit, {
    global: true,
    max: 100,
    timeWindow: '1 minute',
    errorResponseBuilder: (request, context) => {
      return {
        success: false,
        error: {
          code: 'ERR_TOO_MANY_REQUESTS',
          message: `Muitas requisições. Tente novamente em ${context.after}`,
          statusCode: 429,
          retryAfter: context.after,
        },
      }
    },

    addHeadersOnExceeding: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
    },

    addHeaders: {
      'x-ratelimit-limit': true,
      'x-ratelimit-remaining': true,
      'x-ratelimit-reset': true,
      'retry-after': true,
    },
  })
}
