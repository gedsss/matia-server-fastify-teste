export const success = (reply, code = 200, payload = {}) => {
  return reply.code(code).send({ success: true, ...payload })
}

export const fail = (reply, code = 500, message = 'Erro interno', details = null) => {
  const body = { success: false, message }
  if (details) body.details = details
  return reply.code(code).send(body)
}