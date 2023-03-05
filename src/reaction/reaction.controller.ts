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
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  create(
    @Request() request: any,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.reactionService.create(request, createReactionDto);
  }

  @Get()
  findAll() {
    return this.reactionService.findAll();
  }

  @Get('publications/:id')
  findAllByPublication(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.findAllByPublication(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reactionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.reactionService.remove(req.user, id);
  }
}
