import { Length, IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  @Length(24, 24, { message: 'userId长度应该为24' })
  userId: string;
}
