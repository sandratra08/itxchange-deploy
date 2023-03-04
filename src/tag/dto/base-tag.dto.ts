import { MinLength } from 'class-validator';

export class BaseTagDto {
  @MinLength(1)
  name: string;
}
