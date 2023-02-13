import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
// import { PrismaService } from './prisma.service';

// import { Prisma } from '@prisma/client';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { SetMetadata } from '@nestjs/common';


// nest g module auth

// imports ：导入其他模块中导出的Providers，以实现共享
// providers ：模块中所有用到的功能类，模块内共享实用；
// controllers：控制器
// exports：导出其他模块需要共享的Providers

@Module({
  imports: [BlogsModule, UsersModule, AuthModule],
  controllers: [AppController],
  // providers: [AppService, PrismaService],

  providers: [
    AppService,
    // 全局jwt
    // { provide: APP_GUARD, useClass: JwtAuthGuard }
  ],
})
export class AppModule {}

// 自定义修饰符名称
// export const IS_PUBLIC_KEY = 'isPublic';
// export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);