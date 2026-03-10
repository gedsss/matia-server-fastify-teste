import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import cacheService from '../utils/cache.js'

declare module 'fastify' {
  interface FastifyInstance {
    cache: typeof cacheService
  }
}

/**
 * Plugin Fastify que registra o serviço de cache Redis
 * como decorator da instância Fastify.
 *
 * Uso nas rotas: fastify.cache.get('key'), fastify.cache.set('key', value)
 */
export const cachePlugin = fp(async (fastify: FastifyInstance) => {
  // Não conectar ao Redis em ambiente de teste
  if (process.env.NODE_ENV !== 'test') {
    await cacheService.connect()
  }

  // Decorator: disponibiliza o cache em fastify.cache
  fastify.decorate('cache', cacheService)

  // Desconectar do Redis quando o servidor fechar
  fastify.addHook('onClose', async () => {
    await cacheService.disconnect()
  })
})
