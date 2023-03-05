import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from 'src/publication/entities/publication.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { In, Repository } from 'typeorm';
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

  async bulkCreate(data: string[]) {
    const instances = data.map((tag) => {
      const instance = new Tag();
      instance.name = tag;
      return instance;
    });
    const tags = await this.tagsRepository.save(instances);
    return tags;
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

  async findTagById(pub: Publication, values: string[]) {
    const tags = await this.tagsRepository.find({
      where: {
        publications: {
          id: pub.id,
        },
      },
    });

    return values.filter((value) => tags.find((tag) => tag.name !== value));
  }

  async cleanBeforeInsert(values: string[]) {
    const tags = await this.getTagsByName(values);
    const tag_names = tags.map((tag) => tag.name);
    const result = {
      in: [],
      notIn: [],
    };
    values.forEach((value) => {
      if (tag_names.includes(value)) {
        result.in.push(value);
      } else {
        result.notIn.push(value);
      }
    });
    return result;
  }

  async getTagsByName(values: string[]) {
    return this.tagsRepository.find({
      where: {
        name: In([...values]),
      },
    });
  }
}
