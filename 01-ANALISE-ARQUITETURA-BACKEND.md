# 🏛️ Matia Server - API Fastify

API REST desenvolvida com **Fastify + TypeScript** para o sistema Matia Legal AI, focada em gerenciamento de usuários, documentos, conversas e logs de atividade.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Segurança](#-segurança)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas da API](#-rotas-da-api)
- [Autenticação](#-autenticação)
- [Documentação Swagger](#-documentação-swagger)
- [Scripts Disponíveis](#-scripts-disponíveis)

---

## 🚀 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **TypeScript** | 5.x | Tipagem estática |
| **Fastify** | 4.x | Framework web de alta performance |
| **Sequelize** | 6.x | ORM para PostgreSQL |
| **PostgreSQL** | 14+ | Banco de dados relacional |
| **JWT** | - | Autenticação via tokens |
| **Bcrypt** | - | Hash de senhas |
| **Biome** | - | Linter e formatter |

---

## ✨ Funcionalidades

- ✅ Autenticação JWT com refresh token
- ✅ CRUD completo de usuários (profiles)
- ✅ Gerenciamento de documentos
- ✅ Sistema de conversas e mensagens
- ✅ Tags e categorização de documentos
- ✅ Análise de documentos (integração IA)
- ✅ Logs de atividade (auditoria)
- ✅ Documentação automática (Swagger/OpenAPI)

---

## 🛡️ Segurança

A API implementa múltiplas camadas de segurança:

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

## 📦 Instalação

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
cp .env. example .env
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
PORT=3002

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=matia_db
DB_USER=seu_usuario
DB_PASS=sua_senha

# CORS (opcional - para sobrescrever padrões)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

---

## ▶️ Executando o Projeto

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm run build
npm start

# Verificar lint
npm run lint

# Formatar código
npm run format
```

O servidor estará disponível em:  `http://localhost:3002`

---

## 📁 Estrutura do Projeto

```
matia-server-fastify-teste/
├── config/                 # Configurações do Sequelize
│   └── config.json
├── controllers/            # Lógica de negócio
│   ├── loginController.ts
│   ├── profileController.ts
│   ├── messagesController.ts
│   ├── documentsController.ts
│   ├── documents_tagsController.ts
│   ├── documents_tags_relationController.ts
│   ├── documents_analysisController.ts
│   ├── conversationController.ts
│   ├── conversation_documentsController.ts
│   ├── activity_logsController.ts
│   ├── user_activity_logController.ts
│   └── user_roleController.ts
├── errors/                 # Classes de erro customizadas
│   ├── appError.ts
│   ├── errorCodes.ts
│   └── errors.ts
├── middleware/             # Middlewares
│   ├── asyncHandler.ts
│   └── errorHandler.ts
├── migrations/             # Migrations do banco
├── models/                 # Modelos Sequelize
│   ├── profile.ts
│   ├── user_roles.ts
│   ├── user_activity_log.ts
│   ├── messages.ts
│   ├── documents.ts
│   ├── documents_tags.ts
│   ├── documents_tags_relation. ts
│   ├── documents_analysis.ts
│   ├── conversation. ts
│   ├── conversation_documents.ts
│   ├── activity_logs.ts
│   └── foreignKeys.ts
├── plugins/                # Plugins Fastify
│   ├── authPlugin.ts       # Autenticação JWT
│   ├── helmet.ts           # Headers de segurança
│   └── ratelimit.ts        # Rate limiting
├── routes/                 # Definição de rotas
│   ├── loginRoutes.ts
│   ├── profileRoutes.ts
│   ├── messagesRoutes.ts
│   ├── documentsRoutes.ts
│   ├── documents_tagsRoutes.ts
│   ├── documents_tags_relationsRoutes.ts
│   ├── documents_analysisRoutes.ts
│   ├── conversationRoutes.ts
│   ├── conversation_documentsRoutes.ts
│   ├── activity_logsRoutes.ts
│   ├── user_activity_logRoutes.ts
│   └── user_roleRoutes.ts
├── schemas/                # Schemas de validação (JSON Schema)
├── scripts/                # Scripts utilitários
├── utils/                  # Funções auxiliares
│   ├── response.ts
│   └── verifyCredentials.ts
├── . env.example            # Template de variáveis de ambiente
├── .gitignore
├── biome.json              # Configuração do Biome (linter)
├── db.ts                   # Conexão com banco de dados
├── package.json
├── server.ts               # Ponto de entrada da aplicação
├── swagger.yaml            # Especificação OpenAPI
└── tsconfig.json           # Configuração TypeScript
```

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
| `GET` | `/api/profile/profile/: id` | Buscar usuário por ID |
| `PUT` | `/api/profile/profile/:id` | Atualizar usuário |
| `DELETE` | `/api/profile/profile/:id` | Deletar usuário |

#### User Roles (Funções)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/user_roles/user-role` | Criar função |
| `GET` | `/api/user_roles/user-role/: id` | Buscar função |
| `PUT` | `/api/user_roles/user-role/:id` | Atualizar função |
| `DELETE` | `/api/user_roles/user-role/:id` | Deletar função |

#### Messages (Mensagens)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/messages/messages` | Criar mensagem |
| `GET` | `/api/messages/messages/: id` | Buscar mensagem |
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
| `GET` | `/api/documents_analyses/documents-analyses/: id` | Buscar análise |
| `PUT` | `/api/documents_analyses/documents-analyses/:id` | Atualizar análise |
| `DELETE` | `/api/documents_analyses/documents-analyses/:id` | Deletar análise |

#### Conversations (Conversas)
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/conversations/conversations` | Criar conversa |
| `GET` | `/api/conversations/conversations/:id` | Buscar conversa |
| `PUT` | `/api/conversations/conversations/:id` | Atualizar conversa |
| `DELETE` | `/api/conversations/conversations/:id` | Deletar conversa |

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
    "password":  "senha123"
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

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| `dev` | `npm run dev` | Inicia em modo desenvolvimento |
| `build` | `npm run build` | Compila TypeScript |
| `start` | `npm start` | Inicia em produção |
| `lint` | `npm run lint` | Verifica código com Biome |
| `format` | `npm run format` | Formata código com Biome |
| `migrate` | `npm run migrate` | Executa migrations |

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
   │ (1)
   │
   └──────────────────── (N) UserActivityLog
   │
   │ (1)
   │
   └──────────────────── (N) Documents
   │                          │
   │                          │ (N)
   │                          │
   │                          └── (N) DocumentsTagsRelation (N) ── DocumentsTags
   │                          │
   │                          └── (N) DocumentsAnalysis
   │
   └──────────────────── (N) Conversation
                              │
                              │ (1)
                              │
                              └── (N) Messages
                              │
                              └── (N) ConversationDocuments
```

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença.  Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**gedsss**

- GitHub: [@gedsss](https://github.com/gedsss)

---

## 🙏 Agradecimentos

- [Fastify](https://www.fastify.io/) - Framework web
- [Sequelize](https://sequelize.org/) - ORM
- [TypeScript](https://www.typescriptlang.org/) - Tipagem

---

<p align="center">
  Feito com ❤️ para o projeto Matia Legal AI
</p>