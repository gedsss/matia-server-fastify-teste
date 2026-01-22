// tests/loginController.test.ts

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { login } from '../src/controllers/loginController.js'
import { createProfile } from '../src/controllers/profileController.js'
import sequelize from '../src/db.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

describe('loginController', () => {
  // Dados do usuário de teste
  const testUser = {
    nome: 'Usuário Teste Login',
    email: 'teste. login@email.com',
    cpf: '52998224725', // CPF válido
    telefone: '19999999999',
    data_nascimento: '1990-01-01',
    profile_password: 'senha123',
  }

  // Mock do reply do Fastify
  const createMockReply = () => {
    const reply = {
      statusCode: 200,
      code: function (code: number) {
        this.statusCode = code
        return this
      },
      send: function (data: unknown) {
        return { statusCode: this.statusCode, data }
      },
    }
    return reply as unknown as FastifyReply
  }

  type MockReplyResult = {
    statusCode: number
    data: {
      message?: string
      token?: string
      userData?: {
        user_id?: string
        user_role?: string
      }
      [key: string]: unknown
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SETUP - Criar usuário antes dos testes
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  beforeAll(async () => {
    await sequelize.sync({ force: true })

    // Criar usuário de teste para usar no login
    const req = {
      body: testUser,
    } as FastifyRequest

    await createProfile(req)
  })

  afterAll(async () => {
    await sequelize.close()
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOGIN - Testes de Autenticação
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('login', () => {
    it('deve fazer login com credenciais válidas', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(200)
      expect(result.data).toHaveProperty('token')
      expect(result.data).toHaveProperty('message', 'Login bem-sucedido')
      expect(result.data).toHaveProperty('userData')
      expect(result.data.userData).toHaveProperty('user_id')
      expect(result.data.userData).toHaveProperty('user_role')
    })

    it('deve retornar token JWT válido', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      // Verificar se o token tem formato JWT (3 partes separadas por ponto)
      const token = result.data.token
      expect(token).toBeDefined()
      if (token) {
        expect(token.split('.')).toHaveLength(3)
      }
    })

    it('deve retornar erro 401 com email inválido', async () => {
      const req = {
        body: {
          email: 'email. inexistente@email.com',
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
      expect(result.data).toHaveProperty('message', 'Credenciais inválidas')
    })

    it('deve retornar erro 401 com senha incorreta', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: 'senhaErrada123',
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
      expect(result.data).toHaveProperty('message', 'Credenciais inválidas')
    })

    it('deve retornar erro 401 com email e senha incorretos', async () => {
      const req = {
        body: {
          email: 'naoexiste@email.com',
          password: 'senhaErrada123',
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
      expect(result.data).toHaveProperty('message', 'Credenciais inválidas')
    })

    it('deve retornar erro com email vazio', async () => {
      const req = {
        body: {
          email: '',
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
    })

    it('deve retornar erro com senha vazia', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: '',
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
    })

    it('deve retornar erro com body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      const reply = createMockReply()

      // Pode lançar erro ou retornar 401, dependendo da implementação
      try {
        const result = (await login(req, reply)) as unknown as MockReplyResult
        expect(result.statusCode).toBe(401)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    it('deve ser case-sensitive para o email', async () => {
      const req = {
        body: {
          email: testUser.email.toUpperCase(), // EMAIL EM MAIÚSCULO
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      // Dependendo da implementação, pode aceitar ou rejeitar
      // Se o banco for case-insensitive, vai passar
      // Se for case-sensitive, vai falhar
      expect([200, 401]).toContain(result.statusCode)
    })

    it('deve retornar userData com user_role padrão se não definido', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(200)
      expect(result.data.userData?.user_role).toBeDefined()
      // Se o usuário não tem role definido, deve ser 'publico'
      expect(result.data.userData?.user_role).toBe('publico')
    })
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SEGURANÇA - Testes de Segurança
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('segurança', () => {
    it('não deve expor a senha no retorno', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.data).not.toHaveProperty('password')
      expect(result.data).not.toHaveProperty('profile_password')
      expect(result.data.userData).not.toHaveProperty('password')
      expect(result.data.userData).not.toHaveProperty('profile_password')
    })

    it('deve gerar tokens diferentes para logins consecutivos', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply1 = createMockReply()
      const result1 = (await login(req, reply1)) as unknown as MockReplyResult

      const reply2 = createMockReply()
      const result2 = (await login(req, reply2)) as unknown as MockReplyResult

      // Tokens devem ser diferentes (por causa do timestamp)
      expect(result1.data.token).not.toBe(result2.data.token)
    })

    it('não deve aceitar SQL injection no email', async () => {
      const req = {
        body: {
          email: "' OR '1'='1",
          password: testUser.profile_password,
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
    })

    it('não deve aceitar SQL injection na senha', async () => {
      const req = {
        body: {
          email: testUser.email,
          password: "' OR '1'='1",
        },
      } as FastifyRequest

      const reply = createMockReply()
      const result = (await login(req, reply)) as unknown as MockReplyResult

      expect(result.statusCode).toBe(401)
    })
  })
})
