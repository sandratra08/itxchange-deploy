import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { UsersModule } from 'src/users/users.module';
import { PublicationModule } from 'src/publication/publication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';

@Module({
  imports: [
    UsersModule,
    PublicationModule,
    TypeOrmModule.forFeature([Reaction]),
  ],
  controllers: [ReactionController],
  providers: [ReactionService],
  exports: [ReactionModule],
})
export class ReactionModule {}
