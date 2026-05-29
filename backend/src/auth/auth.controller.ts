import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';

import { AuthService } from './auth.service';

interface JwtUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  sub?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface GoogleRequest extends Request {
  user: JwtUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Inicia login con Google
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Passport redirige automáticamente
  }

  /**
   * Callback de Google OAuth
   */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Req() req: GoogleRequest, @Res() res: Response) {
    const tokenData = this.authService.generateToken(req.user);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';

    res.redirect(`${frontendUrl}/home_loggeado.html?token=${tokenData.access_token}`);
  }

  /**
   * Perfil autenticado
   */
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: GoogleRequest) {
    return req.user;
  }

  /**
   * Login tradicional
   */
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
