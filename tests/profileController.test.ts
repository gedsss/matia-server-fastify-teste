import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
} from '../src/controllers/profileController.js'
import sequelize from '../src/db.js'
import type { FastifyRequest } from 'fastify'

describe('profileController', () => {
  let createdUserId: string

  // Configuração antes de todos os testes
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  // Limpa após todos os testes
  afterAll(async () => {
    await sequelize.close()
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CREATE - Testes de Criação
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('createProfile', () => {
    it('deve criar um perfil com dados válidos', async () => {
      const req = {
        body: {
          nome: 'João Silva',
          email: 'joao@email.com',
          cpf: '52998224725', // CPF válido
          telefone: '19999999999',
          data_nascimento: '1990-01-01',
          profile_password: 'senha123',
        },
      } as FastifyRequest

      const result = (await createProfile(req)) as any

      expect(result.success).toBe(true)

      expect(result.data.nome).toBe('João Silva')
      expect(result.data.email).toBe('joao@email.com')
      expect(result.data).not.toHaveProperty('profile_password')

      // Salva o ID para usar nos próximos testes
      createdUserId = result.data.id
    })

    it('deve rejeitar CPF inválido', async () => {
      const req = {
        body: {
          nome: 'Teste',
          email: 'teste@email.com',
          cpf: '00000000000',
          telefone: '19999999999',
          data_nascimento: '1990-01-01',
          profile_password: 'senha123',
        },
      } as FastifyRequest

      await expect(createProfile(req)).rejects.toThrow()
    })

    it('deve rejeitar email duplicado', async () => {
      const req = {
        body: {
          nome: 'Outro João',
          email: 'joao@email.com', // Email já existe
          cpf: '71428793860',
          telefone: '19888888888',
          data_nascimento: '1995-05-15',
          profile_password: 'senha456',
        },
      } as FastifyRequest

      await expect(createProfile(req)).rejects.toThrow()
    })

    it('deve rejeitar CPF duplicado', async () => {
      const req = {
        body: {
          nome: 'Maria Silva',
          email: 'maria@email.com',
          cpf: '52998224725', // CPF já existe
          telefone: '19777777777',
          data_nascimento: '1992-03-20',
          profile_password: 'senha789',
        },
      } as FastifyRequest

      await expect(createProfile(req)).rejects.toThrow()
    })

    it('deve rejeitar quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          nome: 'Incompleto',
          // Faltam email, cpf, telefone, etc.
        },
      } as FastifyRequest

      await expect(createProfile(req)).rejects.toThrow()
    })

    it('deve rejeitar body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createProfile(req)).rejects.toThrow()
    })
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // READ - Testes de Leitura
  // ━━━━━━━━━━━━━━━━━━━━━━━���━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('getProfileById', () => {
    it('deve retornar um perfil existente pelo ID', async () => {
      const req = {
        params: { id: createdUserId },
      } as FastifyRequest

      const result = await getProfileById(req)

      expect(result.success).toBe(true)
      expect(result.data.id).toBe(createdUserId)
      expect(result.data.nome).toBe('João Silva')
      expect(result.data).not.toHaveProperty('profile_password')
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(getProfileById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: { id: 'id-invalido' },
      } as FastifyRequest

      await expect(getProfileById(req)).rejects.toThrow()
    })
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // UPDATE - Testes de Atualização
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('updateProfile', () => {
    it('deve atualizar o nome do perfil', async () => {
      const req = {
        params: { id: createdUserId },
        body: { nome: 'João Silva Atualizado' },
      } as FastifyRequest

      const result = await updateProfile(req)

      expect(result.success).toBe(true)
      expect(result.data.nome).toBe('João Silva Atualizado')
    })

    it('deve atualizar o email do perfil', async () => {
      const req = {
        params: { id: createdUserId },
        body: { email: 'joao.novo@email.com' },
      } as FastifyRequest

      const result = await updateProfile(req)

      expect(result.success).toBe(true)
      expect(result.data.email).toBe('joao.novo@email.com')
    })

    it('deve atualizar múltiplos campos', async () => {
      const req = {
        params: { id: createdUserId },
        body: {
          nome: 'João Completo',
          telefone: '19888888888',
        },
      } as FastifyRequest

      const result = await updateProfile(req)

      expect(result.success).toBe(true)
      expect(result.data.nome).toBe('João Completo')
      expect(result.data.telefone).toBe('19888888888')
    })

    it('deve atualizar a senha', async () => {
      const req = {
        params: { id: createdUserId },
        body: { password: 'novaSenha123' },
      } as FastifyRequest

      const result = await updateProfile(req)

      expect(result.success).toBe(true)
      // Senha não deve ser retornada
      expect(result.data).not.toHaveProperty('profile_password')
    })

    it('deve retornar erro ao atualizar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
        body: { nome: 'Teste' },
      } as FastifyRequest

      await expect(updateProfile(req)).rejects.toThrow()
    })

    it('deve rejeitar atualização para email duplicado', async () => {
      // Primeiro, criar outro usuário
      const createReq = {
        body: {
          nome: 'Outro Usuário',
          email: 'outro@email.com',
          cpf: '71428793860',
          telefone: '19666666666',
          data_nascimento: '1988-06-15',
          profile_password: 'senha999',
        },
      } as FastifyRequest
      await createProfile(createReq)

      // Tentar atualizar o primeiro usuário com email do segundo
      const req = {
        params: { id: createdUserId },
        body: { email: 'outro@email.com' },
      } as FastifyRequest

      await expect(updateProfile(req)).rejects.toThrow()
    })

    it('não deve atualizar com body vazio', async () => {
      const req = {
        params: { id: createdUserId },
        body: {},
      } as FastifyRequest

      // Dependendo da implementação, pode retornar sucesso sem alterações
      // ou pode lançar erro
      await expect(updateProfile(req)).rejects.toThrow()
    })
  })

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DELETE - Testes de Deleção
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  describe('deleteProfile', () => {
    it('deve deletar um perfil existente', async () => {
      const req = {
        params: { id: createdUserId },
      } as FastifyRequest

      const result = await deleteProfile(req)

      expect(result.success).toBe(true)
    })

    it('deve confirmar que o perfil foi deletado', async () => {
      const req = {
        params: { id: createdUserId },
      } as FastifyRequest

      await expect(getProfileById(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(deleteProfile(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID já deletado', async () => {
      const req = {
        params: { id: createdUserId },
      } as FastifyRequest

      await expect(deleteProfile(req)).rejects.toThrow()
    })
  })
})
