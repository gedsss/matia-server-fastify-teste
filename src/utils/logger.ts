import type { FastifyBaseLogger } from 'fastify'

export interface LogMetadata {
  requestId?: string
  userId?: string
  conversationId?: string
  tokensUsed?: number
  duration?: number
  model?: string
  [key: string]: unknown
}

export class Logger {
  private fastifyLogger?: FastifyBaseLogger

  constructor(fastifyLogger?: FastifyBaseLogger) {
    this.fastifyLogger = fastifyLogger
  }

  private formatLog(
    level: string,
    message: string,
    metadata?: LogMetadata
  ): object {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(metadata && { metadata }),
    }
  }

  info(message: string, metadata?: LogMetadata): void {
    if (this.fastifyLogger) {
      this.fastifyLogger.info(this.formatLog('info', message, metadata))
    } else {
      console.log(JSON.stringify(this.formatLog('info', message, metadata)))
    }
  }

  warn(message: string, metadata?: LogMetadata): void {
    if (this.fastifyLogger) {
      this.fastifyLogger.warn(this.formatLog('warn', message, metadata))
    } else {
      console.warn(JSON.stringify(this.formatLog('warn', message, metadata)))
    }
  }

  error(message: string, error?: Error, metadata?: LogMetadata): void {
    const errorMetadata = {
      ...metadata,
      error: error?.message,
      stack: error?.stack,
    }

    if (this.fastifyLogger) {
      this.fastifyLogger.error(
        this.formatLog('error', message, errorMetadata)
      )
    } else {
      console.error(
        JSON.stringify(this.formatLog('error', message, errorMetadata))
      )
    }
  }

  debug(message: string, metadata?: LogMetadata): void {
    if (this.fastifyLogger) {
      this.fastifyLogger.debug(this.formatLog('debug', message, metadata))
    } else {
      console.debug(JSON.stringify(this.formatLog('debug', message, metadata)))
    }
  }
}

export default Logger
