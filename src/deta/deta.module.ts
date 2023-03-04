import { Module } from '@nestjs/common';
import { DetaController } from './deta.controller';
import { DetaService } from './deta.service';

@Module({
  controllers: [DetaController],
  providers: [DetaService],
  exports: [DetaService],
})
export class DetaModule {}
