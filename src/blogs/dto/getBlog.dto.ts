import { Length, IsString } from 'class-validator';

export class GetBlogDto {
  @IsString()
  @Length(24, 24, { message: 'id长度应该为24' })
  blogId: string;
}
