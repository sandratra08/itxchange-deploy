import { Reaction } from '@/reactions/entities/reaction.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DbPublicationDto } from '../dto/db-publication.dto';

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

  @ManyToOne(() => Reaction, (data) => data.publications, {
    eager: true,
    nullable: true,
  })
  reactions: Reaction;

  getDto(): DbPublicationDto {
    const dto = new DbPublicationDto();
    dto.id = this.id;
    dto.date = this.date;
    dto.view = this.view;
    dto.type = this.type;
    dto.file = this.file;
    return dto;
  }
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

  build() {
    return this.publication;
  }

  public static builder(): PublicationBuilder {
    return new PublicationBuilder();
  }
}
