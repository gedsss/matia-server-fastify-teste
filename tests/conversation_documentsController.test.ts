import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import {
  createConversationDocuments,
  getConversationDocumentsById,
  updateConversationDocuments,
  deleteConversationDocuments,
} from '../src/controllers/conversation_documentsController.js'
import sequelize from '../src/db.js'
import type { FastifyRequest } from 'fastify'

describe('ConversationDocumentsController', () => {
  let createConversationDocumentsID: string

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('createConversationDocuments', () => {
    it('deve criar um conversation documents com sucesso', async () => {
      const req = {
        body: {
          conversation_id: 'id-de-conversa',
          document_id: 'id-de-documento',
          linked_at: 'linkado',
        },
      } as FastifyRequest

      const result = await createConversationDocuments(req)

      createConversationDocumentsID = result.data.id

      expect(result.success).toBe(true)
      expect(result.data.conversation_id).toBe('id-de-conversa')
      expect(result.data.document_id).toBe('id-de-documento')
      expect(result.data.linked_at).toBe('linkado')
    })

    it('deve rejeitar quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          linked_at: 'linkado',
        },
      } as FastifyRequest

      await expect(createConversationDocuments(req)).rejects.toThrow()
    })

    it('deve rejeitar body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createConversationDocuments(req)).rejects.toThrow()
    })

    it('deve rejeitar caso o item de action não esteja na lista de opções', async () => {
      const req = {
        body: {
          action: 'testando',
        },
      } as FastifyRequest

      await expect(createConversationDocuments(req)).rejects.toThrow()
    })
  })

  describe('getConversationDocumentsById', () => {
    it('deve retornar o documento de conversa com sucesso', async () => {
      const req = {
        params: {
          id: createConversationDocumentsID,
        },
      } as FastifyRequest

      const result = await getConversationDocumentsById(req)

      expect(result.success).toBe(true)
      expect(result.data.conversation_id).toBe('id-de-conversa')
      expect(result.data.document_id).toBe('id-de-documento')
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(getConversationDocumentsById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: { id: 'id-invalido' },
      } as FastifyRequest

      await expect(getConversationDocumentsById(req)).rejects.toThrow()
    })
  })

  describe('updateConversationDocuments', () => {
    it('deve atualizar o documento de conversa com sucesso', async () => {
      const req = {
        params: {
          id: createConversationDocumentsID,
        },
        body: {
          linked_at: 'linkado-teste-update',
        },
      } as FastifyRequest

      const result = await updateConversationDocuments(req)

      expect(result.success).toBe(true)
      expect(result.data?.linked_at).toBe('linkado-teste-update')
    })

    it('deve rejeitar body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(updateConversationDocuments(req)).rejects.toThrow()
    })
  })

  describe('deleteConversationDocuments', () => {
    it('deve deletar o documento de conversa com sucesso', async () => {
      const req = {
        params: {
          id: createConversationDocumentsID,
        },
      } as FastifyRequest

      const result = await deleteConversationDocuments(req)

      expect(result.success).toBe(true)
    })

    it('deve confirmar que o documento de conversa foi deletado', async () => {
      const req = {
        params: { id: createConversationDocumentsID },
      } as FastifyRequest

      await expect(getConversationDocumentsById(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(deleteConversationDocuments(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID já deletado', async () => {
      const req = {
        params: { id: createConversationDocumentsID },
      } as FastifyRequest

      await expect(deleteConversationDocuments(req)).rejects.toThrow()
    })
  })
})
