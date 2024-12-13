


import { Module } from '@nestjs/common';

import allLogicModules from './application/modules/all-logic-modules';
import { MyGraphQLModule } from './presentation/graphql/graphql.module';

@Module({
  imports: [
    MyGraphQLModule,
  ],
  // ... autres configurations si nécessaire ...
})
export class AppModule { }
