import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import {
  createMessages,
  getMessagesById,
  updateMessages,
  deleteMessages,
} from '../controllers/messagesController.js'
import sequelize from '../db.js'
import type { FastifyRequest } from 'fastify'

describe('MessagesController', () => {
  let createMessagesID: string

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('createMessages', () => {
    it('deve criar a mensagem com sucesso', async () => {
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

    it('deve rejeitar caso a requisição esteja vazia', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createMessages(req)).rejects.toThrow()
    })

    it('deve rejeitar caso a requisição não contenha dados obrigatórios', async () => {
      const req = {
        body: {
          content: 'conteudo',
        },
      } as FastifyRequest

      await expect(createMessages(req)).rejects.toThrow()
    })
  })

  describe('getMessagesByID', () => {
    it('deve encontrar o log com sucesso', async () => {
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

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })
  })

  describe('updateMessages', () => {
    it('deve atualizar o log com sucesso', async () => {
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
      expect(result.data?.role).toBe('assistant')
    })

    it('deve atualizar o log mesmo que tenha somente um item na requisição', async () => {
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
      expect(result.data?.content).toBe('Conteudo novo 2.0')
    })

    it('deve retornar erro ao tentar colocar um role fora das opções', async () => {
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

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(updateMessages(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(updateMessages(req)).rejects.toThrow()
    })
  })

  describe('deleteMessages', () => {
    it('deve deletar o log com sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
      } as FastifyRequest

      const result = await deleteMessages(req)

      expect(result.success).toBe(true)
    })

    it('deve confirmar que deletou com sucesso', async () => {
      const req = {
        params: {
          id: createMessagesID,
        },
      } as FastifyRequest

      await expect(getMessagesById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(deleteMessages(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(deleteMessages(req)).rejects.toThrow()
    })
  })
})
