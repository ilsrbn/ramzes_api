import { Injectable, NotFoundException } from '@nestjs/common';
// import { v4 } from 'uuid';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Express } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import * as dotenv from 'dotenv';
import { unlink } from 'node:fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as sharp from 'sharp';

dotenv.config();

@Injectable()
export class PhotoService {
  constructor(
    private readonly postService: PostService,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  private static domainUrl = process.env.API_DOMAIN || 'localhost:3000';
  async create(filesArray: Array<Express.Multer.File>) {
    for (const oldFile of filesArray) {
      const { fileUrl, filePath } = await this.removePhotoWithOptimized(
        oldFile,
      );
      const photo = this.photoRepository.create({
        file: filePath,
        file_url: fileUrl,
      });
      await this.photoRepository.save(photo);
    }
  }

  findAll() {
    return this.photoRepository.find({ where: {} });
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  async remove(id: number) {
    const file = await this.photoRepository.findOneOrFail({
      where: { id },
    });
    unlink(file.file, (err) => {
      if (err) throw err;
      console.log(`${file.file} was deleted`);
    });
    return await this.photoRepository.delete({ id });
  }

  private async removePhotoWithOptimized(oldFile: Express.Multer.File) {
    const filePath = oldFile.path.split('.')[0] + '.webp';
    const fileUrl = PhotoService.domainUrl + '/' + filePath;

    await sharp(oldFile.path)
      .webp({ quality: 60 })
      .rotate()
      .toFile('./public/' + oldFile.filename.split('.')[0] + '.webp');

    unlink(oldFile.path, (err) => {
      if (err) console.log({ err });
    });

    return { fileUrl, filePath };
  }
}
