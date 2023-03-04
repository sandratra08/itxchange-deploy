import { Publication } from '../entities/publication.entity';

export class DbPublicationDto {
  id: number;
  date: Date;
  view: number;
  type: string;
  body: string;
  file: string;

  static fromPublication(data: Publication): DbPublicationDto {
    const dto = new DbPublicationDto();
    dto.id = data.id;
    dto.body = data.body;
    dto.date = data?.date;
    dto.file = data.file;
    dto.view = data.view;
    dto.type = data.type;
    return dto;
  }

  static fromPublications(publications: Publication[]): DbPublicationDto[] {
    return publications.map((item) => this.fromPublication(item));
  }
}
