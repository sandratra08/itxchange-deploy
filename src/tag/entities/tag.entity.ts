import { Publication } from 'src/publication/entities/publication.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Publication, (publication) => publication.tags)
  publications: Publication[];
}

export class TagBuilder {
  private tag: Tag;
  id(id: number) {
    this.tag.id = id;
    return this;
  }

  name(name: string) {
    this.tag.name = name;
    return this;
  }

  build() {
    return this.tag;
  }

  publications(publications: Publication[]) {
    this.tag.publications = publications;
    return this;
  }
  public static builder() {
    return new TagBuilder();
  }
}
