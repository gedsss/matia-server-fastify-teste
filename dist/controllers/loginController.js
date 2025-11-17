import jwt from 'jsonwebtoken';
import { verifyCredentials } from '../utils/verifyCredentials.js';
const SECRET_KEY = process.env.JWT_SECRET;
export const login = async (request, reply) => {
    const { email, password } = request.body;
    const user = await verifyCredentials(password, email);
    if (!user) {
        return reply.code(401).send({ message: 'Credenciais inválidas' });
    }
    const payload = {
        user_id: user.id,
        user_role: user.role ?? 'publico',
    };
    if (!SECRET_KEY) {
        return reply.code(500).send({
            message: 'Erro de configuração do servidor (JWT_SECRET não definido)',
        });
    }
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '7d',
    });
    return reply.code(200).send({
        message: 'Login bem-sucedido',
        token: token,
        userData: payload,
    });
};
//# sourceMappingURL=loginController.js.map