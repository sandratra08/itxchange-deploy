import { TagModule } from './../tag/tag.module';
import { DetaModule } from './../deta/deta.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Publication } from './entities/publication.entity';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { PublicationRepository } from './publication.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Publication]),
    DetaModule,
    TagModule,
  ],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports: [PublicationService, PublicationRepository],
})
export class PublicationModule {}
