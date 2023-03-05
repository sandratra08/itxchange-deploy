import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { DetaService } from './deta.service';

@Controller('deta')
@ApiTags('Deta')
export class DetaController {
  constructor(private readonly detaService: DetaService) {}
  @Get('publications/:filename')
  async getPublicationImage(@Param('filename') filename: string) {
    const buffer = await this.detaService.downloadPublicationFile(filename);
    return new StreamableFile(buffer);
  }

  @Get('users/:filename')
  async getUserImage(@Param('filename') filename: string) {
    const buffer = await this.detaService.downloadUserFile(filename);
    return new StreamableFile(buffer);
  }
}
