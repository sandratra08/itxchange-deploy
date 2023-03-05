import { ApiTags, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  ParseEntityPipe,
  ValidationPipe,
} from './../utils/validators/validation.pipes';
import { BaseTagDto } from './dto/base-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  findOne(@Param('id', ParseEntityPipe) tag: Tag) {
    return this.tagService.findOne(tag);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  update(
    @Param('id') tag: Tag,
    @Body(ValidationPipe) updateTagDto: BaseTagDto,
  ) {
    return this.tagService.update(tag, updateTagDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  remove(@Param('id') tag: Tag) {
    return this.tagService.remove(tag);
  }
}
