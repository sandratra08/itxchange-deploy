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
  tag: DBTagDto[];
  comments: DbCommentDto[];
  user: DbUserDto;

  constructor(publication: Publication) {
    this.id = publication.id;
    this.date = parseDateToString(publication.date);
    this.view = publication.view;
    this.type = publication.type;
    this.body = publication.body;
    this.file = publication.file;
    this.tag = publication.tags.map((tag) => new DBTagDto(tag));
    this.comments =
      publication.comments?.map((comment) =>
        DbCommentDto.dtoFromComment(comment),
      ) || [];
    this.user = DbUserDto.dtoFromUser(publication.user);
  }
}

export class DbPublicationBuilder {
  private dto: DbPublicationDto;

  id(id: number) {
    this.dto.id = id;
    return this;
  }

  date(date: string) {
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
        .date(parseDateToString(publication.date))
        .view(publication.view)
        .type(publication.type)
        .file(publication.file)
        .build(),
    );
  }
}
