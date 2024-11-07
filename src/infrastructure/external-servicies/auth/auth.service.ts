import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

interface Profile {
  id?: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(private readonly jwtService: JwtService) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  // Validation d'utilisateur pour le login normal
  async validateUser(username: string, pass: string): Promise<any> {
    const user = { username: 'test', password: 'test' }; // Remplacer par une vérification réelle
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Génération de token JWT pour l'authentification standard
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validation du token Google et génération du JWT
  async validateGoogleToken(token: string): Promise<string> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid Google token');
    }
    return this.validateOAuthLogin({
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
    });
  }

  // Validation du token Facebook et génération du JWT
  async validateFacebookToken(token: string): Promise<string> {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
    );
    const profile = response.data;
    if (!profile) {
      throw new UnauthorizedException('Invalid Facebook token');
    }
    // return this.validateOAuthLogin({
    //   email: profile.email,
    //   name: profile.name,
    // });
    return this.validateOAuthLogin({});
  }

  // Créer un JWT pour un utilisateur authentifié via OAuth (Google/Facebook)
  async validateOAuthLogin(profile: any): Promise<string> {
    // Ajoute une logique pour vérifier ou créer l'utilisateur en base de données
    const payload = { email: profile.email, sub: profile.id || profile.email };

    // Génère un JWT avec le profil utilisateur
    return this.jwtService.sign(payload);
  }
}
