import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { AbstractEntity } from 'utils/abstractEntity';

@Entity()
export class Post extends AbstractEntity {
  @Index({ fulltext: true })
  @Column({ type: 'varchar', length: 120, default: '' })
  title: string;

  @Index({ fulltext: true })
  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'boolean', default: false })
  posted = false;

  @ManyToOne(() => Account, (owner) => owner.posts, { nullable: false })
  owner: Account;

  @Column({ nullable: false })
  ownerId: number;
}
