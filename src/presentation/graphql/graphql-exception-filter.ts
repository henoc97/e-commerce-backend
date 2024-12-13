import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.getArgs();
        const response = {
            message: exception.message,
            statusCode: exception.getStatus(),
            error: exception.getResponse(),
        };
        return response;
    }
}
