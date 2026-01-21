import type { FastifySchema } from 'fastify'

export const sendMessageSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['conversation_id', 'content'],
    properties: {
      conversation_id: {
        type: 'string',
        format: 'uuid',
        description: 'ID da conversa existente',
      },
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 10000,
        description: 'Conteúdo da mensagem do usuário',
      },
      metadata: {
        type: 'object',
        description: 'Metadados opcionais da mensagem',
      },
    } as const,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            userMessage: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                content: { type: 'string' },
                role: { type: 'string' },
                created_at: { type: 'string' },
              },
            },
            assistantMessage: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                content: { type: 'string' },
                role: { type: 'string' },
                created_at: { type: 'string' },
              },
            },
          },
        },
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' },
        code: { type: 'string' },
      },
    },
    404: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        error: { type: 'string' },
        code: { type: 'string' },
      },
    },
  },
}

export const newConversationSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['content'],
    properties: {
      content: {
        type: 'string',
        minLength: 1,
        maxLength: 10000,
        description: 'Primeira mensagem da conversa',
      },
      title: {
        type: 'string',
        maxLength: 100,
        description: 'Título opcional da conversa (se não fornecido, será gerado automaticamente)',
      },
    } as const,
    additionalProperties: false,
  },
  response: {
    201: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            conversation_id: { type: 'string' },
            title: { type: 'string' },
            userMessage: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                content: { type: 'string' },
                role: { type: 'string' },
                created_at: { type: 'string' },
              },
            },
            assistantMessage: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                content: { type: 'string' },
                role: { type: 'string' },
                created_at: { type: 'string' },
              },
            },
          },
        },
        message: { type: 'string' },
      },
    },
  },
}

export const conversationHistoryParamsSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'ID da conversa',
      },
    } as const,
    additionalProperties: false,
  },
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        minimum: 1,
        default: 1,
        description: 'Número da página',
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'Quantidade de mensagens por página',
      },
      role: {
        type: 'string',
        enum: ['user', 'assistant', 'system'],
        description: 'Filtrar por role da mensagem',
      },
    } as const,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              conversations_id: { type: 'string' },
              content: { type: 'string' },
              role: { type: 'string' },
              metadata: { type: 'object' },
              created_at: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  },
}

export const conversationListSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        minimum: 1,
        default: 1,
        description: 'Número da página',
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        default: 20,
        description: 'Quantidade de conversas por página',
      },
      is_favorite: {
        type: 'boolean',
        description: 'Filtrar apenas favoritas',
      },
    } as const,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              user_id: { type: 'string' },
              title: { type: 'string' },
              is_favorite: { type: 'boolean' },
              last_message_at: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  },
}

export const deleteConversationSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'ID da conversa a ser deletada',
      },
    } as const,
    additionalProperties: false,
  },
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  },
}
