import { Publication } from '../entities/publication.entity';

export class DbPublicationDto {
  id: number;
  date: Date;
  view: number;
  type: string;
  body: string;
  file: string;

  constructor(publication: Publication) {
    this.id = publication.id;
    this.date = publication.date;
    this.view = publication.view;
    this.type = publication.type;
    this.body = publication.body;
    this.file = publication.file;
  }
}

export class DbPublicationBuilder {
  private dto: DbPublicationDto;

  id(id: number) {
    this.dto.id = id;
    return this;
  }

  date(date: Date) {
    this.dto.date = date;
    return this;
  }

  view(view: number) {
    this.dto.view = view;
    return this;
  }

  type(type: string) {
    this.dto.type = type;
    return this;
  }

  file(file: string) {
    this.dto.file = file;
    return this;
  }

  build() {
    return this.dto;
  }

  public static builder(): DbPublicationBuilder {
    return new DbPublicationBuilder();
  }

  public static getArrayFromBuild(publications: Publication[]) {
    return publications.map((publication) =>
      new DbPublicationBuilder()
        .id(publication.id)
        .date(publication.date)
        .view(publication.view)
        .type(publication.type)
        .file(publication.file)
        .build(),
    );
  }
}
