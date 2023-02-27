import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AttachPhotosDto } from './dto/attach-photos.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}

@ApiTags('Admin Category')
@Controller('admin/category')
export class AdminCategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post(':id/photos/attach')
  @UseGuards(JwtAuthGuard)
  attachPhotos(@Param('id') id: string, @Body() body: AttachPhotosDto) {
    return this.categoryService.attachPhotos(+id, body.photos);
  }

  @Post(':id/photos/detach')
  @UseGuards(JwtAuthGuard)
  detachPhotos(@Param('id') id: string, @Body() body: AttachPhotosDto) {
    return this.categoryService.detachPhotos(+id, body.photos);
  }
}
