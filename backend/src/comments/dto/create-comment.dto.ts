import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  reportId!: string;

  @IsString()
  @MaxLength(120)
  authorEmail!: string;

  @IsString()
  @MaxLength(500)
  text!: string;

  @IsOptional()
  @IsString()
  status?: string;
}
