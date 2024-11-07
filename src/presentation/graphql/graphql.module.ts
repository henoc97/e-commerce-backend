import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { resolvers } from './resolver.index';
import { SentryModule } from '@sentry/nestjs/setup';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import allLogicModules from "../../application/modules/all-logic-modules"
import { AuthModule } from 'src/infrastructure/external-servicies/auth/auth.module';

@Module({
  imports: [
    ...allLogicModules,
    AuthModule,
    SentryModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
      context: ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1] || '';
        return { token };
      },
      driver: ApolloDriver,
    }),
  ],
  providers: [...resolvers],
})
export class MyGraphQLModule { }
