import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import {
  createDocumentsAnalisys,
  getDocumentsAnalisysById,
  updateDocumentsAnalisys,
  deleteDocumentsAnalisys,
} from '../controllers/documents_analysisController.js'
import sequelize from '../db.js'
import type { FastifyRequest } from 'fastify'

describe('DocumentAnalysisController', () => {
  let createDocumentsAnalisysID: string

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('createDocumentsAnalisys', () => {
    it('deve criar uma analise de documento com sucesso', async () => {
      const req = {
        body: {
          conversation_id: 'id-de-conversa',
          document_id: 'id-de-documento',
          analysis_type: 'sumario',
          confidence_score: 7,
        },
      } as FastifyRequest

      const result = await createDocumentsAnalisys(req)

      createDocumentsAnalisysID = result.data.id

      expect(result.success).toBe(true)
      expect(result.data.conversation_id).toBe('id-de-conversa')
      expect(result.data.document_id).toBe('id-de-documento')
      expect(result.data.analysis_type).toBe('sumario')
    })

    it('deve rejeitar quando campos obrigatórios estão faltando', async () => {
      const req = {
        body: {
          entity_type: 'user',
        },
      } as FastifyRequest

      await expect(createDocumentsAnalisys(req)).rejects.toThrow()
    })

    it('deve rejeitar body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createDocumentsAnalisys(req)).rejects.toThrow()
    })

    it('deve rejeitar caso o item de action não esteja na lista de opções', async () => {
      const req = {
        body: {
          analysis_type: 'fora',
        },
      } as FastifyRequest

      await expect(createDocumentsAnalisys(req)).rejects.toThrow()
    })
  })

  describe('getDocumentsAnalisysById', () => {
    it('deve retornar a análise de documento com sucesso', async () => {
      const req = {
        params: {
          id: createDocumentsAnalisysID,
        },
      } as FastifyRequest

      const result = await getDocumentsAnalisysById(req)

      expect(result.success).toBe(true)
      expect(result.data.conversation_id).toBe('id-de-conversa')
    })

    it('deve retornar erro para ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(getDocumentsAnalisysById(req)).rejects.toThrow()
    })

    it('deve retornar erro para ID inválido', async () => {
      const req = {
        params: { id: 'id-invalido' },
      } as FastifyRequest

      await expect(getDocumentsAnalisysById(req)).rejects.toThrow()
    })
  })

  describe('updateDocumentsAnalisys', () => {
    it('deve atualizar a análise de documento com sucesso', async () => {
      const req = {
        params: {
          id: createDocumentsAnalisysID,
        },
        body: {
          confidence_score: 9,
        },
      } as FastifyRequest

      const result = await updateDocumentsAnalisys(req)

      expect(result.success).toBe(true)
      expect(result.data?.analysis_type).toBe('sumario')
    })

    it('deve atualizar múltiplos campos', async () => {
      const req = {
        params: { id: createDocumentsAnalisysID },
        body: {
          confidence_score: 7,
          analysis_type: 'sumario',
        },
      } as FastifyRequest

      const result = await updateDocumentsAnalisys(req)

      expect(result.success).toBe(true)
      expect(result.data?.confidence_score).toBe(7)
      expect(result.data?.analysis_type).toBe('sumario')
    })

    it('deve rejeitar body vazio', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(updateDocumentsAnalisys(req)).rejects.toThrow()
    })
  })

  describe('deleteDocumentsAnalisys', () => {
    it('deve deletar a análise de documento com sucesso', async () => {
      const req = {
        params: {
          id: createDocumentsAnalisysID,
        },
      } as FastifyRequest

      const result = await deleteDocumentsAnalisys(req)

      expect(result.success).toBe(true)
    })

    it('deve confirmar que a análise de documento foi deletada', async () => {
      const req = {
        params: { id: createDocumentsAnalisysID },
      } as FastifyRequest

      await expect(getDocumentsAnalisysById(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID inexistente', async () => {
      const req = {
        params: { id: '00000000-0000-0000-0000-000000000000' },
      } as FastifyRequest

      await expect(deleteDocumentsAnalisys(req)).rejects.toThrow()
    })

    it('deve retornar erro ao deletar ID já deletado', async () => {
      const req = {
        params: { id: createDocumentsAnalisysID },
      } as FastifyRequest

      await expect(deleteDocumentsAnalisys(req)).rejects.toThrow()
    })
  })
})
