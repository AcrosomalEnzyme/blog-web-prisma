import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.controller';
import { BlogsServices } from './blogs.services';
import { AddBlogDto } from './dto/addBlog.dto';
import { GetBlogDto } from './dto/getBlog.dto';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsServices) {}

  //增加blog
  @Post()
  async addBlog(
    @Body() addBlogDto: AddBlogDto,
    @Body('title') blogTitle: string,
    @Body('body') blogBody: string,
    @Body('author') blogAuthor: string,
  ) {
    const generatedId = await this.blogService.insertBlog(
      blogTitle,
      blogBody,
      blogAuthor,
    );

    // console.log(generatedId);
    // console.log(typeof generatedId);
    // return { id: generatedId };
    return generatedId;
  }

  //获取全部blog
  @Get()
  @Public()
  async getAllBlogs() {
    return await this.blogService.getBlogs();
  }

  //获取单个blog
  @Get(':blogId')
  @Public()
  async getBlog(
    @Param() getBlogDto: GetBlogDto,
    @Param('blogId') blogId: string,
    // @Query() category: string
  ) {
    return await this.blogService.getSingleBlog(blogId);
  }

  //更新blog
  @Patch(':blogId')
  async updateBlog(
    @Param() getBlogDto: GetBlogDto,
    @Param('blogId') blogId: string,
    @Body() updateBlogDto :UpdateBlogDto,
    @Body('title') blogTitle: string,
    @Body('body') blogBody: string,
    @Body('author') blogAuthor: string,
  ) {
    await this.blogService.updateBlog(blogId, blogTitle, blogBody, blogAuthor);
    return null;
  }

  //删除blog
  @Delete(':blogId')
  async removeBlog(
    @Param() getBlogDto: GetBlogDto,
    @Param('blogId') blogId: string,
  ) {
    await this.blogService.deleteBlog(blogId);
    return null;
  }

  // test
  // @Post()
  // create(@Body() createUserDto: AddBlogDto) {
  //   return 'This action adds a new user';
  // }
}
