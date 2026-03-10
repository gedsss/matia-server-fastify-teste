import { createClient, type RedisClientType } from 'redis'

/**
 * Serviço de cache usando Redis.
 *
 * Funciona como uma camada entre o Fastify e o PostgreSQL:
 *   Cliente → Fastify → Redis (cache) → PostgreSQL (banco principal)
 *
 * Se o Redis estiver indisponível, a aplicação continua funcionando
 * normalmente buscando dados direto do PostgreSQL.
 */
class CacheService {
  private client: RedisClientType | null = null
  private isConnected = false
  private readonly defaultTTL: number

  constructor(ttlSeconds = 300) {
    this.defaultTTL = ttlSeconds
  }

  /**
   * Conecta ao Redis. Se falhar, loga o erro e continua sem cache.
   */
  async connect(): Promise<void> {
    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

      this.client = createClient({ url: redisUrl })

      this.client.on('error', err => {
        console.error('[Cache] Erro de conexão Redis:', err.message)
        this.isConnected = false
      })

      this.client.on('connect', () => {
        console.log('[Cache] Conectado ao Redis')
        this.isConnected = true
      })

      this.client.on('reconnecting', () => {
        console.log('[Cache] Reconectando ao Redis...')
      })

      await this.client.connect()
      this.isConnected = true
    } catch (err: any) {
      console.warn(
        '[Cache] Redis indisponível, continuando sem cache:',
        err.message
      )
      this.client = null
      this.isConnected = false
    }
  }

  /**
   * Busca um valor do cache.
   * Retorna null se não encontrado ou se Redis estiver offline.
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected || !this.client) return null

    try {
      const data = await this.client.get(key)
      if (!data) return null
      return JSON.parse(data) as T
    } catch (err: any) {
      console.warn('[Cache] Erro ao ler cache:', err.message)
      return null
    }
  }

  /**
   * Armazena um valor no cache com TTL (tempo de expiração).
   */
  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    if (!this.isConnected || !this.client) return

    try {
      const ttl = ttlSeconds ?? this.defaultTTL
      await this.client.setEx(key, ttl, JSON.stringify(value))
    } catch (err: any) {
      console.warn('[Cache] Erro ao gravar cache:', err.message)
    }
  }

  /**
   * Remove uma chave específica do cache.
   * Usado quando um recurso é atualizado ou deletado.
   */
  async del(key: string): Promise<void> {
    if (!this.isConnected || !this.client) return

    try {
      await this.client.del(key)
    } catch (err: any) {
      console.warn('[Cache] Erro ao deletar cache:', err.message)
    }
  }

  /**
   * Remove todas as chaves que começam com um prefixo.
   * Ex: invalidatePrefix('documents:') remove todas as chaves de documentos.
   */
  async invalidatePrefix(prefix: string): Promise<void> {
    if (!this.isConnected || !this.client) return

    try {
      const keys = await this.client.keys(`${prefix}*`)
      if (keys.length > 0) {
        await this.client.del(keys)
      }
    } catch (err: any) {
      console.warn('[Cache] Erro ao invalidar prefixo:', err.message)
    }
  }

  /**
   * Padrão Cache-Aside (mais comum):
   * 1. Tenta buscar do cache
   * 2. Se não encontrou, executa a função (busca do banco)
   * 3. Armazena o resultado no cache
   * 4. Retorna o resultado
   */
  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlSeconds?: number
  ): Promise<T> {
    // Tenta o cache primeiro
    const cached = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    // Cache miss: busca do banco de dados
    const freshData = await fetchFn()

    // Armazena no cache para próximas requisições
    await this.set(key, freshData, ttlSeconds)

    return freshData
  }

  /**
   * Verifica se o Redis está conectado.
   */
  getStatus(): { connected: boolean } {
    return { connected: this.isConnected }
  }

  /**
   * Desconecta do Redis de forma segura.
   */
  async disconnect(): Promise<void> {
    if (this.client && this.isConnected) {
      await this.client.disconnect()
      this.isConnected = false
      console.log('[Cache] Desconectado do Redis')
    }
  }
}

// Singleton: uma única instância do cache para toda a aplicação
const cacheService = new CacheService(
  Number.parseInt(process.env.CACHE_TTL || '300', 10)
)

export default cacheService
