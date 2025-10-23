import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
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
import cors from '@fastify/cors'
import sequelize from './db.js' // Certifique-se de que o caminho está correto

const fastify = Fastify({ logger: true })

// 0. PLUGINS DE CONTEÚDO (CORS)
await fastify.register(cors, { origin: true })


// 1. REGISTRO DE TODAS AS ROTAS (Plugins)
await fastify.register(profileRoutes, { prefix: '/api/profile' })
await fastify.register(userRoleRoutes, { prefix: '/api/user_roles' })
await fastify.register(messagesRoutes, { prefix: '/api/messages' })
await fastify.register(documentsRoutes, { prefix: '/api/documents' })
await fastify.register(documentsTagsRoutes, { prefix: '/api/documents_tags' })
await fastify.register(documentsTagsRelationsRoutes, { prefix: '/api/documents_tags_relations' })
await fastify.register(documentsAnalysesRoutes, { prefix: '/api/documents_analyses' })
await fastify.register(conversationsRoutes, { prefix: '/api/conversations' })
await fastify.register(conversationDocumentsRoutes, { prefix: '/api/conversation_documents' })
await fastify.register(activityLogsRoutes, { prefix: '/api/activity_logs' })

// 2.1. Configuração do SWAGGER (Especificação OpenAPI)
await fastify.register(swagger, {
    openapi: {
        info: {
            title: 'Matia User API',
            description: 'API de Gerenciamento de Usuários e Logs',
            version: '1.0.0',
        },
        servers: [{
            url: 'http://localhost:3002', 
            description: 'Ambiente de Desenvolvimento',
        }],
        tags: [ 
            { name: 'Profile', description: 'Operações de Usuários' },
            { name: 'UserRole', description: 'Log de Funções de Usuários' },
            { name: 'Messages', description: 'Log de Mensagens' },
            { name: 'Documents', description: 'Lo de Documentos' },
            { name: 'DocumentsTags', description: 'Log de Tags de Documenos' },
            { name: 'DocumentsTagsRelations', description: 'Log de Tags de Relação de Documenos' },
            { name: 'DocumentsAnalyses', description: 'Log de Analises de Documentos' },
            { name: 'Conversations', description: 'Log de Conversações' },
            { name: 'ConversationDocuments', description: 'Log de Documentos de Conversação' },
            { name: 'ActivityLogs', description: 'Log de Atividades' } 
        ]
    }
});

// 2.2. Configuração do SWAGGER UI (Interface Gráfica)
await fastify.register(swaggerUi, {
    routePrefix: '/docs', // Onde o painel do Swagger será acessível
    exposeRoute: true
});

fastify.get('/test-swagger-completo', {
    schema: {
        summary: 'Teste de Rota Completa para Diagnóstico',
        description: 'Verifica se o Swagger coleta rotas com definição completa.',
        tags: ['Test'],
        response: {
            200: {
                description: 'Resposta de sucesso.',
                type: 'object',
                properties: {
                    status: { type: 'string' }
                }
            }
        }
    }
}, async (request, reply) => {
    return { status: 'ok' }
})

// rota de saúde / root
fastify.get('/', async (request, reply) => {
  return reply.code(200).send({ status: 'ok', message: 'API rodando' })
})


fastify.setErrorHandler((error, request, reply) => {
  if (error && error.name === 'ZodError') {
    return reply.code(400).send({
      message: 'Erro de validação nos dados enviados.',
      issues: error.errors
    })
  }
  reply.send(error)
})

const start = async () => {
  try {
    // Autenticação e Sincronização do Sequelize no início
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    await sequelize.sync({ alter: true }) 
    console.log('Modelos sincronizados. Coluna "name" deve existir agora.');
    
    // CHAMADA CRÍTICA: Garante que TODOS os .register() acima foram finalizados.
    await fastify.ready() 
    
    await fastify.listen({ port: 3002, host: '0.0.0.0' })
    fastify.log.info('Servidor rodando em http://localhost:3002')
    fastify.log.info('Documentação Swagger disponível em http://localhost:3002/docs')
    
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()