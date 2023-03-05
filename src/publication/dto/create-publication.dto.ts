import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePublicationDto {
  @ApiProperty({
    type: 'string',
  })
  @MinLength(1)
  body: string;

  @ApiProperty({
    type: 'file',
    format: 'binary',
    required: false,
    description: 'Photo',
  })
  @IsOptional()
  file: Express.Multer.File;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  type: string;

  @ApiProperty({
    type: Array<string>,
  })
  @IsString({ each: true })
  @Optional()
  tags: string[];
}
