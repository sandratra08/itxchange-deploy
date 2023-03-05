import { ApiTags, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
} from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionService } from './reaction.service';

@Controller('reaction')
@ApiTags('Reaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  async create(
    @Request() request: any,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    await this.reactionService.create(request, createReactionDto);
  }

  @Get('publications/:id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  findAllByPublication(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.findAllByPublication(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.reactionService.remove(req.user, id);
  }
}
