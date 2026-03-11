import type { FastifyRequest } from 'fastify'
import Conversation from '../models/conversation.js'
import Messages from '../models/messages.js'
import LLMService from '../services/llmService.js'
import type { ChatMessage } from '../services/llmService.js'
import {
  MissingFieldError,
  DocumentNotFoundError,
  InternalServerError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse, paginatedResponse } from '../utils/response.js'
import Logger from '../utils/logger.js'
import cacheService from '../utils/cache.js'

const logger = new Logger()

// Cache environment configuration
const CHAT_HISTORY_LIMIT = Number.parseInt(
  process.env.CHAT_HISTORY_LIMIT || '10',
  10
)

interface SendMessageBody {
  conversation_id: string
  content: string
  metadata?: object
}

interface NewConversationBody {
  content: string
  title?: string
}

interface ConversationHistoryParams {
  id: string
}

interface ConversationHistoryQuery {
  page?: number
  limit?: number
  role?: 'user' | 'assistant' | 'system'
}

interface ConversationListQuery {
  page?: number
  limit?: number
  is_favorite?: boolean
}

interface DeleteConversationParams {
  id: string
}

export const sendMessage = async (request: FastifyRequest) => {
  const startTime = Date.now()
  const requestId = (request.id as string) || crypto.randomUUID()
  const userId = (request.user as any)?.id
  const llmService = new LLMService()

  try {
    const { conversation_id, content, metadata } =
      request.body as SendMessageBody

    if (!conversation_id || !content) {
      throw new MissingFieldError()
    }

    logger.info('Processing chat message', {
      requestId,
      userId,
      conversationId: conversation_id,
    })

    // Verificar se a conversa existe e pertence ao usuário
    const conversation = await Conversation.findOne({
      where: { id: conversation_id, user_id: userId },
    })

    if (!conversation) {
      throw new DocumentNotFoundError(conversation_id)
    }

    // Buscar histórico de mensagens (últimas 10)
    const messageHistory = await Messages.findAll({
      where: { conversations_id: conversation_id },
      order: [['created_at', 'DESC']],
      limit: CHAT_HISTORY_LIMIT,
    })

    // Reverter ordem para enviar ao LLM (mais antigas primeiro)
    const sortedHistory = messageHistory.reverse()

    // Salvar mensagem do usuário
    const userMessage = await Messages.create({
      conversations_id: conversation_id,
      content,
      role: 'user',
      metadata: metadata || {},
    })

    logger.info('User message saved', {
      requestId,
      messageId: userMessage.id,
      conversationId: conversation_id,
    })

    // Preparar contexto para LLM
    const chatMessages: ChatMessage[] = [
      ...sortedHistory.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content,
      },
    ]

    // Obter resposta da LLM
    const aiResponse = await llmService.generateResponse(chatMessages)

    // Salvar resposta da IA
    const assistantMessage = await Messages.create({
      conversations_id: conversation_id,
      content: aiResponse,
      role: 'assistant',
      metadata: {},
    })

    // Atualizar last_message_at da conversa
    await conversation.update({
      last_message_at: new Date(),
    })

    // Invalidar cache do histórico e da lista de conversas do usuário
    await cacheService.del(`chat:history:${conversation_id}`)
    await cacheService.invalidatePrefix(`chat:conversations:${userId}`)

    const duration = Date.now() - startTime

    logger.info('Chat message processed successfully', {
      requestId,
      userId,
      conversationId: conversation_id,
      duration,
    })

    return successResponse(
      {
        userMessage: userMessage.toJSON(),
        assistantMessage: assistantMessage.toJSON(),
      },
      'Mensagem enviada com sucesso'
    )
  } catch (err) {
    const duration = Date.now() - startTime

    if (
      err instanceof DocumentNotFoundError ||
      err instanceof MissingFieldError
    ) {
      logger.warn('Chat message validation failed', {
        requestId,
        userId,
        duration,
        error: (err as Error).message,
      })
      throw err
    }

    logger.error('Chat message processing failed', err as Error, {
      requestId,
      userId,
      duration,
    })

    throw new InternalServerError('Erro ao processar mensagem', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export const getConversationHistory = async (request: FastifyRequest) => {
  const requestId = (request.id as string) || crypto.randomUUID()
  const userId = (request.user as any)?.id

  try {
    const { id } = request.params as ConversationHistoryParams
    const {
      page = 1,
      limit = 20,
      role,
    } = request.query as ConversationHistoryQuery

    logger.info('Fetching conversation history', {
      requestId,
      userId,
      conversationId: id,
      page,
      limit,
    })

    // Verificar se a conversa existe e pertence ao usuário
    const conversation = await Conversation.findOne({
      where: { id, user_id: userId },
    })

    if (!conversation) {
      throw new DocumentNotFoundError(id)
    }

    const offset = (page - 1) * limit
    const where: any = { conversations_id: id }

    if (role) {
      where.role = role
    }

    // Cache-Aside: chave única por conversa + página + filtro
    const cacheKey = `chat:history:${id}:p${page}:l${limit}${role ? `:r${role}` : ''}`

    const cached = await cacheService.get<{ count: number; messages: any[] }>(
      cacheKey
    )
    if (cached) {
      logger.info('Conversation history fetched from cache', {
        requestId,
        conversationId: id,
        messageCount: cached.messages.length,
      })

      return paginatedResponse(
        cached.messages,
        page,
        limit,
        cached.count,
        'Histórico recuperado com sucesso'
      )
    }

    const { count, rows: messages } = await Messages.findAndCountAll({
      where,
      order: [['created_at', 'ASC']],
      limit,
      offset,
    })

    const messagesJson = messages.map(m => m.toJSON())

    // Armazena no cache (60s - histórico muda com frequência)
    await cacheService.set(cacheKey, { count, messages: messagesJson }, 60)

    logger.info('Conversation history fetched from database', {
      requestId,
      conversationId: id,
      messageCount: messages.length,
      totalMessages: count,
    })

    return paginatedResponse(
      messagesJson,
      page,
      limit,
      count,
      'Histórico recuperado com sucesso'
    )
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      logger.warn('Conversation not found', {
        requestId,
        userId,
        error: (err as Error).message,
      })
      throw err
    }

    logger.error('Failed to fetch conversation history', err as Error, {
      requestId,
      userId,
    })

    throw new InternalServerError('Erro ao buscar histórico', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export const startNewConversation = async (request: FastifyRequest) => {
  const startTime = Date.now()
  const requestId = (request.id as string) || crypto.randomUUID()
  const userId = (request.user as any)?.id
  const llmService = new LLMService()

  try {
    const { content, title } = request.body as NewConversationBody

    if (!content) {
      throw new MissingFieldError()
    }

    logger.info('Starting new conversation', {
      requestId,
      userId,
      hasCustomTitle: !!title,
    })

    // Gerar título se não fornecido
    let conversationTitle = title
    if (!conversationTitle) {
      conversationTitle = await llmService.generateConversationTitle(content)
    }

    // Criar nova conversa
    const conversation = await Conversation.create({
      user_id: userId,
      title: conversationTitle,
      is_favorite: false,
      last_message_at: new Date(),
    })

    logger.info('Conversation created', {
      requestId,
      conversationId: conversation.get('id'),
      title: conversationTitle,
    })

    // Salvar primeira mensagem do usuário
    const userMessage = await Messages.create({
      conversations_id: conversation.get('id'),
      content,
      role: 'user',
      metadata: {},
    })

    // Obter resposta da LLM
    const chatMessages: ChatMessage[] = [
      {
        role: 'user',
        content,
      },
    ]

    const aiResponse = await llmService.generateResponse(chatMessages)

    // Salvar resposta da IA
    const assistantMessage = await Messages.create({
      conversations_id: conversation.get('id'),
      content: aiResponse,
      role: 'assistant',
      metadata: {},
    })

    const duration = Date.now() - startTime

    logger.info('New conversation started successfully', {
      requestId,
      userId,
      conversationId: conversation.get('id'),
      duration,
    })

    // Invalidar cache da lista de conversas do usuário
    await cacheService.invalidatePrefix(`chat:conversations:${userId}`)

    return successResponse(
      {
        conversation_id: conversation.get('id'),
        title: conversationTitle,
        userMessage: userMessage.toJSON(),
        assistantMessage: assistantMessage.toJSON(),
      },
      'Conversa criada com sucesso'
    )
  } catch (err) {
    const duration = Date.now() - startTime

    if (err instanceof MissingFieldError) {
      logger.warn('New conversation validation failed', {
        requestId,
        userId,
        duration,
        error: (err as Error).message,
      })
      throw err
    }

    logger.error('Failed to start new conversation', err as Error, {
      requestId,
      userId,
      duration,
    })

    throw new InternalServerError('Erro ao criar conversa', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export const getConversationsList = async (request: FastifyRequest) => {
  const requestId = (request.id as string) || crypto.randomUUID()
  const userId = (request.user as any)?.id

  try {
    const {
      page = 1,
      limit = 20,
      is_favorite,
    } = request.query as ConversationListQuery

    logger.info('Fetching conversations list', {
      requestId,
      userId,
      page,
      limit,
    })

    const offset = (page - 1) * limit
    const where: any = { user_id: userId }

    if (is_favorite !== undefined) {
      where.is_favorite = is_favorite
    }

    // Cache-Aside: chave única por usuário + página + filtro
    const cacheKey = `chat:conversations:${userId}:p${page}:l${limit}${is_favorite !== undefined ? `:fav${is_favorite}` : ''}`

    const cached = await cacheService.get<{
      count: number
      conversations: any[]
    }>(cacheKey)
    if (cached) {
      logger.info('Conversations list fetched from cache', {
        requestId,
        userId,
        conversationCount: cached.conversations.length,
      })

      return paginatedResponse(
        cached.conversations,
        page,
        limit,
        cached.count,
        'Conversas recuperadas com sucesso'
      )
    }

    const { count, rows: conversations } = await Conversation.findAndCountAll({
      where,
      order: [['last_message_at', 'DESC']],
      limit,
      offset,
    })

    const conversationsJson = conversations.map(c => c.toJSON())

    // Armazena no cache (120s - lista de conversas)
    await cacheService.set(
      cacheKey,
      { count, conversations: conversationsJson },
      120
    )

    logger.info('Conversations list fetched from database', {
      requestId,
      userId,
      conversationCount: conversations.length,
      totalConversations: count,
    })

    return paginatedResponse(
      conversationsJson,
      page,
      limit,
      count,
      'Conversas recuperadas com sucesso'
    )
  } catch (err) {
    logger.error('Failed to fetch conversations list', err as Error, {
      requestId,
      userId,
    })

    throw new InternalServerError('Erro ao buscar conversas', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export const deleteConversation = async (request: FastifyRequest) => {
  const requestId = (request.id as string) || crypto.randomUUID()
  const userId = (request.user as any)?.id

  try {
    const { id } = request.params as DeleteConversationParams

    logger.info('Deleting conversation', {
      requestId,
      userId,
      conversationId: id,
    })

    // Verificar se a conversa existe e pertence ao usuário
    const conversation = await Conversation.findOne({
      where: { id, user_id: userId },
    })

    if (!conversation) {
      throw new DocumentNotFoundError(id)
    }

    // Deletar mensagens associadas (CASCADE deve fazer isso automaticamente, mas vamos garantir)
    await Messages.destroy({
      where: { conversations_id: id },
    })

    // Deletar conversa
    await conversation.destroy()

    // Invalidar cache do histórico e da lista de conversas
    await cacheService.invalidatePrefix(`chat:history:${id}`)
    await cacheService.invalidatePrefix(`chat:conversations:${userId}`)

    logger.info('Conversation deleted successfully', {
      requestId,
      userId,
      conversationId: id,
    })

    return successResponse('Conversa deletada com sucesso')
  } catch (err) {
    if (err instanceof DocumentNotFoundError) {
      logger.warn('Conversation not found for deletion', {
        requestId,
        userId,
        error: (err as Error).message,
      })
      throw err
    }

    logger.error('Failed to delete conversation', err as Error, {
      requestId,
      userId,
    })

    throw new InternalServerError('Erro ao deletar conversa', {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
    })
  }
}

export default {
  sendMessage,
  getConversationHistory,
  startNewConversation,
  getConversationsList,
  deleteConversation,
}
