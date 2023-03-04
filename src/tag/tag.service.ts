import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tag/entities/tag.entity';
import { Repository } from 'typeorm';
import { BaseTagDto } from './dto/base-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { DBTagDto } from './dto/db-tag.dto';
import { TagBuilder } from './entities/tag.entity';

@Injectable()
export class TagService {
  @InjectRepository(Tag)
  private tagsRepository: Repository<Tag>;

  async create(dto: CreateTagDto) {
    let tag = await this.tagsRepository.findOne({
      where: {
        name: dto.name,
      },
    });

    if (!tag) {
      tag = TagBuilder.builder().name(dto.name).build();
      tag = await this.tagsRepository.save(tag);
    }

    return new DBTagDto(tag);
  }

  async findAll() {
    const tags = await this.tagsRepository.find();
    return tags.map((tag) => new DBTagDto(tag));
  }

  findOne(tag: Tag) {
    return new DBTagDto(tag);
  }

  async update(tag: Tag, updateTagDto: BaseTagDto) {
    tag.name = updateTagDto.name;
    tag = await this.tagsRepository.save(tag);
    return new DBTagDto(tag);
  }

  async remove(tag: Tag) {
    await this.tagsRepository.delete(tag.id);
  }
}
