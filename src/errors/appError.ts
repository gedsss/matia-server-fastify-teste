import type { ErrorCode } from './errorCodes.js'

export interface ErrorDetails {
  field?: string
  value?: unknown
  constraint?: string
  metadata?: Record<string, unknown>
  [key: string]: unknown
}

export class AppError extends Error {
  public statusCode: number
  public code: ErrorCode
  public isOperational: boolean
  public details?: ErrorDetails
  public timestamp: string

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    details?: ErrorDetails,
    isOperational = true
  ) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational
    this.details = details
    this.timestamp = new Date().toISOString()
  }

  toJSON() {
    return {
      name: this.name,
      statusCode: this.statusCode,
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    }
  }
}
