import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me')
  check(@Request() req) {
    return this.authService.checkUser(req.headers.authorization.split(' ')[1]);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async login(@Body() payload: LoginUserDto) {
    return await this.authService.login(payload);
  }

  @Post('/signup')
  async registration(@Body() payload: CreateUserDto) {
    return await this.authService.registration(payload);
  }
}
