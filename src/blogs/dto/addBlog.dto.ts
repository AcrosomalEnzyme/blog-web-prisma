import { IsNotEmpty, IsString } from 'class-validator';

export class AddBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  author: string;

}