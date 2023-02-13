import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, PrismaService,AuthService,JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}