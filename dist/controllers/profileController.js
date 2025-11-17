import bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';
import { Op } from 'sequelize';
import profile from '../models/profile.js';
import { fail, success } from '../utils/response.js';
export const createProfile = async (request, reply) => {
    const payload = request.body;
    try {
        if (!payload || Object.keys(payload).length === 0) {
            return fail(reply, 400, 'Corpo da requisição vazio');
        }
        if (!payload.cpf)
            return fail(reply, 400, 'CPF obrigatório');
        if (!payload.email)
            return fail(reply, 400, 'E-mail obrigatório');
        if (!payload.nome)
            return fail(reply, 400, 'Nome obrigatório');
        if (!payload.telefone)
            return fail(reply, 400, 'Telefone obrigatório');
        if (!payload.data_nascimento)
            return fail(reply, 400, 'Data de nascimento obrigatória');
        if (!payload.profile_password)
            return fail(reply, 400, 'Senha obrigatória');
        const cleanedCpf = String(payload.cpf).replace(/\D/g, '');
        if (!cpf.isValid(cleanedCpf)) {
            return fail(reply, 400, 'Dados inválidos', [
                {
                    message: 'O CPF fornecido é matematicamente inválido',
                    path: ['cpf'],
                },
            ]);
        }
        // checa unicidade
        const existingProfile = await profile.findOne({
            where: { cpf: cleanedCpf },
            attributes: ['id'],
        });
        if (existingProfile)
            return fail(reply, 409, 'Erro de integridade de dados', [
                {
                    message: 'Este CPF já está cadastrado no sistema.',
                    path: ['cpf'],
                },
            ]);
        const existingEmail = await profile.findOne({
            where: { email: payload.email },
            attributes: ['id'],
        });
        if (existingEmail)
            return fail(reply, 409, 'Erro de integridade de dados', [
                {
                    message: 'Este e-mail já está cadastrado no sistema.',
                    path: ['email'],
                },
            ]);
        const existingPhone = await profile.findOne({
            where: { telefone: payload.telefone },
            attributes: ['id'],
        });
        if (existingPhone)
            return fail(reply, 409, 'Erro de integridade de dados', [
                {
                    message: 'Este telefone já está cadastrado no sistema.',
                    path: ['telefone'],
                },
            ]);
        const hashedPassword = await bcrypt.hash(payload.profile_password, 10);
        const createPayload = {
            cpf: cleanedCpf,
            email: payload.email,
            nome: payload.nome,
            telefone: payload.telefone,
            data_nascimento: payload.data_nascimento,
            avatar_url: payload.avatar_url ?? null,
            profile_password: hashedPassword,
        };
        const created = await profile.create(createPayload);
        const data = created.toJSON();
        delete data.profile_password;
        return success(reply, 201, { data, message: 'Perfil criado com sucesso' });
    }
    catch (err) {
        const isValidationError = err &&
            (err.name === 'SequelizeValidationError' ||
                err.name === 'SequelizeUniqueConstraintError');
        if (isValidationError) {
            const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400;
            return fail(reply, statusCode, 'Dados inválidos ou duplicados', err.errors);
        }
        return fail(reply, 500, 'Erro ao criar Perfil', err?.message ?? String(err));
    }
};
export const getProfileById = async (request, reply) => {
    try {
        const { id } = request.params;
        const item = await profile.findByPk(id);
        if (!item)
            return fail(reply, 404, 'Perfil não encontrado');
        const data = item.toJSON();
        delete data.profile_password;
        return success(reply, 200, { data });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao buscar Perfil', err?.message ?? String(err));
    }
};
export const updateProfile = async (request, reply) => {
    try {
        const { id } = request.params;
        const payload = request.body || {};
        if (payload.cpf) {
            const cleanedCpf = String(payload.cpf).replace(/\D/g, '');
            if (!cpf.isValid(cleanedCpf)) {
                return fail(reply, 400, 'CPF inválido', [
                    {
                        message: 'O CPF fornecido é matematicamente inválido',
                        path: ['cpf'],
                    },
                ]);
            }
            payload.cpf = cleanedCpf;
            const existingProfile = await profile.findOne({
                where: { cpf: cleanedCpf, id: { [Op.ne]: id } },
                attributes: ['id'],
            });
            if (existingProfile)
                return fail(reply, 409, 'Erro de integridade', [
                    {
                        message: 'Este CPF já está cadastrado em outra conta',
                        path: ['cpf'],
                    },
                ]);
        }
        if (payload.email) {
            const existingEmailProfile = await profile.findOne({
                where: { email: payload.email, id: { [Op.ne]: id } },
                attributes: ['id'],
            });
            if (existingEmailProfile)
                return fail(reply, 409, 'Erro de integridade', [
                    {
                        message: 'Este e-mail já está cadastrado em outra conta.',
                        path: ['email'],
                    },
                ]);
        }
        if (payload.telefone) {
            const existingPhone = await profile.findOne({
                where: { telefone: payload.telefone, id: { [Op.ne]: id } },
                attributes: ['id'],
            });
            if (existingPhone)
                return fail(reply, 409, 'Erro de integridade', [
                    {
                        message: 'Este telefone já está cadastrado em outra conta.',
                        path: ['telefone'],
                    },
                ]);
        }
        // map possible password field to profile_password
        const updatePayload = { ...payload };
        if (payload.password) {
            updatePayload.profile_password = await bcrypt.hash(payload.password, 10);
            delete updatePayload.password;
        }
        // Prevent updating DB-managed timestamps directly
        delete updatePayload.creation_time;
        delete updatePayload.updated_at;
        const [updatedRows] = await profile.update(updatePayload, { where: { id } });
        if (updatedRows === 0)
            return fail(reply, 404, 'Perfil não encontrado');
        const updated = await profile.findByPk(id);
        const data = updated?.toJSON();
        if (data)
            delete data.profile_password;
        return success(reply, 200, { data, message: 'Perfil atualizado' });
    }
    catch (err) {
        const isValidationError = err &&
            (err.name === 'SequelizeValidationError' ||
                err.name === 'SequelizeUniqueConstraintError');
        if (isValidationError) {
            const statusCode = err.name === 'SequelizeUniqueConstraintError' ? 409 : 400;
            return fail(reply, statusCode, 'Dados inválidos ou duplicados', err.errors);
        }
        return fail(reply, 500, 'Erro ao atualizar Perfil', err?.message ?? String(err));
    }
};
export const deleteProfile = async (request, reply) => {
    try {
        const { id } = request.params;
        const deleted = await profile.destroy({ where: { id } });
        if (deleted === 0)
            return fail(reply, 404, 'Perfil não encontrado');
        return success(reply, 200, { message: 'Perfil deletado com sucesso' });
    }
    catch (err) {
        return fail(reply, 500, 'Erro ao deletar Perfil', err?.message ?? String(err));
    }
};
export default {
    createProfile,
    getProfileById,
    updateProfile,
    deleteProfile,
};
//# sourceMappingURL=profileController.js.map