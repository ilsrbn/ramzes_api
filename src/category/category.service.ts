import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { PhotoService } from '../photo/photo.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly photoService: PhotoService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneOrFail({ where: { id } });
  }

  async attachPhotos(categoryId: number, photosIds: number[]) {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id: categoryId },
    });
    for (const photoId of photosIds) {
      const photo = await this.photoService.findOne(photoId);
      if (photo) category.photos.push(photo);
    }
    return await this.categoryRepository.save(category);
  }

  async detachPhotos(categoryId: number, photosIds: number[]) {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id: categoryId },
    });
    for (const photoId of photosIds) {
      category.photos = category.photos.filter((photo) => photo.id !== photoId);
    }
    return await this.categoryRepository.save(category);
  }
}
