import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

   /**
   * Recibe el objeto usuario que retornó GoogleStrategy.validate()
   * y genera un JWT firmado con nuestra propia clave secreta.
   */
  generateToken(user: any) {
    const payload = {
      email:     user.email,
      firstName: user.firstName,
      lastName:  user.lastName,
      picture:   user.picture,
      sub:       user.email, // "subject" del JWT — identificador único
    };

     return {
      access_token: this.jwtService.sign(payload),
    };
  } 

  async login(email: string, password: string) {

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    return {
      message: 'Login correcto',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    };
  }
}