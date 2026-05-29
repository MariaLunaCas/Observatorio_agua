import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';

interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  requestedRole: string;
  status: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * JWT para Google OAuth
   */
  generateToken(user: GoogleUser) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      sub: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Login tradicional
   */
  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = (await this.usersService.findByEmail(
      normalizedEmail,
    )) as UserDocument | null;

    if (!user) {
      throw new UnauthorizedException('Usuario no existe');
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Contraseña incorrecta',
      );
    }

    if (user.status === 'pending' && user.role !== 'validator' && user.role !== 'admin') {
      throw new UnauthorizedException(
        'La cuenta esta pendiente de aprobacion por un validador',
      );
    }

    if (user.status === 'rejected') {
      throw new UnauthorizedException(
        'La solicitud de esta cuenta fue rechazada',
      );
    }

    // Payload JWT
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      requestedRole: user.requestedRole,
      status: user.status,
    };

    // Firmar token
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        requestedRole: user.requestedRole,
        status: user.status,
      },
    };
  }
}
