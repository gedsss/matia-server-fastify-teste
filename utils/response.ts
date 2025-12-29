import { success } from 'zod'

export interface SuccessResponse<T = any> {
  sucess: true
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
    [key: string]: unknown
  }
}

export function successResponse<T>(
  data: T,
  message?: string,
  meta?: SuccessResponse['meta']
): SuccessResponse<T> {
  const response: SuccessResponse = {
    sucess: true,
    data,
  }

  if (message) {
    response.message = message
  }

  if (meta) {
    response.meta = meta
  }

  return response
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): SuccessResponse<T[]> {
  return successResponse(data, message, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  })
}
