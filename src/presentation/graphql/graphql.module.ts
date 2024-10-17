// src/presentation/graphql/graphql.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { resolvers } from './resolver.index';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
    }),
  ],
  providers: [...resolvers],
})
export class MyGraphQLModule {}
