# 🏛️ Matia Server (Fastify) — Documentação do Projeto

API REST desenvolvida com **Fastify + TypeScript** para o sistema **Matia Legal AI**, focada em gerenciamento de usuários, documentos, conversas, mensagens e logs de atividade.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Bibliotecas](#-bibliotecas)
- [Funcionalidades](#-funcionalidades)
- [Segurança](#-segurança)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura e Funcionamento](#-arquitetura-e-funcionamento)
- [Rotas da API](#-rotas-da-api)
- [Autenticação](#-autenticação)
- [Documentação Swagger](#-documentação-swagger)
- [Banco de Dados](#-banco-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Contribuindo](#-contribuindo)

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript (ESM) |
| **TypeScript** | 5.x | Tipagem estática |
| **Fastify** | 5.x | Framework web de alta performance |
| **Sequelize** | 6.x | ORM para PostgreSQL |
| **PostgreSQL** | 14+ | Banco de dados relacional |
| **Zod** | 4.x | Validação de schemas em runtime |
| **Biome** | 2.x | Linter e formatter |
| **Vitest** | 4.x | Framework de testes |

---

## 📦 Bibliotecas

### Dependências de Produção

| Biblioteca | Descrição |
|-----------|-----------|
| `fastify` | Core do servidor web |
| `@fastify/cors` | Controle de Cross-Origin Resource Sharing |
| `@fastify/env` | Carregamento e validação de variáveis de ambiente |
| `@fastify/helmet` | Headers HTTP de segurança (CSP, XSS, etc.) |
| `@fastify/jwt` | Autenticação via JSON Web Tokens |
| `@fastify/rate-limit` | Limitação de taxa de requisições |
| `@fastify/swagger` | Geração automática de documentação OpenAPI |
| `@fastify/swagger-ui` | Interface gráfica Swagger UI |
| `@fastify/type-provider-json-schema-to-ts` | Integração de tipo com JSON Schema |
| `fastify-type-provider-zod` | Integração do Zod como provedor de tipos |
| `zod` | Validação declarativa de schemas |
| `sequelize` | ORM para banco de dados relacional |
| `pg` | Driver PostgreSQL para Node.js |
| `bcrypt` | Hash seguro de senhas com salt |
| `cpf-cnpj-validator` | Validação de CPF/CNPJ brasileiros |
| `openai` | Integração com API da OpenAI (LLM) |
| `uuid` | Geração de identificadores únicos |
| `umzug` | Runner de migrations Sequelize |
| `glob` | Localização de arquivos por padrões |
| `yamljs` | Parsing de arquivos YAML |
| `sqlite3` | Banco SQLite (utilizado em testes) |

### Dependências de Desenvolvimento

| Biblioteca | Descrição |
|-----------|-----------|
| `@biomejs/biome` | Linter e formatter (Biome) |
| `vitest` | Framework de testes unitários |
| `@vitest/coverage-v8` | Cobertura de código com V8 |
| `@vitest/ui` | Interface visual para testes |
| `typescript` | Compilador TypeScript |
| `tsx` | Execução direta de TypeScript via ESM |
| `ts-node` | Execução de TypeScript no Node.js |
| `sequelize-cli` | CLI para criação e execução de migrations |
| `c8` | Gerador de relatórios de cobertura |
| `tsconfig-paths` | Suporte a path aliases do TypeScript |

---

## ✨ Funcionalidades

- ✅ Autenticação JWT
- ✅ CRUD completo de usuários (profiles)
- ✅ Gerenciamento de documentos
- ✅ Sistema de conversas e mensagens
- ✅ Chat com integração a LLM (OpenAI)
- ✅ Tags e categorização de documentos
- ✅ Análise de documentos
- ✅ Logs de atividade e auditoria
- ✅ Documentação automática (Swagger/OpenAPI)
- ✅ Migrations de banco de dados

---

## 🛡️ Segurança

| Recurso | Descrição | Status |
|---------|-----------|--------|
| **Helmet** | Headers HTTP de segurança (CSP, XSS, etc.) | ✅ Ativo |
| **Rate Limiting** | 100 req/min global, 5 req/15min no login | ✅ Ativo |
| **CORS** | Origens específicas configuradas | ✅ Ativo |
| **JWT** | Autenticação stateless com tokens | ✅ Ativo |
| **Bcrypt** | Hash de senhas com salt | ✅ Ativo |
| **Validação CPF** | Validação de documentos brasileiros | ✅ Ativo |
| **Error Handler** | Tratamento centralizado de erros | ✅ Ativo |

### Configuração de CORS

```typescript
origin: [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://matia-legal-ai.vercel.app',
  'https://www.matia.com.br',
]
```

### Rate Limiting

| Rota | Limite | Janela |
|------|--------|--------|
| Global | 100 requisições | 1 minuto |
| Login (`/api/auth/login`) | 5 requisições | 15 minutos |
| Registro (`/api/profile/profile`) | 3 requisições | 1 hora |

---

## 📥 Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/gedsss/matia-server-fastify-teste.git
cd matia-server-fastify-teste

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Execute as migrations
npm run migrate

# 5. Inicie o servidor
npm run dev
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
# Servidor
NODE_ENV=development
LOG_LEVEL=info

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=matia_db
DB_USER=seu_usuario
DB_PASS=sua_senha

# LLM (OpenAI)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_TEMPERATURE=0.7
OPENAI_MAX_TOKENS=2000

# Chat
CHAT_HISTORY_LIMIT=10
CHAT_RATE_LIMIT_MAX=30
CHAT_RATE_LIMIT_WINDOW=1m

# Feature Flags
ENABLE_STREAMING=false
ENABLE_RAG=false
```

---

## ▶️ Executando o Projeto

```bash
# Desenvolvimento (com hot reload via tsx)
npm run dev

# Produção
npm run build
npm start

# Verificar lint
npm run lint

# Formatar código
npm run format

# Testes
npm test

# Testes com cobertura
npm run coverage
```

O servidor estará disponível em: `http://localhost:3002`

---

## 📁 Estrutura do Projeto

```
matia-server-fastify-teste/
├── migrations/                          # Migrations do banco de dados (Sequelize CLI)
├── scripts/                             # Scripts utilitários (ex.: runMigrations.ts)
├── src/
│   ├── config/
│   │   └── config.json                  # Configuração do Sequelize por ambiente
│   ├── controllers/                     # Lógica de negócio de cada recurso
│   │   ├── loginController.ts           # Autenticação e geração de JWT
│   │   ├── profileController.ts         # CRUD de usuários (valida CPF, hash bcrypt)
│   │   ├── chatController.ts            # Integração com LLM (OpenAI)
│   │   ├── messagesController.ts
│   │   ├── documentsController.ts
│   │   ├── documents_tagsController.ts
│   │   ├── documents_tags_relationController.ts
│   │   ├── documents_analysisController.ts
│   │   ├── conversationController.ts
│   │   ├── conversation_documentsController.ts
│   │   ├── activity_logsController.ts
│   │   ├── user_activity_logController.ts
│   │   └── user_roleController.ts
│   ├── errors/                          # Classes de erro customizadas
│   │   ├── appError.ts                  # Classe base AppError
│   │   ├── errorCodes.ts                # Códigos de erro padronizados
│   │   └── errors.ts                    # Erros específicos da aplicação
│   ├── middleware/                      # Middlewares Fastify
│   │   ├── asyncHandler.ts              # Wrapper para handlers assíncronos
│   │   └── errorHandler.ts              # Tratamento centralizado de erros
│   ├── models/                          # Modelos Sequelize (TypeScript)
│   │   ├── index.ts                     # Bootstrap de modelos e associações
│   │   ├── foreignKeys.ts               # Definição de todas as associações
│   │   ├── profile.ts
│   │   ├── user_roles.ts
│   │   ├── user_activity_log.ts
│   │   ├── messages.ts
│   │   ├── documents.ts
│   │   ├── documents_tags.ts
│   │   ├── documents_tags_relation.ts
│   │   ├── documents_analysis.ts
│   │   ├── conversation.ts
│   │   ├── conversation_documents.ts
│   │   └── activity_logs.ts
│   ├── plugins/                         # Plugins Fastify registrados no servidor
│   │   ├── authPlugin.ts                # Autenticação JWT (@fastify/jwt)
│   │   ├── helmet.ts                    # Headers de segurança (@fastify/helmet)
│   │   └── ratelimit.ts                 # Rate limiting (@fastify/rate-limit)
│   ├── routes/                          # Definição de rotas e associação com controllers
│   │   ├── loginRoutes.ts
│   │   ├── profileRoutes.ts
│   │   ├── chatRoutes.ts
│   │   ├── messagesRoutes.ts
│   │   ├── documentsRoutes.ts
│   │   ├── documents_tagsRoutes.ts
│   │   ├── documents_tags_relationsRoutes.ts
│   │   ├── documents_analysisRoutes.ts
│   │   ├── conversationRoutes.ts
│   │   ├── conversation_documentsRoutes.ts
│   │   ├── activity_logsRoutes.ts
│   │   ├── user_activity_logRoutes.ts
│   │   └── user_roleRoutes.ts
│   ├── schemas/                         # Schemas de validação Zod / JSON Schema
│   │   ├── profileSchema.ts
│   │   ├── chatSchema.ts
│   │   ├── messagesSchema.ts
│   │   ├── documentsSchema.ts
│   │   ├── documents_tagsSchema.ts
│   │   ├── documents_tags_relationSchema.ts
│   │   ├── documents_analysisSchema.ts
│   │   ├── conversationSchema.ts
│   │   ├── conversation_documentsSchema.ts
│   │   ├── activity_logsSchema.ts
│   │   ├── user_activity_logSchema.ts
│   │   └── user_rolesSchema.ts
│   ├── services/                        # Serviços de domínio
│   │   └── llmService.ts                # Comunicação com a API da OpenAI
│   ├── utils/                           # Funções auxiliares
│   │   ├── logger.ts                    # Configuração de logging
│   │   ├── response.ts                  # Helpers de resposta HTTP (success/fail)
│   │   └── verifyCredentials.ts         # Verificação de credenciais no login
│   ├── db.ts                            # Instância e conexão com o banco (Sequelize)
│   └── server.ts                        # Ponto de entrada: Fastify, plugins e rotas
├── tests/                               # Testes automatizados (Vitest)
├── .env.example                         # Template de variáveis de ambiente
├── .gitignore
├── biome.json                           # Configuração do Biome (linter/formatter)
├── package.json
├── swagger.yaml                         # Especificação OpenAPI complementar
├── tsconfig.json                        # Configuração TypeScript
└── vitest.config.ts                     # Configuração do Vitest
```

---

## 🏗️ Arquitetura e Funcionamento

### Fluxo da API

```
Requisição HTTP
      │
      ▼
  Fastify (server.ts)
      │  ├── Plugins: helmet, rate-limit, cors, jwt, swagger
      │
      ▼
  Route (routes/*.ts)
      │  └── Aplica schema de validação (Zod / JSON Schema)
      │
      ▼
  Controller (controllers/*.ts)
      │  ├── Valida dados de entrada
      │  ├── Acessa Model (Sequelize) ou Service
      │  └── Retorna resposta padronizada (utils/response.ts)
      │
      ▼
  Model (models/*.ts)
      │  └── Sequelize ↔ PostgreSQL
      │
      ▼
  Resposta JSON
```

### Autenticação JWT

1. O cliente envia `POST /api/auth/login` com `email` e `password`.
2. `loginController` verifica as credenciais via `verifyCredentials.ts` (bcrypt compare).
3. Em caso de sucesso, gera um token JWT assinado com `JWT_SECRET` via `@fastify/jwt`.
4. Rotas protegidas verificam o token no header `Authorization: Bearer <token>` através do `authPlugin.ts`.

### Validação com Zod

Cada rota possui um schema Zod definido em `src/schemas/`. O `fastify-type-provider-zod` integra a validação automaticamente ao ciclo de vida do Fastify, garantindo que dados inválidos sejam rejeitados antes de chegarem ao controller.

### Integração com LLM (OpenAI)

O `chatController.ts` delega para `services/llmService.ts`, que constrói o histórico de mensagens e chama a API da OpenAI. O comportamento é controlado pelas variáveis `OPENAI_*` e pelas feature flags `ENABLE_STREAMING` e `ENABLE_RAG`.

### Banco de Dados

- `src/db.ts` exporta a instância única do Sequelize configurada via `src/config/config.json`.
- `src/models/foreignKeys.ts` centraliza todas as associações (`belongsTo` / `hasMany`) entre os modelos, e é importado antes de qualquer `sync`.
- Migrations são gerenciadas pelo `sequelize-cli` com o runner `umzug` via `scripts/runMigrations.ts`.

---

## 🛣️ Rotas da API

### 🔓 Rotas Públicas (sem autenticação)

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/login` | Realizar login |
| `POST` | `/api/profile/profile` | Criar novo usuário (registro) |

### 🔐 Rotas Protegidas (requer JWT)

#### Profile (Usuários)
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/profile/profile/:id` | Buscar usuário por ID |
| `PUT` | `/api/profile/profile/:id` | Atualizar usuário |
| `DELETE` | `/api/profile/profile/:id` | Deletar usuário |

#### User Roles (Funções)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/user_roles/user-role` | Criar função |
| `GET` | `/api/user_roles/user-role/:id` | Buscar função |
| `PUT` | `/api/user_roles/user-role/:id` | Atualizar função |
| `DELETE` | `/api/user_roles/user-role/:id` | Deletar função |

#### Messages (Mensagens)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/messages/messages` | Criar mensagem |
| `GET` | `/api/messages/messages/:id` | Buscar mensagem |
| `PUT` | `/api/messages/messages/:id` | Atualizar mensagem |
| `DELETE` | `/api/messages/messages/:id` | Deletar mensagem |

#### Documents (Documentos)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/documents/documents` | Upload de documento |
| `GET` | `/api/documents/documents/:id` | Buscar documento |
| `PUT` | `/api/documents/documents/:id` | Atualizar documento |
| `DELETE` | `/api/documents/documents/:id` | Deletar documento |

#### Documents Tags (Tags)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/documents_tags/documents-tags` | Criar tag |
| `GET` | `/api/documents_tags/documents-tags/:id` | Buscar tag |
| `PUT` | `/api/documents_tags/documents-tags/:id` | Atualizar tag |
| `DELETE` | `/api/documents_tags/documents-tags/:id` | Deletar tag |

#### Documents Analysis (Análises)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/documents_analyses/documents-analyses` | Criar análise |
| `GET` | `/api/documents_analyses/documents-analyses/:id` | Buscar análise |
| `PUT` | `/api/documents_analyses/documents-analyses/:id` | Atualizar análise |
| `DELETE` | `/api/documents_analyses/documents-analyses/:id` | Deletar análise |

#### Conversations (Conversas)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/conversations/conversations` | Criar conversa |
| `GET` | `/api/conversations/conversations/:id` | Buscar conversa |
| `PUT` | `/api/conversations/conversations/:id` | Atualizar conversa |
| `DELETE` | `/api/conversations/conversations/:id` | Deletar conversa |

#### Chat (IA)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/chat` | Enviar mensagem para o LLM |

#### Activity Logs (Logs de Atividade)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/activity_logs/activity-logs` | Criar log |
| `GET` | `/api/activity_logs/activity-logs/:id` | Buscar log |
| `PUT` | `/api/activity_logs/activity-logs/:id` | Atualizar log |
| `DELETE` | `/api/activity_logs/activity-logs/:id` | Deletar log |

---

## 🔑 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação.

### Login

```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@email.com",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "message": "Login bem-sucedido",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userData": {
    "user_id": "uuid-do-usuario",
    "user_role": "publico"
  }
}
```

### Usando o Token

Inclua o token no header `Authorization`:

```bash
curl -X GET http://localhost:3002/api/profile/profile/uuid-do-usuario \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

### Registro de Novo Usuário

```bash
curl -X POST http://localhost:3002/api/profile/profile \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678901",
    "telefone": "11999999999",
    "data_nascimento": "1990-01-01",
    "profile_password": "senha123"
  }'
```

---

## 📖 Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3002/docs
```

Funcionalidades:
- 📋 Lista todas as rotas disponíveis
- 🧪 Permite testar endpoints diretamente
- 📝 Mostra schemas de request/response
- 🔐 Suporta autenticação JWT

A especificação OpenAPI complementar está disponível em [swagger.yaml](swagger.yaml).

---

## 🗄️ Banco de Dados

### Modelos

| Modelo | Tabela | Descrição |
|--------|--------|-----------|
| `Profile` | `profile` | Usuários do sistema |
| `UserRole` | `user_roles` | Funções/papéis dos usuários |
| `UserActivityLog` | `user_activity_log` | Log de ações dos usuários |
| `Messages` | `messages` | Mensagens das conversas |
| `Documents` | `documents` | Documentos enviados |
| `DocumentsTags` | `documents_tags` | Tags para documentos |
| `DocumentsTagsRelation` | `documents_tags_relation` | Relação documento-tag |
| `DocumentsAnalysis` | `documents_analysis` | Análises de documentos |
| `Conversation` | `conversations` | Conversas/chats |
| `ConversationDocuments` | `conversation_documents` | Documentos por conversa |
| `ActivityLogs` | `activity_logs` | Logs administrativos |

### Diagrama de Relacionamentos

```
Profile (1) ────────── (N) UserRole
   │
   ├──────────────────── (N) UserActivityLog
   │
   ├──────────────────── (N) Documents
   │                          │
   │                          ├── (N) DocumentsTagsRelation ── (N) DocumentsTags
   │                          │
   │                          └── (N) DocumentsAnalysis
   │
   └──────────────────── (N) Conversation
                              │
                              ├── (N) Messages
                              │
                              └── (N) ConversationDocuments
```

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `npm run dev` | Inicia em modo desenvolvimento (tsx, hot reload) |
| `build` | `npm run build` | Compila TypeScript para `dist/` |
| `start` | `npm start` | Inicia em produção (`dist/server.js`) |
| `migrate` | `npm run migrate` | Executa migrations via umzug |
| `test` | `npm test` | Executa testes com Vitest |
| `test:watch` | `npm run test:watch` | Testes em modo watch |
| `coverage` | `npm run coverage` | Relatório de cobertura de código |

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 👤 Autor

**gedsss**

- GitHub: [@gedsss](https://github.com/gedsss)

---

<p align="center">
  Feito com ❤️ para o projeto Matia Legal AI
</p>