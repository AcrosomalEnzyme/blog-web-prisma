import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userId: string,
    password: string,
    // userId: string,
  ): Promise<any> {
    // console.log('aaaaaaaaa');
    // const user = await this.usersService.findUser(username);
    // console.log(user);
    const user = await this.usersService.findUser(userId);
    console.log(user.password);
    // const saltOrRounds = 10;
    // const cipher_password = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, user.password);

    console.log(isMatch);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
