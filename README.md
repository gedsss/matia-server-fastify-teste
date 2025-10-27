# Matia Server (Fastify) — Documentação do Projeto

Resumo curto: projeto Node.js (ESM) com Fastify + Sequelize para gerenciar perfis, conversas, mensagens, documentos, tags e logs de atividade. Abaixo há a lista de arquivos e diretórios do projeto, com descrição curta e links para os arquivos e os símbolos mais relevantes exportados em cada um.

---

## Execução rápida

- Instale dependências: npm install  
- Iniciar servidor: npm run start (usa [server.js](server.js))  
- Arquivo de sincronização manual: [sync.js](sync.js) — importa [models/foreignKeys.js](models/foreignKeys.js) antes de sincronizar.  
- Instância do Sequelize: [`sequelize`](db.js) — [db.js](db.js)  
- Documentação OpenAPI disponível em: `/docs` (configurada em [server.js](server.js)) ou consulte [swagger.yaml](swagger.yaml).

---

## Arquivos raiz

- [acrescentarDepois.sql](acrescentarDepois.sql) — SQL auxiliar / notas.
- [db.js](db.js) — exporta a instância do Sequelize (`sequelize`).
  - Símbolo exportado: [`sequelize`](db.js)
- [package.json](package.json) — metadados e scripts (script start -> `node server.js`).
- [server.js](server.js) — ponto de entrada do servidor Fastify, registro de rotas e Swagger.
  - Referências: registra roteadores em `routes/*` e usa [`sequelize`](db.js).
- [sync.js](sync.js) — script para sincronizar esquema via Sequelize; importa [models/foreignKeys.js](models/foreignKeys.js).
- [swagger.yaml](swagger.yaml) — especificação OpenAPI adicional.

---

## Configuração

- [config/config.json](config/config.json) — configuração do Sequelize por ambiente (development/test/production).

---

## Models (Sequelize)

Arquivos em `models/` definem os modelos e tabelas. Cada arquivo exporta um default com o nome do modelo definido internamente.

- [models/index.js](models/index.js) — carregador automático de modelos e execução de `associate` se existir.
  - Símbolo: arquivo bootstrap que monta `db` (objeto com `sequelize` e `Sequelize`).
- [models/foreignKeys.js](models/foreignKeys.js) — importa todos os modelos e define associações (belongsTo / hasMany). Importá-lo garante que associações existam antes de sync.
- [models/profile.js](models/profile.js) — modelo `profile`.
  - Símbolo exportado: [`profile`](models/profile.js)
- [models/user_roles.js](models/user_roles.js) — modelo `userRole`.
  - Símbolo exportado: [`userRole`](models/user_roles.js)
- [models/conversation.js](models/conversation.js) — modelo `conversation`.
  - Símbolo exportado: [`conversation`](models/conversation.js)
- [models/messages.js](models/messages.js) — modelo `messages`.
  - Símbolo exportado: [`messages`](models/messages.js)
- [models/documents.js](models/documents.js) — modelo `documents`.
  - Símbolo exportado: [`documents`](models/documents.js)
- [models/documents_tags.js](models/documents_tags.js) — modelo `documentsTag`.
  - Símbolo exportado: [`documentsTag`](models/documents_tags.js)
- [models/documents_tags_relation.js](models/documents_tags_relation.js) — modelo `documentsTagRelation`.
  - Símbolo exportado: [`documentsTagRelation`](models/documents_tags_relation.js)
- [models/documents_analysis.js](models/documents_analysis.js) — modelo `documentsAnalysis`.
  - Símbolo exportado: [`documentsAnalysis`](models/documents_analysis.js)
- [models/conversation_documents.js](models/conversation_documents.js) — modelo `conversationDocuments`.
  - Símbolo exportado: [`conversationDocuments`](models/conversation_documents.js)
- [models/activity_logs.js](models/activity_logs.js) — modelo `activityLogs`.
  - Símbolo exportado: [`activityLogs`](models/activity_logs.js)

---

## Migrations

- [migrations/20251013033217-add-performance-indexes.js](migrations/20251013033217-add-performance-indexes.js) — adiciona índices para melhorar performance.

---

## Controllers

Arquivos em `controllers/` implementam lógica CRUD e utilizam os modelos e as funções de resposta (`utils/response.js`).

- [controllers/profileController.js](controllers/profileController.js)  
  - Símbolos: [`profileController.createProfile`](controllers/profileController.js), [`profileController.getProfileById`](controllers/profileController.js), [`profileController.updateProfile`](controllers/profileController.js), [`profileController.deleteProfile`](controllers/profileController.js)
  - Observações: valida CPF com `cpf-cnpj-validator`, realiza hash de senha com `bcrypt`.
