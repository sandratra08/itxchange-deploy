import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction } from './entities/reaction.entity';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DbReactionDto } from './dto/db-reactions';
import { AuthGuard } from '@nestjs/passport';

@Controller('reactions')
@ApiTags('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @ApiOkResponse({
    type: CreateReactionDto,
    status: HttpStatus.CREATED,
  })
  create(@Request() user: any, @Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(user, createReactionDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: Array<DbReactionDto>,
    status: HttpStatus.OK,
  })
  findAll(): Promise<DbReactionDto[]> {
    return this.reactionsService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiOkResponse({
    type: DbReactionDto,
    status: HttpStatus.OK,
  })
  findOne(@Param('id') id: number): Promise<DbReactionDto> {
    return this.reactionsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) reaction: Reaction,
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionsService.update(reaction, updateReactionDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reactionsService.remove(id);
  }
}
