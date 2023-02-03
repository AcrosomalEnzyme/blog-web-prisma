import { Injectable, NotFoundException, UploadedFile } from '@nestjs/common';

// import { Blog } from './blog.model';
import { Blog } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BlogsServices {
  // private blogs: Blog[] = [];

  constructor(private prisma: PrismaService) {}

  //增加blog
  async insertBlog(title: string, body: string, author: string) {
    // const blogId = Math.random().toString();
    const time = new Date().toString();
    const result = await this.prisma.blog.create({
      data: { author: author, title: title, time: time, body: body },
    });
    return result;
  }

  //获取全部blog
  async getBlogs() {
    const result = await this.prisma.blog.findMany();
    return result;
  }

  // 获取单个blog
  getSingleBlog(blogId: string) {
    const blog = this.findBlog(blogId);
    // return { ...blog };
    return blog;
  }

  // 查找具体的blog， 返回blog和index值
  async findBlog(blogId: string) {
    let blog;
    try {
      blog = await this.prisma.blog.findFirst({ where: { id: blogId } });
    } catch (error) {
      throw new NotFoundException('Could not find blog.(invalided ID form).');
    }

    if (!blog) {
      throw new NotFoundException(
        'Could not find blog.(valided ID form but not find).',
      );
    }
    console.log(blog);
    return blog;
  }

  //更新blog
  async updateBlog(
    blogId: string,
    title: string,
    body: string,
    author: string,
  ) {
    await this.prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: title,
        body: body,
        author: author,
      },
    });
    return null;
  }

  //删除blog
  async deleteBlog(blogId: string) {
    await this.prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
  }
}