- [controllers/user_roleController.js](controllers/user_roleController.js)  
  - Símbolos: [`user_roleController.createUserRole`](controllers/user_roleController.js), [`user_roleController.getUserRoleById`](controllers/user_roleController.js), [`user_roleController.updateUserRole`](controllers/user_roleController.js), [`user_roleController.deleteUserRole`](controllers/user_roleController.js)
- [controllers/conversationController.js](controllers/conversationController.js)  
  - Símbolos: [`conversationController.createConversation`](controllers/conversationController.js), [`conversationController.getConversationById`](controllers/conversationController.js), [`conversationController.updateConversation`](controllers/conversationController.js), [`conversationController.deleteConversation`](controllers/conversationController.js)
- [controllers/messagesController.js](controllers/messagesController.js)  
  - Símbolos: [`messagesController.createMessages`](controllers/messagesController.js), [`messagesController.getMessagesById`](controllers/messagesController.js), [`messagesController.updateMessages`](controllers/messagesController.js), [`messagesController.deleteMessages`](controllers/messagesController.js)
- [controllers/documentsController.js](controllers/documentsController.js)  
  - Símbolos: [`documentsController.createDocuments`](controllers/documentsController.js), [`documentsController.getDocumentsById`](controllers/documentsController.js), [`documentsController.updateDocuments`](controllers/documentsController.js), [`documentsController.deleteDocuments`](controllers/documentsController.js)
- [controllers/documents_tagsController.js](controllers/documents_tagsController.js)  
  - Símbolos: [`documents_tagsController.createDocumentsTags`](controllers/documents_tagsController.js), [`documents_tagsController.getDocumentsTagsById`](controllers/documents_tagsController.js), [`documents_tagsController.updateDocumentsTags`](controllers/documents_tagsController.js), [`documents_tagsController.deleteDocumentsTags`](controllers/documents_tagsController.js)
- [controllers/documents_tags_relationController.js](controllers/documents_tags_relationController.js)  
  - Símbolos: [`documents_tags_relationController.createDocumentsTagsRelation`](controllers/documents_tags_relationController.js), [`documents_tags_relationController.getDocumentsTagsRelationById`](controllers/documents_tags_relationController.js), [`documents_tags_relationController.updateDocumentsTagsRelation`](controllers/documents_tags_relationController.js), [`documents_tags_relationController.deleteDocumentsTagsRelation`](controllers/documents_tags_relationController.js)
- [controllers/documents_analysisController.js](controllers/documents_analysisController.js)  
  - Símbolos: [`documents_analysisController.createDocumentsAnalisys`](controllers/documents_analysisController.js), [`documents_analysisController.getDocumentsAnalisysById`](controllers/documents_analysisController.js), [`documents_analysisController.updateDocumentsAnalisys`](controllers/documents_analysisController.js), [`documents_analysisController.deleteDocumentsAnalisys`](controllers/documents_analysisController.js)
- [controllers/conversation_documentsController.js](controllers/conversation_documentsController.js)  
  - Símbolos: [`conversation_documentsController.createConversationDocuments`](controllers/conversation_documentsController.js), [`conversation_documentsController.getConversationDocumentsById`](controllers/conversation_documentsController.js), [`conversation_documentsController.updateConversationDocuments`](controllers/conversation_documentsController.js), [`conversation_documentsController.deleteConversationDocuments`](controllers/conversation_documentsController.js)
- [controllers/activity_logsController.js](controllers/activity_logsController.js)  
  - Símbolos: [`activity_logsController.createActivityLogs`](controllers/activity_logsController.js), [`activity_logsController.getActivityLogsById`](controllers/activity_logsController.js), [`activity_logsController.updateActivityLogs`](controllers/activity_logsController.js), [`activity_logsController.deleteActivityLogs`](controllers/activity_logsController.js)

---

## Routes

Arquivos em `routes/` expõem os endpoints e associam os controllers.

- [routes/profileRoutes.js](routes/profileRoutes.js) — registra rotas `/api/profile` → usa `profileController`.
  - Export: default router plugin.
- [routes/user_roleRoutes.js](routes/user_roleRoutes.js) — `/api/user_roles` → `user_roleController`.
- [routes/conversationRoutes.js](routes/conversationRoutes.js) — `/api/conversations` → `conversationController`.
- [routes/messagesRoutes.js](routes/messagesRoutes.js) — `/api/messages` → `messagesController`.
- [routes/documentsRoutes.js](routes/documentsRoutes.js) — `/api/documents` → `documentsController`.
- [routes/documents_tagsRoutes.js](routes/documents_tagsRoutes.js) — `/api/documents_tags` → `documents_tagsController`.
- [routes/documents_tags_relationsRoutes.js](routes/documents_tags_relationsRoutes.js) — `/api/documents_tags_relations` → `documents_tags_relationController`.
- [routes/documents_analysisRoutes.js](routes/documents_analysisRoutes.js) — `/api/documents_analyses` → `documents_analysisController`.
- [routes/conversation_documentsRoutes.js](routes/conversation_documentsRoutes.js) — `/api/conversation_documents` → `conversation_documentsController`.
- [routes/activity_logsRoutes.js](routes/activity_logsRoutes.js) — `/api/activity_logs` → `activity_logsController`.

