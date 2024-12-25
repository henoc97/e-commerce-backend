import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { resolvers } from './resolver.index';
import { SentryModule } from '@sentry/nestjs/setup';
import allLogicModules from "../../application/modules/all-logic-modules";
import { AuthService } from '../../infrastructure/external-services/auth/auth.service';
import { GraphQLExceptionFilter } from './graphql-exception-filter';
import { AuthModule } from '../../infrastructure/external-services/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ...allLogicModules,
    AuthModule,
    SentryModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      debug: true,
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
      // context: async ({ req }) => createGraphQLContext(req),
      driver: ApolloDriver,
      formatError: customFormatError,
    }),
  ],
  providers: [
    ...resolvers,
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
    // AuthService,
  ],
})
export class MyGraphQLModule { }

// async function createGraphQLContext(req: any) {
//   const token = req.headers.authorization?.split(' ')[1] || '';
//   const authService = new AuthService(req);
//   const user = await authService.validateToken(token);
//   return { user, token };
// }

function customFormatError(error: any) {
  return {
    message: error.message,
    code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    details: error.extensions?.exception || null,

  };
}