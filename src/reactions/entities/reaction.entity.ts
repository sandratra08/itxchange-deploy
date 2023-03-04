import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateReactionDto } from '../dto/create-reaction.dto';
import { UpdateReactionDto } from '../dto/update-reaction.dto';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Publication, (publication) => publication.reactions)
  publications: Publication[];

  @OneToMany(() => User, (user) => user.reactions)
  users: User[];

  update(dto: UpdateReactionDto) {
    this.name = dto.name;
  }

  private static setInstance(data: Reaction, dto: CreateReactionDto) {
    data.name = dto.name;
    return data;
  }

  static fromDto(dto: CreateReactionDto): Reaction {
    const data = new Reaction();
    this.setInstance(data, dto);
    return data;
  }
}

export class ReactionBuilder {
  private reaction: Reaction = new Reaction();
  id(id: number) {
    this.reaction.id = id;
    return this;
  }

  name(name: string) {
    this.reaction.name = name;
    return this;
  }

  build() {
    return this.reaction;
  }

  public static builder(): ReactionBuilder {
    return new ReactionBuilder();
  }
}
