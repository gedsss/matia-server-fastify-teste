import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import {
  createUserRole,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} from '../controllers/user_roleController.js'
import type { FastifyRequest } from 'fastify'
import sequelize from '../db.js'

describe('UserRoleControlle', () => {
  let createUserRoleId: string

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('createUserRole', () => {
    it('Deve criar um log com sucesso', async () => {
      const req = {
        body: {
          role: 'Administrador',
        },
      } as FastifyRequest

      const result = await createUserRole(req)

      expect(result.success).toBe(true)
      expect(result.data.role).toBe('role')
      expect(result.data).toHaveProperty('role')

      createUserRoleId = result.data.id
    })

    it('Deve retornar erro ao enviar a requisição sem os campos obrigatórios', async () => {
      const req = {
        body: {
          role: undefined,
        },
      } as FastifyRequest

      const result = await createUserRole(req)

      expect(result).rejects.toThrow()
    })

    it('Deve retornar erro ao enviar a requisição vazia', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      const result = await createUserRole(req)

      expect(result).rejects.toThrow()
    })
  })

  describe('getUserRole', () => {
    it('Deve encontrar o log com sucesso', async () => {
      const req = {
        params: {
          id: createUserRoleId,
        },
      } as FastifyRequest

      const result = await getUserRoleById(req)

      expect(result.success).toBe(true)
      expect(result.data.role).toBe('Administrador')

      it('Deve retornar erro para ID inexistente', async () => {
        const req = {
          params: {
            id: '00000000-0000-0000-0000-000000000000',
          },
        } as FastifyRequest

        const result = await getUserRoleById(req)

        expect(result).rejects.toThrow()
      })

      it('Deve retornar erro para ID inválido', async () => {
        const req = {
          params: {
            id: 'ID inválido',
          },
        } as FastifyRequest

        const result = await getUserRoleById(req)

        expect(result).rejects.toThrow()
      })
    })
  })

  describe('UpdateUserRole', () => {
    it('Deve retornar sucesso ao atualizat o log', async () => {
      const req = {
        params: {
          id: createUserRoleId,
        },
        body: {
          role: 'Teste',
        },
      } as FastifyRequest

      const result = await updateUserRole(req)

      expect(result.success).toBe(true)
      expect(result.data?.role).toBe('Teste')
    })

    it('deve retornar erro ao atualizar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
        body: { nome: 'Teste' },
      } as FastifyRequest

      await expect(updateUserRole(req)).rejects.toThrow()
    })

    it('Não deve atualizar com body vazio', async () => {
      const req = {
        params: {
          id: createUserRoleId,
        },
        body: {},
      } as FastifyRequest

      const result = await updateUserRole(req)

      expect(result.success).toBe(true)
    })
  })

  describe('deleteUserRole', () => {
    it('Deve deletar o log com sucesso', async () => {
      const req = {
        params: {
          id: createUserRoleId,
        },
      } as FastifyRequest

      const result = await deleteUserRole(req)

      expect(result.success).toBe(true)
    })

    it('Deve confirmar que o log foi deletado', async () => {
      const req = {
        params: {
          id: createUserRoleId,
        },
      } as FastifyRequest

      const result = await getUserRoleById(req)

      expect(result).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(deleteUserRole(req)).rejects.toThrow()
    })
  })
})
