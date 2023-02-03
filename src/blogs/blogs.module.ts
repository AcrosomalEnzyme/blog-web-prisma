import { Module } from "@nestjs/common";
import { BlogsController } from "./blogs.controller";
import { BlogsServices } from "./blogs.services";
import { PrismaService } from "src/prisma.service";

@Module({
    controllers:[BlogsController],
    providers: [BlogsServices, PrismaService]
})
export class BlogsModule{}