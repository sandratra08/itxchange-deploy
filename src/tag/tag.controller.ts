import { ApiTags } from '@nestjs/swagger';
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
import { ParseEntityPipe } from './../utils/validators/validation.pipes';
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
  findOne(@Param('id', ParseEntityPipe) tag: Tag) {
    return this.tagService.findOne(tag);
  }

  @Patch(':id')
  update(@Param('id') tag: Tag, @Body() updateTagDto: BaseTagDto) {
    return this.tagService.update(tag, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') tag: Tag) {
    return this.tagService.remove(tag);
  }
}
