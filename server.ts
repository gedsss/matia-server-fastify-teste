import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import type { FastifyInstance, FastifyRegisterOptions } from 'fastify'
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
import authenticate from './authPlugin.js'
// Importação da instância do Sequelize (já tipada)
import sequelize from './db.js'
import activityLogsRoutes from './routes/activity_logsRoutes.js'
import conversationDocumentsRoutes from './routes/conversation_documentsRoutes.js'
import conversationsRoutes from './routes/conversationRoutes.js'
import documentsAnalysesRoutes from './routes/documents_analysisRoutes.js'
import documentsTagsRelationsRoutes from './routes/documents_tags_relationsRoutes.js'
import documentsTagsRoutes from './routes/documents_tagsRoutes.js'
import documentsRoutes from './routes/documentsRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'
// Importações dos Módulos de Rotas (agora são arquivos .ts ou .js compilados)
import profileRoutes from './routes/profileRoutes.js'
import userActivityLogsRoutes from './routes/user_activity_logRoutes.js'
import userRoleRoutes from './routes/user_roleRoutes.js'

// Tipando a instância do Fastify explicitamente
const fastify: FastifyInstance = Fastify({ logger: true })

await fastify.register(fastifyEnv, {
  schema: {
    type: 'object',
    required: ['JWT_SECRET'],
    properties: {
      JWT_SECRET: { type: 'string' },
    },
  },

  dotenv: true,
})

await fastify.register(authenticate)

// 0. PLUGINS DE CONTEÚDO (CORS)
await fastify.register(cors, { origin: true })

// --- SWAGGER/OPENAPI CONFIGURAÇÃO ---
await fastify.register(swagger, {
  openapi: {
    info: {
      title: 'Matia User API',
      description: 'API de Gerenciamento de Usuários e Logs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Ambiente de Desenvolvimento',
      },
    ],
    tags: [
      { name: 'Profile', description: 'Operações de Usuários' },
      { name: 'UserRole', description: 'Log de Funções de Usuários' },
      { name: 'Messages', description: 'Log de Mensagens' },
      { name: 'Documents', description: 'Lo de Documentos' },
      { name: 'DocumentsTags', description: 'Log de Tags de Documenos' },
      {
        name: 'DocumentsTagsRelations',
        description: 'Log de Tags de Relação de Documenos',
      },
      {
        name: 'DocumentsAnalyses',
        description: 'Log de Analises de Documentos',
      },
      { name: 'Conversations', description: 'Log de Conversações' },
      {
        name: 'ConversationDocuments',
        description: 'Log de Documentos de Conversação',
      },
      {
        name: 'ActivityLogs',
        description: 'Log de Atividades de Administrador',
      },
      { name: 'UserActivityLog', description: 'Log de Atividades de Usuários' },
    ],
  },
})

// --- REGISTRO DE ROTAS ---
await fastify.register(profileRoutes, {
  prefix: '/api/profile',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(userRoleRoutes, {
  prefix: '/api/user_roles',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(messagesRoutes, {
  prefix: '/api/messages',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(documentsRoutes, {
  prefix: '/api/documents',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(documentsTagsRoutes, {
  prefix: '/api/documents_tags',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(documentsTagsRelationsRoutes, {
  prefix: '/api/documents_tags_relations',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(documentsAnalysesRoutes, {
  prefix: '/api/documents_analyses',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(conversationsRoutes, {
  prefix: '/api/conversations',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(conversationDocumentsRoutes, {
  prefix: '/api/conversation_documents',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(activityLogsRoutes, {
  prefix: '/api/activity_logs',
} as FastifyRegisterOptions<FastifyInstance>)
await fastify.register(userActivityLogsRoutes, {
  prefix: '/api/user_activty_log',
} as FastifyRegisterOptions<FastifyInstance>)

// --- SWAGGER/OPENAPI CONFIGURAÇÃO ---

await fastify.register(swaggerUi, {
  routePrefix: '/docs',
})

// --- INICIALIZAÇÃO DO SERVIDOR ---
const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexão com o banco de dados estabelecida com sucesso.')

    await fastify.ready()

    await fastify.listen({ port: 3002, host: '0.0.0.0' })
    fastify.log.info('Servidor rodando em http://localhost:3002')
    fastify.log.info(
      'Documentação Swagger disponível em http://localhost:3002/docs'
    )
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
