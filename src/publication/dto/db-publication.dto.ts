import { Tag } from 'src/tag/entities/tag.entity';
import { Publication } from '../entities/publication.entity';
import { DBTagDto } from './../../tag/dto/db-tag.dto';
import { DbUserDto } from './../../users/dto/db-user.dto';
import { parseDateToString } from './../../utils/index';
export class DbPublicationDto {
  id: number;
  date: string;
  view: number;
  type: string;
  body: string;
  file: string;
  tags: DBTagDto[];
  user: DbUserDto;
  total_interactions: number;
  total_comments: number;

  constructor(publication: Publication) {
    this.id = publication.id;
    this.date = parseDateToString(publication.date);
    this.view = publication.view;
    this.type = publication.type;
    this.body = publication.body;
    this.file = publication.file;
    this.tags = publication.tags.map((tag) => new DBTagDto(tag));
    this.user = DbUserDto.dtoFromUser(publication.user);
    this.total_comments = publication.total_comments;
    this.total_interactions = publication.total_interactions;
  }
}

export class DbPublicationBuilder {
  private db: DbPublicationDto;

  id(id: number) {
    this.db.id = id;
    return this;
  }

  date(date: string) {
    this.db.date = date;
    return this;
  }

  body(body: string) {
    this.db.body = body;
    return this;
  }

  view(view: number) {
    this.db.view = view;
    return this;
  }

  type(type: string) {
    this.db.type = type;
    return this;
  }

  tags(tags: Tag[]) {
    this.db.tags = tags.map((tag) => new DBTagDto(tag));
    return this;
  }

  file(file: string) {
    this.db.file = file;
    return this;
  }

  total_interactions(total: number) {
    this.db.total_interactions = total;
    return this;
  }

  total_comments(total: number) {
    this.db.total_comments = total;
    return this;
  }

  build() {
    return this.db;
  }

  public static builder(): DbPublicationBuilder {
    return new DbPublicationBuilder();
  }

  public static getArrayFromBuild(publications: Publication[]) {
    return publications.map((publication) => new DbPublicationDto(publication));
  }
}
