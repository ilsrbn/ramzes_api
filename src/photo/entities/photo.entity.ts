import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, ManyToMany } from 'typeorm';
import { AbstractEntity } from 'utils/abstractEntity';

@Entity()
export class Photo extends AbstractEntity {
  @Column()
  file_url: string;

  @Column()
  file: string;

  @ManyToMany(() => Category)
  categories: Array<Category>;

  @Column({ type: 'boolean', default: false })
  posted = false;
}
