export const success = (reply, code = 200, payload = {}) => {
    return reply.code(code).send({ success: true, ...payload });
};
export const fail = (reply, code = 500, message = 'Erro interno', details) => {
    const body = { success: false, message };
    if (details) {
        if (typeof details === 'string') {
            body.details = details;
        }
        else {
            body.errors = details;
        }
    }
    return reply.code(code).send(body);
};
//# sourceMappingURL=response.js.map