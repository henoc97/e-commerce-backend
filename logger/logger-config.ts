import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    // Ajoutez des informations de contexte ici si nécessaire
    return `${timestamp} [${level}]: ${message} ${meta && Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
  }),
);

export const loggerConfig = WinstonModule.forRoot({
  transports: [
    // Console logging (for development purposes)
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
      level: 'debug', // Log everything to the console in development mode
    }),

    // Daily rotation for error logs
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // 20MB max size per log file
      maxFiles: '14d', // Keep logs for 14 days
      level: 'error', // Only log errors to this file
      format: logFormat,
    }),

    // Daily rotation for general logs (info, warn, etc.)
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m', // 20MB max size per log file
      maxFiles: '30d', // Keep logs for 30 days
      level: 'info', // Log information-level and above to this file
      format: logFormat,
    }),
  ],
  exitOnError: false, // Prevent app from exiting on error
});
