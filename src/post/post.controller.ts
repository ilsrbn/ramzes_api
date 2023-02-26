import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'utils/request.decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';
import { orderBy } from 'lodash';

@ApiTags('Admin Post')
@ApiBearerAuth()
@Controller('admin/post')
export class AdminPostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create post' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @User() userId: number) {
    return this.postService.create({ ...createPostDto, userId });
  }

  @ApiOperation({ summary: 'Edit post' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  edit(
    @Param('id') id: string,
    @Body() editPostDto: UpdatePostDto,
    @User() userId: number,
  ) {
    return this.postService.edit(+id, { ...editPostDto, userId });
  }

  @ApiOperation({ summary: 'Get all posts' })
  @UseGuards(JwtAuthGuard)
  @Get('?')
  findAll(@Query('search') search: string) {
    return this.postService.findAll(search, 'id');
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete post by ID' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.delete(+id);
  }
}

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  findAll(@Query('search') search: string) {
    return this.postService.findAll(search, 'event_date');
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id, true);
  }
}
