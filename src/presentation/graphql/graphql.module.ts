// src/presentation/graphql/graphql.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { resolvers } from './resolver'; // Le module de tes resolvers

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql.ts',
      ),
    }),
    resolvers, // Tu importes tous les resolvers ici
  ],
})
export class MyGraphQLModule {}
