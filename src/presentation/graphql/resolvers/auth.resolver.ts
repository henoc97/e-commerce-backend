import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/infrastructure/external-servicies/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infrastructure/external-servicies/auth/jwt-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const { access_token } = await this.authService.login(user);
    return access_token;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async protectedResource(): Promise<string> {
    return 'This is a protected resource';
  }

  @Mutation(() => String)
  async googleLogin(@Args('accessToken') accessToken: string): Promise<string> {
    const profile = await this.authService.validateGoogleToken(accessToken);
    return this.authService.validateOAuthLogin(profile);
  }

  @Mutation(() => String)
  async facebookLogin(
    @Args('accessToken') accessToken: string,
  ): Promise<string> {
    const profile = await this.authService.validateFacebookToken(accessToken);
    return this.authService.validateOAuthLogin(profile);
  }

  // Ajoutez d'autres mutations pour d'autres fournisseurs ici
}
