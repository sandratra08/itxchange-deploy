import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';
import { Reaction } from '../entities/reaction.entity';

export class DbReactionDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @Length(3)
  name: string;

  @ApiProperty()
  @IsInt()
  publication: number;

  @ApiProperty()
  @IsInt()
  user: number;

  static fromReaction(data: Reaction): DbReactionDto {
    const dto = new DbReactionDto();
    dto.id = data.id;
    dto.name = data.name;
    return dto;
  }

  static fromReactions(data: Reaction[]): DbReactionDto[] {
    return data.map((item) => this.fromReaction(item));
  }
}
