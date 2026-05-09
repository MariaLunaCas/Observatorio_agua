import { Body, Controller, Post , Get, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
    // PASO 1 del flujo: el frontend redirige aquí para iniciar auth con Google
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Passport intercepta esta ruta y redirige automáticamente a Google.
    // El cuerpo de esta función nunca se ejecuta.
  }

  // PASO 3 del flujo: Google redirige aquí con el código de autorización
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: any) {
    // req.user contiene lo que retornó GoogleStrategy.validate()
    // Generamos nuestro propio JWT de sesión
    const tokenData = this.authService.generateToken(req.user);

    // Redirigimos al frontend con el token en la URL
    // En producción: usa cookies HttpOnly en lugar de URL params
    res.redirect(
      `http://localhost:5500/home_loggeado.html?access_token=${tokenData.access_token}`, 
    );
  }

  // Endpoint para obtener el perfil del usuario autenticado
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    return req.user; // retorna el payload del JWT
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}