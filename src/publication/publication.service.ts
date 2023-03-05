import {
  HttpException,
  HttpStatus,
  Injectable,
  UploadedFile,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DetaService } from './../deta/deta.service';
import { TagService } from './../tag/tag.service';
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
    private publicationsRepository: PublicationRepository,
    private readonly detaModule: DetaService,
    private readonly tagService: TagService,
  ) {}

  async create(
    user: User,
    dto: CreatePublicationDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DbPublicationDto> {
    user = await this.usersService.findOne({
      id: user.id,
    });

    const tags = await this.tagService.bulkCreate(dto.tags);

    const filename = await this.detaModule.uploadPublicationFile(
      file.originalname,
      file.buffer,
    );

    let publication = PublicationBuilder.builder()
      .user(user)
      .file(filename)
      .body(dto.body)
      .tags(tags)
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
    const values = await this.tagService.findTagById(publication, dto.tags);

    const tags = await this.tagService.bulkCreate(values);

    publication = PublicationBuilder.getBuilder(publication)
      .body(dto.body)
      .tags(tags)
      .build();

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
