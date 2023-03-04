import { Publication } from '@/publication/entities/publication.entity';
import { User } from '@/users/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { DbReactionDto } from './dto/db-reactions';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction } from './entities/reaction.entity';

@Injectable()
export class ReactionsService {
  rolesRepository: any;
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Publication)
    private publicationRepository: Repository<Publication>,
  ) {}

  async create(
    @Request() users: any,
    dto: CreateReactionDto,
  ): Promise<DbReactionDto> {
    const user = this.userRepository.findOne({
      where: { id: users.id },
    });
    if (!user) throw new NotFoundException(`${User.name} Not Found`);

    const publication = await this.publicationRepository.findOne({
      where: { id: dto.publication_id },
    });
    if (!publication)
      throw new NotFoundException(`${Publication.name} Not Found`);

    const data = await this.reactionRepository.save(Reaction.fromDto(dto));

    return DbReactionDto.fromReaction(data);
  }

  async findAll(): Promise<DbReactionDto[]> {
    const data = await this.reactionRepository.find();
    return DbReactionDto.fromReactions(data);
  }

  async findOne(id: number): Promise<DbReactionDto> {
    const data = await this.reactionRepository.findOne({
      where: { id },
    });
    return DbReactionDto.fromReaction(data);
  }

  async update(reaction: Reaction, dto: UpdateReactionDto) {
    if (reaction.name !== dto.name && (await this.reactionExists(dto.name))) {
      throw new BadRequestException('Reaction already exists');
    }
    reaction.update(dto);
    const update = await this.reactionRepository.update(reaction.id, reaction);
    return update;
  }

  async reactionExists(name: string): Promise<boolean> {
    const role = await this.reactionRepository.findOne({ where: { name } });
    return role !== null;
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
