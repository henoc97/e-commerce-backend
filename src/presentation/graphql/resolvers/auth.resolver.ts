import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../../infrastructure/external-services/auth/auth.service';
import { AuthResponse } from '../../output/auth.output'
import { AuthInput } from '../../input/auth.input'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => AuthResponse)
  async login(
    @Args('auth') auth: AuthInput,
  ): Promise<AuthResponse> {
    const user = await this.authService.validateUser(auth.email, auth.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    console.log("User found:" + JSON.stringify(user));
    return await this.authService.login(user);
  }

  // @UseGuards(GqlAuthGuard )
  @Mutation(() => String)
  async protectedResource(): Promise<string> {
    return 'This is a protected resource';
  }

  // @Mutation(() => String)
  // async googleLogin(@Args('accessToken') accessToken: string): Promise<string> {
  //   const profile = await this.authService.validateGoogleToken(accessToken);
  //   return this.authService.validateOAuthLogin(profile);
  // }

  // @Mutation(() => String)
  // async facebookLogin(
  //   @Args('accessToken') accessToken: string,
  // ): Promise<string> {
  //   const profile = await this.authService.validateFacebookToken(accessToken);
  //   return this.authService.validateOAuthLogin(profile);
  // }

  // Ajoutez d'autres mutations pour d'autres fournisseurs ici
}
