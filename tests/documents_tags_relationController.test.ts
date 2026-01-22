import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import {
  createDocumentsTagsRelation,
  getDocumentsTagsRelationById,
  updateDocumentsTagsRelation,
  deleteDocumentsTagsRelation,
} from '../src/controllers/documents_tags_relationController.js'
import sequelize from '../src/db.js'
import type { FastifyRequest } from 'fastify'

describe('DocumentsTagRelation', async () => {
  let documentsTagsRelationID: string

  beforeAll(async () => {
    sequelize.sync({ force: true })
  })

  afterAll(async () => {
    sequelize.close()
  })

  describe('createDocumentsTagsRelation', () => {
    it('Deve criar o relatório com sucesso', async () => {
      const req = {
        body: {
          document_id: 'id-do-documento',
          tag_id: 'id-da-tag',
        },
      } as FastifyRequest

      const result = await createDocumentsTagsRelation(req)

      expect(result.success).toBe(true)
      expect(result.data).toHaveProperty('id')
      expect(result.data.document_id).toBe('id-do-documento')
      expect(result.data.tag_id).toBe('id-da-tag')

      documentsTagsRelationID = result.data.id
    })

    it('Deve rejeitar caso a requisição esteja vazia', async () => {
      const req = {
        body: {},
      } as FastifyRequest

      await expect(createDocumentsTagsRelation(req)).rejects.toThrow()
    })

    it('Deve rejeitar caso a requisição não contenha dados obrigatórios', async () => {
      const req = {
        body: {
          document_id: 'teste-erro',
        },
      } as FastifyRequest

      await expect(createDocumentsTagsRelation(req)).rejects.toThrow()
    })
  })

  describe('getDocumentsTagsRelationByID', () => {
    it('Deve encontrar a relaçao com sucesso', async () => {
      const req = {
        params: {
          id: documentsTagsRelationID,
        },
      } as FastifyRequest

      const result = await getDocumentsTagsRelationById(req)

      expect(result.success).toBe(true)
      expect(result.data.document_id).toBe('id-de-documento')
      expect(result.data.tag_id).toBe('id-de-tag')
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(getDocumentsTagsRelationById(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(getDocumentsTagsRelationById(req)).rejects.toThrow()
    })
  })

  describe('updateDocumentsTagsRelation', () => {
    it('Deve atualizar a relação om sucesso', async () => {
      const req = {
        params: {
          id: documentsTagsRelationID,
        },
        body: {
          tag_id: 'id-de-tag-update',
          document_id: 'id-de-documento-update',
        },
      } as FastifyRequest

      const result = await updateDocumentsTagsRelation(req)

      expect(result.success).toBe(true)
      expect(result.data?.tag_id).toBe('id-de-tag-update')
      expect(result.data?.document_id).toBe('id-de-documento-update')
    })

    it('Deve atualizar a relaçao mesmo que tenha somente um item na requisição', async () => {
      const req = {
        params: {
          id: documentsTagsRelationID,
        },
        body: {
          tag_id: 'mais-um-teste',
        },
      } as FastifyRequest

      const result = await updateDocumentsTagsRelation(req)

      expect(result.success).toBe(true)
      expect(result.data?.tag_id).toBe('mais-um-teste')
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(updateDocumentsTagsRelation(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(updateDocumentsTagsRelation(req)).rejects.toThrow()
    })
  })

  describe('deleteDocumentsTagsRelation', () => {
    it('Deve deletar o log om sucesso', async () => {
      const req = {
        params: {
          id: documentsTagsRelationID,
        },
      } as FastifyRequest

      const result = await deleteDocumentsTagsRelation(req)

      expect(result.success).toBe(true)
    })

    it('Deve confirmar que deletou com sucesso', async () => {
      const req = {
        params: {
          id: documentsTagsRelationID,
        },
      } as FastifyRequest

      await expect(getDocumentsTagsRelationById(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inválido', async () => {
      const req = {
        params: {
          id: 'ID inválido',
        },
      } as FastifyRequest

      await expect(deleteDocumentsTagsRelation(req)).rejects.toThrow()
    })

    it('Deve retornar erro para ID inexistente', async () => {
      const req = {
        params: {
          id: '00000000-0000-0000-0000-000000000000',
        },
      } as FastifyRequest

      await expect(deleteDocumentsTagsRelation(req)).rejects.toThrow()
    })
  })
})
