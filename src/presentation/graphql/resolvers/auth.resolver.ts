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

  @Mutation(() => AuthResponse)
  async googleAuth(
    @Args('token') token: string
  ): Promise<AuthResponse> {
    try {
      const user = await this.authService.validateGoogleToken(token);
      const access_token = await this.authService.validateOAuthLogin(user);

      return {
        access_token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || 'CLIENT',
          profile: user.profile || null,
          addresses: user.addresses || [],
          orders: user.orders || [],
          vendor: user.vendor || null,
          carts: user.carts || [],
          createdAt: user.createdAt || new Date(),
          updatedAt: user.updatedAt || new Date()
        }
      };
    } catch (error) {
      throw new Error('Failed to authenticate with Google');
    }
  }

  // Mutation de test pour vérifier le token
  @Mutation(() => String)
  async verifyGoogleToken(
    @Args('token') token: string
  ): Promise<any> {
    try {
      const profile = await this.authService.validateGoogleToken(token);
      console.log('Verified Google Profile:', profile);
      return JSON.stringify(profile);
    } catch (error) {
      console.error('Token Verification Error:', error);
      throw new Error('Invalid Google token');
    }
  }

  // @Mutation(() => String)
  // async facebookLogin(
  //   @Args('accessToken') accessToken: string,
  // ): Promise<string> {
  //   const profile = await this.authService.validateFacebookToken(accessToken);
  //   return this.authService.validateOAuthLogin(profile);
  // }

  // Ajoutez d'autres mutations pour d'autres fournisseurs ici
}
