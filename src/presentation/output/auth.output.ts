import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutput } from './user.output';
import { Type } from 'class-transformer';

@ObjectType()
export class AuthResponse {

    @Field()
    access_token: string;

    @Field(() => UserOutput, { nullable: true })
    @Type(() => UserOutput)
    user?: UserOutput;
}