import { IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  body: string;
}
