import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { PublicationRepository } from './../publication/publication.repository';
import {
  BaseCommentDto,
  CreateCommentDto,
  DbCommentDto,
} from './dto/base-comment.dto';
import { CommentBuilder, Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private publicationsRepository: PublicationRepository,
    private readonly usersService: UsersService,
    @InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
  ) {}

  async create(user: User, dto: CreateCommentDto) {
    const user_db = await this.usersService.findOne({ id: user.id });

    const publication = await this.publicationsRepository.findOne({
      id: dto.publication_id,
    });

    let comment = CommentBuilder.builder()
      .user(user_db)
      .content(dto.content)
      .publication(publication)
      .build();

    comment = await this.commentsRepository.save(comment);
    return DbCommentDto.dtoFromComment(comment);
  }

  async findAllByPublication(id: number) {
    const comments = await this.commentsRepository.find({
      where: {
        publication: {
          id,
        },
      },
    });
    return DbCommentDto.arrayDtoFromComments(comments);
  }

  findOne(comment: Comments) {
    return DbCommentDto.dtoFromComment(comment);
  }

  async update(comment: Comments, dto: BaseCommentDto) {
    comment.content = dto.content;
    comment = await this.commentsRepository.save(comment);
    return DbCommentDto.dtoFromComment(comment);
  }

  async remove(comment: Comments) {
    await this.commentsRepository.delete(comment.id);
  }
}
