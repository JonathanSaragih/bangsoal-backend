import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { BadRequestException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() req: any) {
    return this.authService.login(req);
  }

  @Post('register')
  async register(@Body() user: any) {
    const existingUser = await this.userService.findByUsername(user.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.userService.create(user);
  }
}
