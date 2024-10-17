import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Logique pour valider l'utilisateur
    // Par exemple, vérifier le nom d'utilisateur et le mot de passe dans la base de données
    const user = { username: 'test', password: 'test' }; // Exemple statique
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateOAuthLogin(profile: any): Promise<string> {
    // Ici, tu peux soit créer un utilisateur dans ta base de données, soit récupérer celui qui existe déjà
    // profile contient les informations de l'utilisateur récupérées via OAuth
    const payload = { email: profile.emails[0].value, sub: profile.id };

    // Générer un token JWT pour l'utilisateur
    const jwt = this.jwtService.sign(payload);
    return jwt;
  }
}
