import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { resolvers } from './resolver.index';
import { SentryModule } from '@sentry/nestjs/setup';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import allLogicModules from "../../application/modules/all-logic-modules"
import { AuthService } from '../../infrastructure/external-services/auth/auth.service';
import { GraphQLExceptionFilter } from './graphql-exception-filter';

@Module({
  imports: [
    ...allLogicModules,
    SentryModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      playground: true,
      autoSchemaFile: join(
        process.cwd(),
        'src/presentation/graphql/schema.graphql',
      ),
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1] || '';
        const authService = new AuthService(req); // Passer req au constructeur
        const user = await authService.validateToken(token); // Valider le token avec deux arguments
        return { user, token };
      },
      driver: ApolloDriver,
      formatError: (error) => {
        // Personnaliser le format des erreurs
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          details: error.extensions?.exception || null,
        };
      },
    }),
  ],
  providers: [
    // Résolveurs
    ...resolvers,

    // Ajoutez des filtres globaux pour capturer les exceptions
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class MyGraphQLModule { }