---

## Schemas (validação / documentação)

Arquivos em `schemas/` exportam objetos JSON Schema usados nas rotas.

- [schemas/profileSchema.js](schemas/profileSchema.js)  
  - Símbolos: [`profileSchema.createProfileSchema`](schemas/profileSchema.js), [`profileSchema.profileParamsSchema`](schemas/profileSchema.js)
- [schemas/user_rolesSchema.js](schemas/user_rolesSchema.js)  
  - Símbolos: [`user_rolesSchema.createUserRoleSchema`](schemas/user_rolesSchema.js), [`user_rolesSchema.userRoleParamsSchema`](schemas/user_rolesSchema.js)
- [schemas/messagesSchema.js](schemas/messagesSchema.js)  
  - Símbolos: [`messagesSchema.createMessagesSchema`](schemas/messagesSchema.js), [`messagesSchema.messagesParamsSchema`](schemas/messagesSchema.js)
- [schemas/documentsSchema.js](schemas/documentsSchema.js)  
  - Símbolos: [`documentsSchema.createDocumentsSchema`](schemas/documentsSchema.js), [`documentsSchema.documentsParamsSchema`](schemas/documentsSchema.js)
- [schemas/documents_tagsSchema.js](schemas/documents_tagsSchema.js)  
  - Símbolos: [`documents_tagsSchema.createDocumentsTagsSchema`](schemas/documents_tagsSchema.js), [`documents_tagsSchema.documentsTagsParamsSchema`](schemas/documents_tagsSchema.js)
- [schemas/documents_tags_relationSchema.js](schemas/documents_tags_relationSchema.js)  
  - Símbolos: [`documents_tags_relationSchema.createDocumentsTagsRelationSchema`](schemas/documents_tags_relationSchema.js), [`documents_tags_relationSchema.documentsTagsRelationParamsSchema`](schemas/documents_tags_relationSchema.js)
- [schemas/documents_analysisSchema.js](schemas/documents_analysisSchema.js)  
  - Símbolos: [`documents_analysisSchema.createDocumentsAnalysisSchema`](schemas/documents_analysisSchema.js), [`documents_analysisSchema.documentsAnalysisParamsSchema`](schemas/documents_analysisSchema.js)
- [schemas/conversationSchema.js](schemas/conversationSchema.js)  
  - Símbolos: [`conversationSchema.createConversationsSchema`](schemas/conversationSchema.js), [`conversationSchema.conversationsParamsSchema`](schemas/conversationSchema.js)
- [schemas/conversation_documentsSchema.js](schemas/conversation_documentsSchema.js)  
  - Símbolos: [`conversation_documentsSchema.createConversationDocumentsSchema`](schemas/conversation_documentsSchema.js), [`conversation_documentsSchema.conversationDocumentsParamsSchema`](schemas/conversation_documentsSchema.js)
- [schemas/activity_logsSchema.js](schemas/activity_logsSchema.js)  
  - Símbolos: [`activity_logsSchema.createActivityLogsSchema`](schemas/activity_logsSchema.js), [`activity_logsSchema.activityLogsParamsSchema`](schemas/activity_logsSchema.js)

---

## Utils

- [utils/response.js](utils/response.js) — helpers para respostas HTTP usadas pelos controllers.
  - Símbolos exportados: [`success`](utils/response.js), [`fail`](utils/response.js)

---

## Diretórios vazios / meta

- [node_modules/](node_modules) — dependências (não versionadas aqui).
- [.git/](.git) — metadados Git.

---

## Observações importantes (integração entre arquivos)

- A instância do Sequelize exportada em [db.js](db.js) é importada em todos os modelos (ex.: [`profile`](models/profile.js), [`documents`](models/documents.js), etc.).  
- [models/foreignKeys.js](models/foreignKeys.js) importa todos os modelos e define associações; é importante que seja importado ANTES de chamar `sequelize.sync()` (veja [sync.js](sync.js) que já faz isso).  
- [server.js](server.js) registra roteadores (`routes/*`) e também chama `sequelize.authenticate()` e `sequelize.sync({ alter: true })` no startup.  
- Controllers usam os modelos diretamente e utilizam [`success`](utils/response.js) / [`fail`](utils/response.js) para padronizar respostas.

---

Se quiser, eu gero uma versão em inglês ou adiciono exemplos de endpoints (curl) para cada