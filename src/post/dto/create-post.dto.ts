import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
export class CreatePostDto {
  @MaxLength(120)
  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  posted?: boolean;

  @IsOptional()
  event_date?: string;
}

export interface CreatePost extends CreatePostDto {
  userId: number;
}
