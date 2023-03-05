import { Module } from '@nestjs/common';
import { PublicationModule } from 'src/publication/publication.module';
import { UsersModule } from 'src/users/users.module';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';

@Module({
  imports: [UsersModule, PublicationModule],
  controllers: [ReactionController],
  providers: [ReactionService],
  exports: [ReactionModule],
})
export class ReactionModule {}
