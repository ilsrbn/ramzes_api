import { Injectable } from '@nestjs/common';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import * as dotenv from 'dotenv';
import { unlink } from 'node:fs';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

dotenv.config();

@Injectable()
export class PhotoService {
  constructor(
    private readonly postService: PostService,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  private static domainUrl = process.env.API_DOMAIN || 'localhost:3000';
  private static filePathPrefix = '/public/';

  async create(fileName: string) {
    const photo = this.photoRepository.create({
      file: PhotoService.filePathPrefix + fileName,
      file_url: PhotoService.domainUrl + PhotoService.filePathPrefix + fileName,
    });
    await this.photoRepository.save(photo);
  }

  findAll(query: PaginateQuery, posted?: boolean): Promise<Paginated<Photo>> {
    return paginate(query, this.photoRepository, {
      defaultSortBy: [['id', 'DESC']],
      sortableColumns: ['id', 'updated_at', 'created_at'],
      where: {
        posted,
      },
    });
  }

  findOne(id: number, posted?: boolean) {
    return this.photoRepository.findOne({ where: { id, posted } });
  }
  async toggle(id: number) {
    const photo = await this.photoRepository.findOneOrFail({
      where: { id },
    });

    photo.posted = !photo.posted;

    return await this.photoRepository.save(photo);
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
}
