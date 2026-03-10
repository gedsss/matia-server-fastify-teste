## 🔐 Solução de Autorização (AuthZ) Implementada

### Problema Identificado
```
❌ Sem autorização (AuthZ):
   qualquer usuário autenticado pode fazer TUDO

Fluxo antigo:
  Login → Token JWT → Acesso a QUALQUER endpoint
```

### Solução Implementada ✅

#### 1. Novo Middleware: `authorize.ts`
Localização: [src/middleware/authorize.ts](src/middleware/authorize.ts)

```typescript
// ✅ Verificar um role
authorize('admin')

// ✅ Verificar múltiplos roles
authorize('admin', 'gerente')

// ✅ Admin only (atalho)
adminOnly()
```

#### 2. Como Usar nas Rotas

**ANTES (sem autorização):**
```typescript
fastify.post('/', {
  preHandler: [fastify.authenticate],  // ❌ Qualquer um logado acessa
  handler: deleteDocuments
})
```

**DEPOIS (com autorização):**
```typescript
fastify.post('/', {
  preHandler: [
    fastify.authenticate,          // Primeiro: verifica token
    authorize('admin')              // Segundo: verifica role
  ],
  handler: deleteDocuments
})
```

#### 3. Fluxo Seguro

```
[Requisição com Bearer Token]
          ↓
[fastify.authenticate] → Valida JWT
          ↓
         401? ❌ Token invalid/expired
          ↓ ✅ Token válido
[authorize('admin')] → Verifica role
          ↓
         403? ❌ User role not allowed
          ↓ ✅ Role permitido
[Handler] → Executa lógica
```

---

### Arquivos Modificados

| Arquivo | O quê | Tipo |
|---------|-------|------|
| [src/middleware/authorize.ts](src/middleware/authorize.ts) | Novo middleware | ✨ Criado |
| [src/routes/documentsRoutes.ts](src/routes/documentsRoutes.ts) | Exemplo aplicado | 🔄 Atualizado |
| [src/routes/user_roleRoutes.ts](src/routes/user_roleRoutes.ts) | Exemplo aplicado | 🔄 Atualizado |
| [AUTHORIZATION_GUIDE.md](AUTHORIZATION_GUIDE.md) | Documentação completa | 📖 Criado |
| [AUTHORIZATION_EXAMPLES.ts](AUTHORIZATION_EXAMPLES.ts) | Exemplos de código | 💡 Criado |
| [AUTHORIZATION_TESTS.example.ts](AUTHORIZATION_TESTS.example.ts) | Exemplos de testes | 🧪 Criado |

---

### 📋 Guia Rápido de Implementação

#### Passo 1: Importe o middleware
```typescript
import { authorize, adminOnly } from '../middleware/authorize.js'
```

#### Passo 2: Use nas suas rotas conforme seu caso de uso

**Apenas Admin:**
```typescript
fastify.delete('/:id', {
  preHandler: [fastify.authenticate, adminOnly()],
})
```

**Admin ou Gerente:**
```typescript
fastify.put('/:id', {
  preHandler: [fastify.authenticate, authorize('admin', 'gerente')],
})
```

**Qualquer um autenticado (sem AuthZ):**
```typescript
fastify.get('/:id', {
  preHandler: [fastify.authenticate],  // Sem authorize!
})
```

---

### 🧪 Testando Autorização

Use [AUTHORIZATION_TESTS.example.ts](AUTHORIZATION_TESTS.example.ts) como referência.

**Teste via cURL:**

```bash
# 1. Faça login com user admin
TOKEN=$(curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}' \
  | jq -r '.token')

# 2. Teste DELETE com admin token (deve funcionar)
curl -X DELETE http://localhost:3002/documents/123 \
  -H "Authorization: Bearer $TOKEN"
# ✅ Response: 200 ou 404

# 3. Faça login com user publico
TOKEN_PUBLIC=$(curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"123456"}' \
  | jq -r '.token')

# 4. Teste DELETE com public token (deve falhar)
curl -X DELETE http://localhost:3002/documents/123 \
  -H "Authorization: Bearer $TOKEN_PUBLIC"
# ❌ Response: 403 Forbidden
```

---

### 🔄 Checklist de Implementação nas Suas Rotas

- [ ] Importar `authorize` ou `adminOnly` 
- [ ] Adicionar ao `preHandler`
- [ ] Testar com diferentes roles (**admin**, **publico**)
- [ ] Verificar responses (401, 403, 200)

---

### 📊 Matriz de Autorização Atual

| Endpoint | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| /documents | ✅ Qualquer | ❌ Admin | ❌ Admin | ❌ Admin |
| /documents/:id | ✅ Qualquer | - | ❌ Admin | ❌ Admin |
| /user-roles | ✅ Qualquer | ❌ Admin | ❌ Admin | ❌ Admin |

**Legenda:**
- ✅ Qualquer = Qualquer usuário autenticado
- ❌ Admin = Apenas usuários com role 'admin'

---

### 🚨 Possíveis Erros e Soluções

| Erro | Causa | Solução |
|------|-------|--------|
| 401 em tudo | Sem token ou inválido | Use token válido nos headers |
| 403 mesmo sendo admin | JWT não tem `user_role` | Verifique loginController.ts |
| "Cannot read user_role" | authorize sem authenticate | Sempre coloque authenticate ANTES de authorize |

---

### 📚 Documentação Completa

- 📖 [AUTHORIZATION_GUIDE.md](AUTHORIZATION_GUIDE.md) - Guia detalhado
- 💡 [AUTHORIZATION_EXAMPLES.ts](AUTHORIZATION_EXAMPLES.ts) - Exemplos de código
- 🧪 [AUTHORIZATION_TESTS.example.ts](AUTHORIZATION_TESTS.example.ts) - Exemplos de testes

---

### ✅ Próximos Passos Recomendados

1. **Aplicar a outras rotas:** Use os exemplos para atualizar as demais rotas
2. **Expandir roles:** Adicione 'gerente', 'leitor', etc. conforme necessário
3. **Adicionar testes:** Implemente testes de autorização
4. **Auditoria:** Registre quem faz o quê usando `request.user.user_id`
5. **Fine-grained permissions:** Se necessário, implemente permissões por recurso

---

### 💡 Boas Práticas Implementadas

✅ Middleware reutilizável  
✅ Múltiplos roles por endpoint  
✅ Mensagens de erro claras  
✅ Mantém compatibilidade com autenticação existente  
✅ Segue padrões Fastify  

---

Qualquer dúvida? Consulte [AUTHORIZATION_GUIDE.md](AUTHORIZATION_GUIDE.md) ou [AUTHORIZATION_EXAMPLES.ts](AUTHORIZATION_EXAMPLES.ts)!
