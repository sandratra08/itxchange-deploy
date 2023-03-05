import { ApiProperty } from '@nestjs/swagger';

export class CreateReactionDto {
  @ApiProperty()
  publication_id: number;

  constructor(publication_id: number) {
    this.publication_id = publication_id;
  }
}
