import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePost } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { EditPost } from './dto/update-post.dto';
import { isEmpty } from 'lodash';
import { unlink } from 'node:fs';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createPost: CreatePost): Promise<Post> {
    if (createPost.title)
      await this.findDuplicate(createPost.userId, createPost.title);

    const post = this.postRepository.create({
      ...createPost,
      ownerId: createPost.userId,
    });
    await this.postRepository.save(post);

    return post;
  }

  async edit(postId: number, editPost: EditPost): Promise<Post> {
    const post = await this.postRepository.findOneOrFail({
      where: {
        id: postId,
        ownerId: editPost.userId,
      },
    });

    if (!post) throw new NotFoundException();

    if (editPost.title) post.title = editPost.title;
    if (editPost.posted) post.posted = editPost.posted;
    if (editPost.description) post.description = editPost.description;
    if (editPost.event_date) post.event_date = editPost.event_date;

    await this.postRepository.save(post);
    return post;
  }

  async findAll(search: string, orderBy: string): Promise<Post[]> {
    let posts;
    if (!isEmpty(search)) {
      posts = await this.postRepository
        .createQueryBuilder('post')
        .select()
        .where(`MATCH(title) AGAINST ('+${search}*' IN BOOLEAN MODE)`)
        .orWhere(`MATCH(description) AGAINST ('+${search}*' IN BOOLEAN MODE)`)
        .leftJoinAndSelect('post.attachments', 'attachments')
        .orderBy(orderBy, 'DESC')
        .getMany();
    } else
      posts = await this.postRepository.find({ order: { [orderBy]: 'DESC' } });
    return posts;
  }

  findOne(id: number, posted?: boolean): Promise<Post | null> {
    return this.postRepository.findOne({
      where: {
        id,
        posted,
      },
    });
  }

  async delete(id: number) {
    const { attachments } = await this.postRepository.findOneOrFail({
      where: { id },
    });
    for (const attachment of attachments) {
      unlink(attachment.file, (err) => {
        if (err) throw err;
        console.log(`${attachment.file} deleted!`);
      });
    }
    return this.postRepository.delete({
      id,
    });
  }

  private async findDuplicate(userId: number, postTitle: string, error = true) {
    const post = await this.postRepository.findOne({
      where: {
        ownerId: userId,
        title: postTitle,
      },
    });
    if (post && error) {
      throw new BadRequestException(
        `Post with title ${postTitle} already exists`,
      );
    }
  }
}
