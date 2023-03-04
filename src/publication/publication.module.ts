import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Publication, User])],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
