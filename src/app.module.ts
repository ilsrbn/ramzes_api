import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/datasource';
import { AccountModule } from './account/account.module';
import { PostModule } from './post/post.module';
import { PhotoModule } from './photo/photo.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MulterModule.register({
      dest: './public',
    }),
    AccountModule,
    PostModule,
    PhotoModule,
    CategoryModule,
  ],
})
export class AppModule {}
