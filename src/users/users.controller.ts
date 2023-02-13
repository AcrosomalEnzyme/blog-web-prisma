import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/local.strategy';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    // private authService: AuthService,
  ) {}

  // 获取全部user
  @Get()
//   @Public()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  // 获取单个user
  @Get(':userId')
//   @Public()
  async getBlog(
    // @Param() getBlogDto: GetBlogDto,
    @Param('userId') userId: string,
    // @Query() category: string
  ) {
    return await this.userService.findUser(userId);
  }

  // 更新user
  @Patch(':userId')
//   @Public()
  async updateUser(
    @Param('userId') userId: string,
    @Body('displayName') displayName: string,
    @Body('password') password: string,
  ) {
    await this.userService.updateUser(userId, displayName, password);
  }

  // 删除user
  // 采用了UseGuards，需要账号密码才能注销user
  @Delete(':userId')
  @Public()
  @UseGuards(LocalAuthGuard)
  async removeUser(
    // @Param() getBlogDto: GetBlogDto,
    @Param('userId') userId: string,
  ) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
