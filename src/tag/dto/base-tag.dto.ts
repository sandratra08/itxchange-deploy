import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class BaseTagDto {
  @ApiProperty()
  @MinLength(1)
  name: string;
}
