import { Delete, Injectable, NotFoundException } from '@nestjs/common';
// import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { PrismaService } from 'src/prisma.service';
// import { promisify } from 'util';
import * as bcrypt from 'bcrypt';
// import { Blog } from 'src/blogs/blog.model';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(private prisma: PrismaService) {}


  // 查找具体的user， 返回user
  async findUser(userId: string): Promise<User | undefined> {
    // todo not find error
    let user;
    try {
      user = await this.prisma.user.findFirst({ where: { id: userId } });
    } catch (error) {
      throw new NotFoundException('Could not find user.(invalidaed ID form)');
    }

    return user;
  }

  // 增加用户
  async insertUser(displayName: string, password: string) {
    const salt = await bcrypt.genSalt();
    const cipher_password = await bcrypt.hash(password, salt);
    // console.log(cipher_password);
    const result = await this.prisma.user.create({
      data: { displayName: displayName, password: cipher_password },
    });
    return result;
  }

  // 获取全部用户
  async getAllUsers() {
    const result = await this.prisma.user.findMany();
    return result;
  }

  //更新user
  async updateUser(
    userId: string,
    displayName: string,
    password: string,
  ) {
    const salt = await bcrypt.genSalt();
    const cipher_password = await bcrypt.hash(password, salt);
    await this.prisma.user.update({
      
      where: {
        id: userId,
      },
      data: {
        displayName: displayName,
        password: cipher_password,
      },
    });
    return null;
  }
  

  // 删除user
  @Delete(':blogId')
  async deleteUser(userId: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new NotFoundException('Could not find blog.(invalided ID form).');
    }
  }
}
