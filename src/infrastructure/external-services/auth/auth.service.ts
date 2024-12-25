import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../application/services/user.service';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import * as dotenv from 'dotenv';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';

dotenv.config();

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateGoogleToken(token: string): Promise<any> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const googleProfile = ticket.getPayload();
      console.log('Google Profile:', googleProfile);

      // Vérifier si l'utilisateur existe déjà
      let user = await this.userService.getUserByEmail(googleProfile.email);

      if (!user) {
        // Créer un nouvel utilisateur avec les données Google
        const newUser = {
          email: googleProfile.email,
          name: googleProfile.name,
          isEmailVerified: googleProfile.email_verified,
          authProvider: 'GOOGLE',
          googleId: googleProfile.sub,
          // Pas besoin de mot de passe pour l'auth Google
        };

        user = await this.userService.createUser(toUserDTO(newUser));
        console.log('New user created:', user);
      } else {
        // Mettre à jour les informations si nécessaire
        const updates = {
          name: googleProfile.name,
          lastLogin: new Date(),
        };
        user = await this.userService.updateUser(user.id, updates);
        console.log('Existing user updated:', user);
      }

      return user;
    } catch (error) {
      console.error('Google authentication error:', error);
      throw new UnauthorizedException('Failed to authenticate with Google');
    }
  }

  async validateOAuthLogin(profile: any): Promise<string> {
    const payload = {
      email: profile.email,
      sub: profile.id || profile.sub,
      name: profile.name,
      authProvider: 'GOOGLE'
    };
    return this.jwtService.sign(payload);
  }
}