import { ApiProperty } from '@nestjs/swagger';
import { DbPublicationDto } from 'src/publication/dto/db-publication.dto';
import { DbUserDto } from 'src/users/dto/db-user.dto';
import { Reaction } from '../entities/reaction.entity';

export class DbReactionDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  publication: DbPublicationDto;
  @ApiProperty()
  user: DbUserDto;

  constructor(reaction: Reaction) {
    this.id = reaction.id;
    this.publication = new DbPublicationDto(reaction.publication);
    this.user = DbUserDto.dtoFromUser(reaction.user);
  }
}
