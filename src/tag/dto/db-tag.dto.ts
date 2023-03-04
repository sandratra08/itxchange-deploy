import { Tag } from 'src/tag/entities/tag.entity';
export class DBTagDto {
  id: number;
  name: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }
}
