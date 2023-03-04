import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
