import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Response, Request } from 'express';
import * as Sentry from '@sentry/node';
import { WithSentry } from '@sentry/nestjs';
import { SentryInit } from 'src/infrastructure/external-servicies/sentry/instrument';

@Catch()
export class ErrorLoggingFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {
    // Initialize Sentry
    SentryInit;
  }

  /**
   * Catch any exception and log it properly using Winston.
   *
   * @param exception Caught exception
   * @param host Provides access to request/response and context data
   */
  @WithSentry()
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        exception instanceof HttpException
          ? exception.message || null
          : 'Internal server error',
    };

    // Log the detailed error using Winston
    this.logger.error(`Error occurred at ${request.method} ${request.url}`, {
      statusCode: status,
      stack: exception instanceof Error ? exception.stack : null,
      method: request.method,
      path: request.url,
      timestamp: errorResponse.timestamp,
    });

    // Capture the exception with Sentry
    Sentry.captureException(exception);

    // Send a generic response to the client
    response.status(status).json({
      statusCode: status,
      timestamp: errorResponse.timestamp,
      path: request.url,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? exception instanceof HttpException
            ? exception.message || null
            : null
          : 'Something went wrong. Please try again later.',
    });
  }
}
