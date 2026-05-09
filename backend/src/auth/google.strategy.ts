import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private configService: ConfigService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['email', 'profile'], // qué pedimos a Google
    });
  }

  /**
   * validate() se ejecuta automáticamente cuando Google redirige
   * al callback con el perfil del usuario ya verificado.
   * Lo que retornamos aquí se adjunta a req.user
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {

    // Construimos un objeto usuario con los datos relevantes
    const user = {
    email: profile.emails?.[0]?.value,
    firstName: profile.name?.givenName,
    lastName: profile.name?.familyName,
    picture: profile.photos?.[0]?.value,
    accessToken,
  };

  return user;// null = sin error, user = datos adjuntados a req.user
  }
}