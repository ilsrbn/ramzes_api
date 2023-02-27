import { IsBoolean, IsOptional, MaxLength } from 'class-validator';
export class CreatePostDto {
  @MaxLength(120)
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  posted?: boolean;
}

export interface CreatePost extends CreatePostDto {
  userId: number;
}
