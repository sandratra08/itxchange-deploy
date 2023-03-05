import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Publication } from 'src/publication/entities/publication.entity';
import { PublicationService } from 'src/publication/publication.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { DbPublicationDto } from './../publication/dto/db-publication.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class ReactionService {
  constructor(
    private usersService: UsersService,
    private publicationsService: PublicationService,
  ) {}

  async create(user: User, dto: CreateReactionDto) {
    const db_user = await this.usersService.findOne({
      id: user.id,
    });

    const publication: Publication = await this.publicationsService.findById(
      dto.publication_id,
    );

    if (!publication) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Publication not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    publication.interactors.push(db_user);
    publication.total_interactions += 1;

    await this.publicationsService.createInteraction(publication);
    return new DbPublicationDto(publication);
  }

  findAllByPublication(publication_id: number) {
    return this.publicationsService.findById(publication_id);
  }

  async remove(user: User, publication_id: number) {
    const publication = await this.publicationsService.findByInteractor(
      user.id,
      publication_id,
    );
    if (!publication) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Publication not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    publication.interactors = publication.interactors.filter(
      (interactor) => interactor.id !== user.id,
    );
    await this.publicationsService.removeInteraction(publication);
  }
}
