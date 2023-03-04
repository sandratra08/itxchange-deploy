import { MinLength } from 'class-validator';

export class CreatePublicationDto {
  @MinLength(1)
  body: string;
  @MinLength(1, { each: true })
  tags: string[];
}
