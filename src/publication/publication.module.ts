import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';

@Module({
  imports: [UsersModule],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
