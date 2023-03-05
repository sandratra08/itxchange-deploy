import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from 'src/publication/entities/publication.entity';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationRepository {
  constructor(
    @InjectRepository(Publication)
    private publicationsRepository: Repository<Publication>,
  ) {}

  async save(publication: Publication) {
    return this.publicationsRepository.save(publication);
  }

  findAll() {
    return this.publicationsRepository.find({
      relations: ['tags', 'user', 'comments'],
    });
  }

  findOne(fields: EntityCondition<Publication>) {
    return this.publicationsRepository.findOne({
      where: fields,
      relations: ['tags', 'user', 'comments'],
    });
  }

  filter(fields: EntityCondition<Publication>) {
    return this.publicationsRepository.find({
      where: fields,
      relations: ['tags', 'user', 'comments'],
    });
  }

  update(id: number, pub: Publication) {
    return this.publicationsRepository.update(id, pub);
  }

  delete(id: number) {
    return this.publicationsRepository.delete(id);
  }
}
