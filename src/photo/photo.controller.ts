import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import e, { Express } from 'express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Admin Photo')
@Controller('admin/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: PhotoController.schema,
  })
  @UseInterceptors(PhotoController.interceptor)
  create(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.photoService.create(files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }

  // Helpers
  private static interceptor = FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './public',
      filename(
        req: e.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
      ) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  });

  private static schema = {
    type: 'object',
    properties: {
      files: {
        // 👈 this property
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  };
}
