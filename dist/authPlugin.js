import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
export default fp(async (fastify) => {
    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
        throw new Error('JWT_SECRET não está definido. Verifique seu arquivo .env.');
    }
    fastify.register(fastifyJwt, {
        secret: SECRET_KEY,
    });
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply
                .code(401)
                .send({ message: 'Acesso negado: Token inválido ou expirado.' });
        }
    });
});
//# sourceMappingURL=authPlugin.js.map