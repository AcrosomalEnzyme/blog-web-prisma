import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ userId: String });
  }

  // 要求包含username和password，并自动读取
  async validate(userId: string, password: string): Promise<any> {
    // console.log(userId);
    const user = await this.authService.validateUser(userId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
