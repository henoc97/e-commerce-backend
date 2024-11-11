import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/presentation/graphql/schemas/**/*.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
