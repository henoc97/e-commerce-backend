import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { loggerConfig } from 'logger/logger-config';
import { ErrorLoggingFilter } from './error-logging-filter';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    SentryModule.forRoot(),
    loggerConfig, // Register the Winston logger configuration
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorLoggingFilter, // Register the global exception filter
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter, // Register the global exception filter
    },
  ],
})
export class AppModule {}
