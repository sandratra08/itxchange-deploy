import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from 'src/publication/entities/publication.entity';
import { PublicationService } from 'src/publication/publication.service';
import { Reaction } from 'src/reaction/entities/reaction.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { DbReactionDto } from './dto/db-reaction.dto';
import { ReactionBuilder } from './entities/reaction.entity';

@Injectable()
export class ReactionService {
  constructor(
    private usersService: UsersService,
    private publicationsService: PublicationService,
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
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
    let reaction = ReactionBuilder.builder()
      .publication(publication)
      .user(db_user)
      .build();

    reaction = await this.reactionsRepository.save(reaction);

    return new DbReactionDto(reaction);
  }

  async findAll() {
    const reactions = await this.reactionsRepository.find();
    return reactions.map((reaction) => new DbReactionDto(reaction));
  }

  async findAllByPublication(publication_id: number) {
    const reactions = await this.reactionsRepository.find({
      where: {
        publication: {
          id: publication_id,
        },
      },
    });
    return reactions.map((reaction) => new DbReactionDto(reaction));
  }

  async findOne(id: number) {
    const reaction = await this.reactionsRepository.findOne({ where: { id } });
    return new DbReactionDto(reaction);
  }

  async remove(user: User, id: number) {
    const reaction = await this.reactionsRepository.findOne({
      where: {
        user: {
          id: user.id,
        },
        id,
      },
    });
    if (!reaction) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Publication not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.reactionsRepository.delete(id);
  }
}
