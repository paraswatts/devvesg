import { createLogger, format, transports } from 'winston';
import { configuredFormatter } from 'winston-json-formatter';

const { colorize, combine, splat, timestamp, printf } = format;

// Only support the first few levels from NpmConfigSetLevels from `winston`
const VALID_LEVELS = ['error', 'warn', 'info', 'http', 'verbose'];
let level = 'http';
if (process.env.LOG_LEVEL && VALID_LEVELS.includes(process.env.LOG_LEVEL)) {
  level = process.env.LOG_LEVEL;
}

// Define the console output format
let formatters;

// Add nice formatting for dev
if (process.env.NODE_ENV === 'development') {
  formatters = [
    splat(),
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] ${message}`;
    }),
    colorize()
  ]
} else {
  const options = {
    service: 'backend',
    logger: 'json',
    typeFormat: 'json'
  };
  formatters = [configuredFormatter(options)];
}

// A generic logger to be used throughout the application. Always logs to console.
export const logger = createLogger({
  level,
  format: combine(...formatters),
  transports: [new transports.Console()],
  exitOnError: false,
});

// A stream to be consumed by `morgan`. To log all HTTP access
export const httpLogStream = {
  write: (message) => logger.http(message.trim()),
};
