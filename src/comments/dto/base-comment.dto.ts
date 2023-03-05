import { Min, MinLength } from 'class-validator';
import { Comments } from './../entities/comment.entity';
import * as moment from 'moment';

export class BaseCommentDto {
  @MinLength(2)
  content: string;
  @Min(2)
  publication_id: number;
}
export class CreateCommentDto extends BaseCommentDto {}

export class DbCommentDto {
  content: string;
  createdAt: string;
  updatedAt: string;

  static dtoFromComment(comment: Comments) {
    const db = new DbCommentDto();
    db.content = comment.content;
    db.createdAt = moment(comment.createdAt).format('DD/MM/YYYY hh:mm');
    db.updatedAt = moment(comment.updatedAt).format('DD/MM/YYYY hh:mm');
    return db;
  }

  static arrayDtoFromComments(comments: Comments[]) {
    return comments.map((comment) => this.dtoFromComment(comment));
  }
}
