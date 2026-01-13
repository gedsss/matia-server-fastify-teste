import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import {
  createUserActivityLog,
  getUserActivityLogById,
  updateUserActivityLog,
  deleteUserActivityLog,
} from '../controllers/user_activity_logController.js'
import sequelize from '../db.js'
import type { FastifyRequest, FastifyReply } from 'fastify'

describe('userActivityLogController', () => {
  let createLogId: string

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('CreateUserActivityLog', () => {
    it('deve criar um log de atividades dos usuarios com dados válidos', async () => {
      const req = {
        body: {
          user_id: 'uuid-do-usuario',
          action_type: 'login',
          resource_type: 'resource de teste',
          details: {
            nome_documento: 'nome de documento de teste',
            titulo: 'titulo de teste',
          },
          ip_address: '200.148.12.188',
          user_agent: 'Chrome',
        },
      } as FastifyRequest

      const result = (await createUserActivityLog(req)) as any

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('id')
      expect(result.data.action_type).toBe('login')
      expect(result.data.ip_address).toBe('200.148.12.188')
      expect(result.data.user_agent).toBe('Chrome')

      createLogId = result.data.id
    })

    it('deve rejeitar quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          action_type: undefined,
        },
      } as FastifyRequest

      await expect(createUserActivityLog(req)).rejects.toThrow()
    })
  })

  describe('GetUserActivityLogById', () => {
    it('deve retornar um perfil exitente pelo ID', async () => {
      const req = {
        params: { id: createLogId },
      } as FastifyRequest

      const result = await getUserActivityLogById(req)

      expect(result.success).toBe(true)
      expect(result.data.id).toBe(createLogId)
      expect(result.data.action_type).toBe('login')
      expect(result.data).toHaveProperty('action_type')
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(getUserActivityLogById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: { id: 'id-inválido' },
      } as FastifyRequest

      await expect(getUserActivityLogById(req)).rejects.toThrow()
    })
  })

  describe('UpdateUserActivityLog', () => {
    it('Deve atualizar o tipo de ação documento', async () => {
      const req = {
        params: {
          id: createLogId,
        },
        body: {
          action_type: 'logout',
        },
      } as FastifyRequest

      const result = await updateUserActivityLog(req)

      expect(result.success).toBe(true)
      expect(result.data?.action_type).toBe('logout')
    })

    it('Deve atualizar os detalhes do documento', async () => {
      const req = {
        params: {
          id: createLogId,
        },
        body: {
          details: 'Detalhe novo',
        },
      } as FastifyRequest

      const result = await updateUserActivityLog(req)

      expect(result.success).toBe(true)
      expect(result.data?.details).toBe('Detalhe novo')
    })

    it('Deve atualizar múltiplos campos', async () => {
      const req = {
        params: {
          id: createLogId,
        },
        body: {
          action_type: 'profile_updated',
          details: 'Multiplos updates',
        },
      } as FastifyRequest

      const result = await updateUserActivityLog(req)

      expect(result.success).toBe(true)
      expect(result.data?.action_type).toBe('profile_updated')
      expect(result.data?.details).toBe('Multiplos updates')
    })

    it('Deve me devolver um erro de ID inválido', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
        body: {
          details: 'Teste de erro',
        },
      } as FastifyRequest

      await expect(updateUserActivityLog(req)).rejects.toThrow()
    })

    it('não deve atualizar com body vazio', async () => {
      const req = {
        params: {
          id: createLogId,
        },
        body: {},
      } as FastifyRequest

      const result = await updateUserActivityLog(req)

      expect(result.success).toBe(true)
    })
  })

  describe('DeleteUserActivityLog', () => {
    it('deve deletar um documento existente', async () => {
      const req = {
        params: {
          id: createLogId,
        },
      } as FastifyRequest

      const result = await deleteUserActivityLog(req)

      expect(result.success).toBe(true)
    })

    it('Deve convfirmar que o perfil foi deletado', async () => {
      const req = {
        params: {
          id: createLogId,
        },
      } as FastifyRequest

      await expect(await getUserActivityLogById(req)).rejects.toThrow()
    })

    it('Deve retornar erro de ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(await deleteUserActivityLog(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID já deletado', async () => {
      const req = {
        params: {
          id: createLogId,
        },
      } as FastifyRequest

      await expect(await deleteUserActivityLog(req)).rejects.toThrow()
    })
  })
})
