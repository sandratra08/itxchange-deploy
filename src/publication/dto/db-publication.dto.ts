import { Tag } from 'src/tag/entities/tag.entity';
import { Comments } from './../../comments/entities/comment.entity';
import { Publication } from '../entities/publication.entity';
import { DbCommentDto } from './../../comments/dto/base-comment.dto';
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
  comments: DbCommentDto[];
  user: DbUserDto;

  constructor(publication: Publication) {
    this.id = publication.id;
    this.date = parseDateToString(publication.date);
    this.view = publication.view;
    this.type = publication.type;
    this.body = publication.body;
    this.file = publication.file;
    this.tags = publication.tags.map((tag) => new DBTagDto(tag));
    this.comments =
      publication.comments?.map((comment) =>
        DbCommentDto.dtoFromComment(comment),
      ) || [];
    this.user = DbUserDto.dtoFromUser(publication.user);
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

  comments(comments: Comments[]) {
    this.db.comments = comments.map((comment) =>
      DbCommentDto.dtoFromComment(comment),
    );
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
