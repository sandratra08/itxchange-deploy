import { DbPublicationDto } from './dto/db-publication.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PublicationService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  create(user: User, dto: CreatePublicationDto): Promise<DbPublicationDto> {
    console.log(user);
    console.log(dto);
    return null;
  }

  async findAll(): Promise<DbPublicationDto[]> {
    const data = await this.publicationRepository.find();
    return DbPublicationDto.fromPublications(data);
  }

  async findOne(id: number): Promise<DbPublicationDto> {
    const data = await this.publicationRepository.findOneBy({ id });
    return DbPublicationDto.fromPublication(data);
  }

  update(id: number, dto: UpdatePublicationDto) {
    console.log(dto);
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
