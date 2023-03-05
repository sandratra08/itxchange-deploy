import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comments } from './../../comments/entities/comment.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone', default: 'NOW()' })
  date: Date;

  @Column({ default: 0 })
  view: number;

  @Column()
  type: string;

  @Column()
  body: string;

  @Column()
  file: string;

  @ManyToOne(() => User, (user) => user.publications, {
    eager: true,
    nullable: false,
  })
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.publications, {
    eager: true,
    nullable: false,
  })
  @JoinTable({
    name: 'publications_tags',
  })
  tags: Tag[];

  @OneToMany(() => Comments, (comments) => comments.publication, {
    eager: true,
  })
  comments: Comments[];

  @OneToMany(() => User, (user) => user.reactions, {
    eager: true,
  })
  interactors: User[];

  @OneToMany(() => User, (user) => user.views, {
    eager: true,
  })
  viewers: User[];
}

export class PublicationBuilder {
  private publication: Publication = new Publication();
  id(id: number) {
    this.publication.id = id;
    return this;
  }

  date(date: Date) {
    this.publication.date = date;
    return this;
  }

  view(view: number) {
    this.publication.view = view;
    return this;
  }

  type(type: string) {
    this.publication.type = type;
    return this;
  }

  body(body: string) {
    this.publication.body = body;
    return this;
  }

  file(file: string) {
    this.publication.file = file;
    return this;
  }

  user(user: User) {
    this.publication.user = user;
    return this;
  }

  tags(tags: Tag[]) {
    this.publication.tags = tags;
    return this;
  }

  public static getBuilder(publication: Publication) {
    const builderPub = new PublicationBuilder();
    builderPub.publication = publication;
    return builderPub;
  }

  build() {
    return this.publication;
  }

  public static builder(): PublicationBuilder {
    return new PublicationBuilder();
  }
}
