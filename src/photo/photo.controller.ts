import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Get,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SharpPipe } from '../../utils/sharp.pipe';

@ApiTags('Admin Photo')
@Controller('admin/photo')
export class AdminPhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: AdminPhotoController.schema,
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile(SharpPipe) file: string) {
    return this.photoService.create(file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }

  private static schema = {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  };
}

@ApiTags('Photo')
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }
}
