import { DbPublicationDto } from './dto/db-publication.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
  constructor(private usersService: UsersService) {}

  create(user: User, dto: CreatePublicationDto): Promise<DbPublicationDto> {
    console.log(user);
    console.log(dto);
    return null;
  }

  findAll() {
    return `This action returns all publication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, dto: UpdatePublicationDto) {
    console.log(dto);
    return `This action updates a #${id} publication`;
  }

  remove(id: number) {
    return `This action removes a #${id} publication`;
  }
}
