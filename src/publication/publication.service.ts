import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { DetaService } from './../deta/deta.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import {
  DbPublicationBuilder,
  DbPublicationDto,
} from './dto/db-publication.dto';
import { Publication, PublicationBuilder } from './entities/publication.entity';
import { PublicationRepository } from './publication.repository';

@Injectable()
export class PublicationService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Publication)
    private publicationsRepository: PublicationRepository,
    private readonly detaModule: DetaService,
    private publicationRepository: Repository<Publication>,
  ) {}

  async create(
    user: User,
    dto: CreatePublicationDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DbPublicationDto> {
    user = await this.usersService.findOne({
      id: user.id,
    });

    const filename = await this.detaModule.uploadPublicationFile(
      file.originalname,
      file.buffer,
    );

    let publication = PublicationBuilder.builder()
      .user(user)
      .file(filename)
      .body(dto.body)
      .build();

    publication = await this.publicationsRepository.save(publication);
    return new DbPublicationDto(publication);
  }

  async findAll() {
    const publications = await this.publicationsRepository.findAll();
    return DbPublicationBuilder.getArrayFromBuild(publications);
  }

  async findByUserId(id: number) {
    const publications = await this.publicationsRepository.filter({
      user: { id },
    });
    return DbPublicationBuilder.getArrayFromBuild(publications);
  }

  findOne(publication: Publication) {
    return new DbPublicationDto(publication);
  }

  async update(
    user: User,
    publication: Publication,
    dto: CreatePublicationDto,
  ) {
    await this.findUserPublicationOrThrow(user);
    publication.body = dto.body;
    await this.publicationsRepository.update(publication.id, publication);
    return new DbPublicationDto(publication);
  }

  async remove(user: User, id: number) {
    await this.findUserPublicationOrThrow(user);
    await this.publicationsRepository.delete(id);
  }

  async findUserPublicationOrThrow(user: User) {
    const user_pub = await this.publicationsRepository.findOne({
      user: {
        id: user.id,
      },
    });

    if (!user_pub) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: `notAuthorized`,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
