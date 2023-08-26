import 'dotenv/config';
import path from 'path';
import { NotFoundError, Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { logger } from './logger';

const OrmConfig: Options = {
  baseDir: path.join(__dirname, '..'),
  migrations: {
    path: 'server/migrations',
    tableName: 'migrations',
    transactional: true,
    disableForeignKeys: false,
  },
  clientUrl: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : undefined,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['server/**/*.entity.ts'],
  tsNode: ['test', 'development'].includes(process.env.NODE_ENV),
  debug: ['test', 'development'].includes(process.env.NODE_ENV),
  logger: (message) => logger.verbose(message),
  highlighter: new SqlHighlighter(),
  type: 'postgresql',
  user: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_USER : process.env.DB_USER,
  password: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_PASS : process.env.DB_PASS,
  dbName: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST,
  port: getEnvDbPort(),
  findOneOrFailHandler: (entityName: string) => {
    return new NotFoundError(`${entityName} not found`);
  },
};

function getEnvDbPort() {
  if (process.env.NODE_ENV === 'test' && process.env.TEST_DB_PORT) {
    return parseInt(process.env.TEST_DB_PORT);
  } else if (process.env.DB_PORT) {
    return parseInt(process.env.DB_PORT);
  } else {
    return undefined;
  }
}

export default OrmConfig;
