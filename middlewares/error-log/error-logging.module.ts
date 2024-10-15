import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { loggerConfig } from 'logger/logger-config';
import { ErrorLoggingFilter } from './error-logging-filter';

@Module({
  imports: [
    loggerConfig, // Register the Winston logger configuration
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorLoggingFilter, // Register the global exception filter
    },
  ],
})
export class AppModule {}
