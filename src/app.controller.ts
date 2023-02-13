import {
  Controller,
  Get,
  Header,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { IS_PUBLIC_KEY, Public } from './app.module';
import { SetMetadata } from '@nestjs/common';

// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // 系统默认的local auth，存在magic string问题
  // @UseGuards(AuthGuard('local'))
  // 自定义local auth
  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log(req.user);
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   console.log(req.user);
  //   return req.user;
  // }

  // @Public()
  // @UseGuards(LocalAuthGuard)
  @Post('test')
  async test(@Request() req) {
    // console.log(req);
    return null;
  }
}
