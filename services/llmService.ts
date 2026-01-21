import OpenAI from 'openai'
import { ExternalServiceError } from '../errors/errors.js'
import Logger from '../utils/logger.js'

const logger = new Logger()

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface UsageStats {
  totalTokens: number
  totalCost: number
  requestCount: number
}

export class LLMService {
  private client: OpenAI
  private model: string
  private temperature: number
  private maxTokens: number
  private stats: UsageStats

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY não está definido. Verifique seu arquivo .env.'
      )
    }

    this.client = new OpenAI({ apiKey })
    this.model = process.env.OPENAI_MODEL || 'gpt-4-turbo-preview'
    this.temperature = Number.parseFloat(
      process.env.OPENAI_TEMPERATURE || '0.7'
    )
    this.maxTokens = Number.parseInt(
      process.env.OPENAI_MAX_TOKENS || '2000',
      10
    )

    this.stats = {
      totalTokens: 0,
      totalCost: 0,
      requestCount: 0,
    }

    logger.info('LLM Service initialized', {
      model: this.model,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
    })
  }

  async generateResponse(messages: ChatMessage[]): Promise<string> {
    const startTime = Date.now()

    try {
      logger.info('LLM request started', {
        model: this.model,
        messageCount: messages.length,
      })

      const completion: any = await this.retryRequest(() =>
        this.client.chat.completions.create({
          model: this.model,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: this.temperature,
          max_tokens: this.maxTokens,
        })
      )

      const response = completion.choices[0]?.message?.content || ''
      const tokensUsed = completion.usage?.total_tokens || 0
      const duration = Date.now() - startTime

      // Estimativa de custo (GPT-4 Turbo: ~$0.01 per 1K tokens input, $0.03 per 1K tokens output)
      const estimatedCost = (tokensUsed / 1000) * 0.02

      this.stats.totalTokens += tokensUsed
      this.stats.totalCost += estimatedCost
      this.stats.requestCount += 1

      logger.info('LLM request completed', {
        model: this.model,
        tokensUsed,
        duration,
        estimatedCost: estimatedCost.toFixed(4),
      })

      return response
    } catch (error) {
      const duration = Date.now() - startTime
      logger.error('LLM request failed', error as Error, {
        model: this.model,
        duration,
        messageCount: messages.length,
      })

      throw new ExternalServiceError('OpenAI', error as Error)
    }
  }

  async *streamResponse(messages: ChatMessage[]): AsyncGenerator<string> {
    const startTime = Date.now()

    try {
      logger.info('LLM streaming request started', {
        model: this.model,
        messageCount: messages.length,
      })

      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: this.temperature,
        max_tokens: this.maxTokens,
        stream: true,
      })

      let totalContent = ''

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          totalContent += content
          yield content
        }
      }

      const duration = Date.now() - startTime

      logger.info('LLM streaming request completed', {
        model: this.model,
        duration,
        contentLength: totalContent.length,
      })

      this.stats.requestCount += 1
    } catch (error) {
      const duration = Date.now() - startTime
      logger.error('LLM streaming request failed', error as Error, {
        model: this.model,
        duration,
        messageCount: messages.length,
      })

      throw new ExternalServiceError('OpenAI', error as Error)
    }
  }

  private async retryRequest<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delay = 1000
  ): Promise<T> {
    let lastError: Error | undefined

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
        const isRetriable = this.isRetriableError(error)

        if (attempt < maxRetries && isRetriable) {
          logger.warn(
            `LLM request failed, retrying (${attempt}/${maxRetries})`,
            {
              error: (error as Error).message,
              nextRetryIn: delay,
            }
          )

          await this.sleep(delay)
          delay *= 2 // Exponential backoff
        } else {
          break
        }
      }
    }

    throw lastError
  }

  private isRetriableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase()
      return (
        message.includes('timeout') ||
        message.includes('rate limit') ||
        message.includes('503') ||
        message.includes('502')
      )
    }
    return false
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getUsageStats(): UsageStats {
    return { ...this.stats }
  }

  async generateConversationTitle(firstMessage: string): Promise<string> {
    try {
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content:
            'Você é um assistente que gera títulos curtos e descritivos para conversas. Gere um título de no máximo 50 caracteres baseado na primeira mensagem do usuário. Responda apenas com o título, sem aspas ou formatação extra.',
        },
        {
          role: 'user',
          content: `Gere um título para uma conversa que começa com: "${firstMessage}"`,
        },
      ]

      const title = await this.generateResponse(messages)
      return title.trim().substring(0, 50)
    } catch (error) {
      logger.error('Failed to generate conversation title', error as Error)
      // Fallback to a generic title
      return firstMessage.substring(0, 50)
    }
  }
}

export default LLMService
