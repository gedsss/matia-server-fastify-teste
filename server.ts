import type {
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import cors from '@fastify/cors'

// Importações dos Módulos de Rotas (agora são arquivos .ts ou .js compilados)
import profileRoutes from './routes/profileRoutes.js'
import userRoleRoutes from './routes/user_roleRoutes.js'
import messagesRoutes from './routes/messagesRoutes.js'
import documentsRoutes from './routes/documentsRoutes.js'
import documentsTagsRoutes from './routes/documents_tagsRoutes.js'
import documentsTagsRelationsRoutes from './routes/documents_tags_relationsRoutes.js'
import documentsAnalysesRoutes from './routes/documents_analysisRoutes.js'
import conversationsRoutes from './routes/conversationRoutes.js'
import conversationDocumentsRoutes from './routes/conversation_documentsRoutes.js'
import activityLogsRoutes from './routes/activity_logsRoutes.js'
import userActivityLogsRoutes from './routes/user_activity_logRoutes.js'

// Importação da instância do Sequelize (já tipada)
import sequelize from './db.js'

// Tipando a instância do Fastify explicitamente
const fastify: FastifyInstance = Fastify({ logger: true })

// 0. PLUGINS DE CONTEÚDO (CORS)
await fastify.register(cors, { origin: true })

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

await fastify.register(swaggerUi, {
  routePrefix: '/docs',
})

// --- ROTAS DE TESTE E SAÚDE ---
fastify.get(
  '/test-swagger-completo',
  {
    schema: {
      summary: 'Teste de Rota Completa para Diagnóstico',
      description: 'Verifica se o Swagger coleta rotas com definição completa.',
      tags: ['Test'],
      response: {
        200: {
          description: 'Resposta de sucesso.',
          type: 'object',
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
  },
  async () => {
    return { status: 'ok' }
  }
)

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.code(200).send({ status: 'ok', message: 'API rodando' })
})

// --- TRATAMENTO DE ERROS ---
fastify.setErrorHandler((error, request, reply) => {
  // O código original tinha uma checagem para 'ZodError', que não está definido aqui.
  // Mantemos a estrutura para que você possa tipá-lo se necessário.
  // Exemplo para um erro customizado:
  /*
  if (error && error.name === 'ZodError') {
    return reply.code(400).send({
      message: 'Erro de validação nos dados enviados.',
      issues: (error as FastifyInstance).errors // Assumindo a estrutura do Zod
    })
  }
  */
  reply.send(error)
})

// --- INICIALIZAÇÃO DO SERVIDOR ---
const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexão com o banco de dados estabelecida com sucesso.')

    // Sincronização e log
    await sequelize.sync({ alter: true })
    console.log('Modelos sincronizados. Coluna "name" deve existir agora.')

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
