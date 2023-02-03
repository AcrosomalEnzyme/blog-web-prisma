import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BlogsServices } from './blogs.services';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogService: BlogsServices) {}

  //增加blog
  @Post()
  async addBlog(
    @Body('title') blogTitle: string,
    @Body('body') blogBody: string,
    @Body('author') blogAuthor: string,
  ) {
    const generatedId = await this.blogService.insertBlog(
      blogTitle,
      blogBody,
      blogAuthor,
    );

    console.log(generatedId);
    console.log(typeof generatedId);
    // return { id: generatedId };
    return generatedId;
  }

  //获取全部blog
  @Get()
  async getAllBlogs() {
    return await this.blogService.getBlogs();
  }

  //获取单个blog
  @Get(':blogId')
  async getBlog(@Param('blogId') blogId: string) {
    return await this.blogService.getSingleBlog(blogId);
  }

  //更新blog
  @Patch(':blogId')
  async updateBlog(
    @Param('blogId') blogId: string,
    @Body('title') blogTitle: string,
    @Body('body') blogBody: string,
    @Body('author') blogAuthor: string,
  ) {
    await this.blogService.updateBlog(blogId, blogTitle, blogBody, blogAuthor);
    return null;
  }

  //删除blog
  @Delete(':blogId')
  async removeBlog(@Param('blogId') blogId: string) {
    await this.blogService.deleteBlog(blogId);
    return null;
  }
}
