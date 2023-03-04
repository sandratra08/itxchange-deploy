import { MinLength } from 'class-validator';

export class CreateTagDto {
  @MinLength(1)
  name: string;
}
