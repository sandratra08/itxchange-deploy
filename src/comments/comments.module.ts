import { Comments } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PublicationModule } from './../publication/publication.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    PublicationModule,
    UsersModule,
    TypeOrmModule.forFeature([Comments]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
