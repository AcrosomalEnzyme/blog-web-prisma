import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
// import { PrismaService } from './prisma.service';

// import { Prisma } from '@prisma/client';

@Module({
  imports: [BlogsModule],
  controllers: [AppController],
  // providers: [AppService, PrismaService],
  providers: [AppService],
})
export class AppModule {}
