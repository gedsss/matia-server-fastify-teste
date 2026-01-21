import bcrypt from 'bcrypt'
import { cpf } from 'cpf-cnpj-validator'
import { FastifyReply, type FastifyRequest } from 'fastify'
import { Op } from 'sequelize'
import profile, { type ProfileAttributes } from '../models/profile.js'
import {
  UserNotFoundError,
  DuplicateCPFError,
  DuplicateEmailError,
  ValidationError,
  InvalidCPFError,
  ConflictError,
  DuplicateNumberError,
  MissingFieldError,
  InternalServerError,
  DataBaseError,
} from '../errors/errors.js'
import { ErrorCodes } from '../errors/errorCodes.js'
import { successResponse } from '../utils/response.js'

interface CreateBody
  extends Omit<
    ProfileAttributes,
    'id' | 'creation_time' | 'updated_at' | 'profile_password'
  > {
  profile_password?: string
}

interface UpdateBody extends Partial<CreateBody> {}

interface Params {
  id: string
}

export const createProfile = async (request: FastifyRequest) => {
  const payload = request.body as CreateBody

  try {
    if (!payload || Object.keys(payload).length === 0) {
      throw new MissingFieldError()
    }

    if (!payload.cpf) throw new MissingFieldError()
    if (!payload.email) throw new MissingFieldError()
    if (!payload.nome) throw new MissingFieldError()
    if (!payload.telefone) throw new MissingFieldError()
    if (!payload.data_nascimento) throw new MissingFieldError()
    if (!payload.profile_password) throw new MissingFieldError()

    const cleanedCpf = String(payload.cpf).replace(/\D/g, '')
    if (!cpf.isValid(cleanedCpf)) {
      throw new InvalidCPFError(cleanedCpf)
    }

    // checa unicidade
    const existingProfile = await profile.findOne({
      where: { cpf: cleanedCpf },
      attributes: ['id'],
    })
    if (existingProfile) {
      throw new ConflictError('Conta ja existente', {
        code: ErrorCodes.CONFLICT,
      })
    }

    const existingEmail = await profile.findOne({
      where: { email: payload.email },
      attributes: ['id'],
    })
    if (existingEmail) {
      throw new DuplicateEmailError(payload.email)
    }

    const existingPhone = await profile.findOne({
      where: { telefone: payload.telefone },
      attributes: ['id'],
    })
    if (existingPhone) {
      throw new DuplicateNumberError(payload.telefone)
    }

    const hashedPassword = await bcrypt.hash(
      payload.profile_password as string,
      10
    )

    const createPayload: any = {
      cpf: cleanedCpf,
      email: payload.email,
      nome: payload.nome,
      telefone: payload.telefone,
      data_nascimento: payload.data_nascimento,
      avatar_url: payload.avatar_url ?? null,
      profile_password: hashedPassword,
    }

    const created = await profile.create(createPayload)
    const data = created.toJSON() as any
    delete data.profile_password

    return successResponse(profile, 'Perfil criado com sucesso')
  } catch (err: any) {
    const isValidationError =
      err &&
      (err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError')
    if (isValidationError) {
      err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      throw new ValidationError('Dados inválidos ou duplicados', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Erro ao criar o usuário', {
      code: ErrorCodes.CREATE_FAILED,
    })
  }
}

export const getProfileById = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const item = await profile.findByPk(id)
    if (!item) throw new UserNotFoundError()
    const data = item.toJSON() as any
    delete data.profile_password
    return successResponse(item, 'Usuário achado com sucesso')
  } catch (err: any) {
    throw new UserNotFoundError()
  }
}

export const getProfile = async () => {
  try {
    const item = await profile.findAll()
    if (item.length === 0) {
      successResponse([], 'Nenhum Profile encontrado')
    }
    return successResponse(item, 'listando todos Profiles criados')
  } catch (err: any) {
    throw new DataBaseError()
  }
}

export const updateProfile = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const payload = (request.body as UpdateBody) || {}

    if (payload.cpf) {
      const cleanedCpf = String(payload.cpf).replace(/\D/g, '')
      if (!cpf.isValid(cleanedCpf)) {
        throw new InvalidCPFError(payload.cpf)
      }
      payload.cpf = cleanedCpf as any

      const existingProfile = await profile.findOne({
        where: { cpf: cleanedCpf, id: { [Op.ne]: id } },
        attributes: ['id'],
      })
      if (existingProfile) {
        throw new DuplicateCPFError(cleanedCpf)
      }
    }

    if (payload.email) {
      const existingEmailProfile = await profile.findOne({
        where: { email: payload.email, id: { [Op.ne]: id } },
        attributes: ['id'],
      })
      if (existingEmailProfile) {
        throw new DuplicateEmailError(payload.email)
      }
    }

    if (payload.telefone) {
      const existingPhone = await profile.findOne({
        where: { telefone: payload.telefone, id: { [Op.ne]: id } },
        attributes: ['id'],
      })
      if (existingPhone) {
        throw new DuplicateNumberError(payload.telefone)
      }
    }

    // map possible password field to profile_password
    const updatePayload: any = { ...payload }
    if ((payload as any).password) {
      updatePayload.profile_password = await bcrypt.hash(
        (payload as any).password,
        10
      )
      delete updatePayload.password
    }

    // Prevent updating DB-managed timestamps directly
    delete updatePayload.creation_time
    delete updatePayload.updated_at

    const [updatedRows] = await profile.update(updatePayload, { where: { id } })
    if (updatedRows === 0) throw new UserNotFoundError()
    const updated = await profile.findByPk(id)
    const data = updated?.toJSON() as any
    if (data) delete data.profile_password
    return successResponse(data, 'Usuario atualizado com sucesso')
  } catch (err: any) {
    const isValidationError =
      err &&
      (err.name === 'SequelizeValidationError' ||
        err.name === 'SequelizeUniqueConstraintError')
    if (isValidationError) {
      err.name === 'SequelizeUniqueConstraintError' ? 409 : 400
      throw new ValidationError('Dados inválidos ou duplicados', {
        code: ErrorCodes.VALIDATION_ERROR,
      })
    }
    throw new InternalServerError('Não foi possivel atualizar o usuário', {
      code: ErrorCodes.PROFILE_UPDATE_FAILED,
    })
  }
}

export const deleteProfile = async (request: FastifyRequest) => {
  try {
    const { id } = request.params as Params
    const deleted = await profile.destroy({ where: { id } })
    if (deleted === 0) throw new UserNotFoundError()
    return successResponse('Usuário deletado com sucesso')
  } catch (err: any) {
    throw new InternalServerError('Erro ao deletar o usuário', {
      code: ErrorCodes.PROFILE_DELETE_FAILED,
    })
  }
}

export default {
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
}
