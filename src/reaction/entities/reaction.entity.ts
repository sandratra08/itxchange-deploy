import { Publication } from 'src/publication/entities/publication.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reaction extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Publication, (publication) => publication.reactions)
  publication: Publication;

  @ManyToOne(() => User, (user) => user.reactions)
  user: User;

  @ManyToMany(() => User, (user) => user.reactions)
  @JoinColumn()
  users_views: User[];
}

export class ReactionBuilder {
  private reaction: Reaction = new Reaction();
  id(id: number) {
    this.reaction.id = id;
    return this;
  }

  publication(publication: Publication) {
    this.reaction.publication = publication;
    return this;
  }

  user(user: User) {
    this.reaction.user = user;
    return this;
  }

  build() {
    return this.reaction;
  }

  public static builder(): ReactionBuilder {
    return new ReactionBuilder();
  }
}
