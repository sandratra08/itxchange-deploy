import { User } from 'src/users/entities/user.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone', default: 'NOW()' })
  updatedAt: Date;

  @ManyToOne(() => Publication, (publication) => publication.comments)
  publication: Publication;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @BeforeInsert()
  setDate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}

export class CommentBuilder {
  private comment: Comments;

  public static builder() {
    return new CommentBuilder();
  }

  user(user: User) {
    this.comment.user = user;
    return this;
  }

  content(content: string) {
    this.comment.content = content;
    return this;
  }

  publication(publication: Publication) {
    this.comment.publication = publication;
    return this;
  }

  build() {
    return this.comment;
  }
}
