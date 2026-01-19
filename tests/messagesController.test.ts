import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import {
  createMessages,
  getMessagesById,
  updateMessages,
  deleteMessages,
} from '../controllers/messagesController.js'
import sequelize from '../db.js'
import type { FastifyRequest } from 'fastify'

describe('MessagesController', async () => {
  let createMessagesID: string

  beforeAll(async () => {
    sequelize.sync({ force: true })
  })

  afterAll(async () => {
    sequelize.close()
  })

  describe('createMessages', () => {
    it('Deve criar o relatório com sucesso', async () => {
      const req = {
        body: {
          conversationId: 'ID-da-conversa',
          content: 'Conteudo',
          role: 'user',
        },
      } as FastifyRequest

      const result = await createMessages(req)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('id')
      expect(result.data.content).toBe('Conteudo')
      expect(result.data.role).toBe('user')

      createMessagesID = result.data.id
    })

    it('Deve rejeitar caso a requisição esteja vazia', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createMessages(req)).rejects.toThrow()
    })

    it('Deve rejeitar caso a requisição não contenha dados obrigatórios', async () => {
      const req = {
        body: {
          content: 'conteudo',
        },
      } as FastifyRequest

      await expect(createMessages(req)).rejects.toThrow()
    })
  })

  describe('getMessagesByID', () => {
    it('Deve encontrar o log com sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
      } as FastifyRequest

      const result = await getMessagesById(req)

      expect(result.success).toBe(true)
      expect(result.data.content).toBe('Conteudo')
      expect(result.data.role).toBe('user')
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })
  })

  describe('updateMessages', () => {
    it('Deve atualizar o log om sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
        body: {
          content: 'Conteudo novo',
          role: 'assistant',
        },
      } as FastifyRequest

      const result = await updateMessages(req)

      expect(result.success).toBe(true)
      expect(result.data?.content).toBe('Conteudo novo')
      expect(result.data?.role).toBe('assitant')
    })

    it('Deve atualizar o log mesmo que tenha somente um item na requisição', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
        body: {
          content: 'Conteudo novo 2.0',
        },
      } as FastifyRequest

      const result = await updateMessages(req)

      expect(result.success).toBe(true)
      expect(result.data?.content).toBe(true)
    })

    it('Deve retornar erro ao tentar colocar um role fora das opções', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
        body: {
          role: 'qualquer coisa',
        },
      } as FastifyRequest

      await expect(updateMessages(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(updateMessages(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(updateMessages(req)).rejects.toThrow()
    })
  })

  describe('deleteMessages', () => {
    it('Deve deletar o log om sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
      } as FastifyRequest

      const result = await deleteMessages(req)

      expect(result.success).toBe(true)
    })

    it('Deve confirmar que deletou com sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(deleteMessages(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(deleteMessages(req)).rejects.toThrow()
    })
  })
})
