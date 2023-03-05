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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Publication } from 'src/publication/entities/publication.entity';
import { ParseEntityPipe } from './../utils/validators/validation.pipes';
import { CommentsService } from './comments.service';
import { BaseCommentDto, CreateCommentDto } from './dto/base-comment.dto';
import { Comments } from './entities/comment.entity';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user, createCommentDto);
  }

  @Get(':publication_id')
  @ApiParam({
    name: 'publication_id',
    required: true,
    type: 'number',
  })
  findAll(@Param('publication_id', ParseEntityPipe) publication: Publication) {
    return this.commentsService.findAllByPublication(publication.id);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  findOne(@Param('id') comment: Comments) {
    return this.commentsService.findOne(comment);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  update(
    @Param('id') comment: Comments,
    @Body() updateCommentDto: BaseCommentDto,
  ) {
    return this.commentsService.update(comment, updateCommentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  remove(@Param('id') comment: Comments) {
    return this.commentsService.remove(comment);
  }
}
