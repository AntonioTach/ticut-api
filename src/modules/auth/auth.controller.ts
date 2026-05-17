import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterOwnerDto } from './dto/register-owner.dto';
import { Public } from '../core/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Registrar nuevo owner con su cadena y primera sucursal',
    description: 'Crea el usuario OWNER, la Brand (cadena) y la primera Barbershop en una sola transacción. Retorna el token JWT listo para usar.',
  })
  @ApiBody({ type: RegisterOwnerDto })
  @ApiResponse({ status: 201, description: 'Registro exitoso — retorna token + user + brand + barbershop' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  async register(@Body() dto: RegisterOwnerDto) {
    return this.authService.registerOwner(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica un usuario y devuelve un token JWT',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de acceso',
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Obtener perfil del usuario',
    description: 'Obtiene la información del usuario autenticado',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario obtenido exitosamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async getProfile(@Request() req) {
    console.log(req.user);
    return this.authService.validateUser(req.user.id);
  }

  @Get('test')
  @Public()
  @ApiOperation({
    summary: 'Prueba del módulo de autenticación',
    description: 'Endpoint de prueba para verificar que el módulo funciona',
  })
  @ApiResponse({
    status: 200,
    description: 'Módulo funcionando correctamente',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Auth module is working!',
        },
      },
    },
  })
  async test() {
    return { message: 'Auth module is working!' };
  }
}
