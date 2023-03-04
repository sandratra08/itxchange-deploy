import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Publication } from 'src/publication/entities/publication.entity';
import { ParseEntityPipe } from './../utils/validators/validation.pipes';
import { CommentsService } from './comments.service';
import { BaseCommentDto, CreateCommentDto } from './dto/base-comment.dto';
import { Comments } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user, createCommentDto);
  }

  @Get(':publication_id')
  findAll(@Param('publication_id', ParseEntityPipe) publication: Publication) {
    return this.commentsService.findAllByPublication(publication.id);
  }

  @Get(':id')
  findOne(@Param('id') comment: Comments) {
    return this.commentsService.findOne(comment);
  }

  @Patch(':id')
  update(
    @Param('id') comment: Comments,
    @Body() updateCommentDto: BaseCommentDto,
  ) {
    return this.commentsService.update(comment, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') comment: Comments) {
    return this.commentsService.remove(comment);
  }
}
