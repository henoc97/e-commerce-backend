// src/presentation/graphql/graphql.module.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { resolvers } from './resolver.index';
import { AuthResolver } from './resolvers/auth.resolver';
import { SentryModule } from '@sentry/nestjs/setup';

@Module({
  imports: [
    SentryModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
      context: ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1] || '';
        return { token };
      },
    }),
  ],
  providers: [...resolvers, AuthResolver],
})
export class MyGraphQLModule {}
