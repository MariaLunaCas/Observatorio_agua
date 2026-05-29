import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('admin/promote-first')
  async promoteFirstAdmin(
    @Body() body: { email: string; password: string },
  ) {
    const adminCount = await this.usersService.countAdmins();
    if (adminCount > 0) {
      throw new BadRequestException(
        'Ya existe un administrador. No puedes crear otro con este endpoint.',
      );
    }
    return this.usersService.promoteToFirstAdmin(body.email, body.password);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/approve-admin')
  @UseGuards(AuthGuard('jwt'))
  async approveAdmin(
    @Param('id') id: string,
    @Body('validatorEmail') validatorEmail: string,
    @Req() req: any,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Solo administradores pueden aprobar solicitudes de admin',
      );
    }
    return this.usersService.approveAdminRequest(id, req.user.email);
  }

  @Patch(':id/reject-admin')
  @UseGuards(AuthGuard('jwt'))
  async rejectAdmin(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException(
        'Solo administradores pueden rechazar solicitudes de admin',
      );
    }
    return this.usersService.rejectAdminRequest(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Solo administradores pueden eliminar usuarios');
    }
    return this.usersService.remove(id);
  }
}
