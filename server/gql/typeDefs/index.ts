import { join } from 'path';
import { readdirSync } from 'fs';
import { loadTypedefsSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const sources = loadTypedefsSync(
  readdirSync(__dirname)
    .filter((file) => file.endsWith('.graphql'))
    .map((file) => join(__dirname, file)),
  { loaders: [new GraphQLFileLoader()] },
);

export const typeDefs = sources.map((source) => source.document);
