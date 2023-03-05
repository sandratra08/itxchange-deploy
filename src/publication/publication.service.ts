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

    const data = await this.tagService.cleanBeforeInsert(dto.tags);
    let tags = await this.tagService.bulkCreate(data.notIn);

    const tags_in = await this.tagService.getTagsByName(data.in);
    tags = tags.concat(tags_in);

    const filename = await this.detaModule.uploadPublicationFile(
      file.originalname,
      file.buffer,
    );

    let publication = PublicationBuilder.builder()
      .user(user)
      .file(filename)
      .body(dto.body)
      .type(dto.type)
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

  findById(publication_id: number): Publication | PromiseLike<Publication> {
    return this.publicationsRepository.findOne({ id: publication_id });
  }

  findByInteractor(
    id: number,
    publication_id: number,
  ): Publication | PromiseLike<Publication> {
    return this.publicationsRepository.findOne({
      id: publication_id,
      interactors: {
        id,
      },
    });
  }

  createInteraction(publication: Publication) {
    return this.publicationsRepository.save(publication);
  }

  async removeInteraction(publication: Publication) {
    await this.publicationsRepository.update(publication.id, publication);
  }
}
