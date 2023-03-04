import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from '@/publication/entities/publication.entity';
import { User } from '@/users/entities/user.entity';
import { Reaction } from './entities/reaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, User, Publication])],
  controllers: [ReactionsController],
  providers: [ReactionsService],
})
export class ReactionsModule {}
