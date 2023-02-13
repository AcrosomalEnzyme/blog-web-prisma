import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { SetMetadata } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  // 系统默认的local auth，存在magic string问题
  // @UseGuards(AuthGuard('local'))
  // 自定义local auth
  // 用户登录
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    // console.log('herererer');
    // console.log(req.user);
    return this.authService.login(req.user);
  }

  // 用户注册
  @Public()
  @Post('register')
  async register(
    @Request() req,
    @Body('displayName') displayName: string,
    @Body('password') password: string,
  ) {
    const result = await this.userService.insertUser(displayName, password);
    return result;
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }

  @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('test')
  async test(@Request() req) {
    // console.log(req);
    return null;
  }
}
