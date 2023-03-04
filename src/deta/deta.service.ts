import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Deta } from 'deta';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DetaService {
  private deta: any;

  constructor(private configService: ConfigService) {
    this.deta = Deta(this.configService.get<string>('DETA_PROJECT_KEY'));
  }

  getUserDrive() {
    return this.deta.Drive('user-drive');
  }

  getPublicationDrive() {
    return this.deta.Drive('ticket-piece');
  }

  async uploadUserFile(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = this.getUniqueFileName(filename);
    const drive = this.getUserDrive();
    try {
      await drive.put(uniqueFilename, { data });
    } catch {}
    return uniqueFilename;
  }

  async deleteUserFile(filename: string): Promise<void> {
    const drive = this.getUserDrive();
    try {
      await drive.delete(filename);
    } catch {}
  }

  async downloadUserFile(filename: string): Promise<Buffer> {
    try {
      const img = await this.getUserDrive().get(filename);
      const buffer = await img.arrayBuffer();
      return Buffer.from(buffer);
    } catch {}
    return null;
  }

  async uploadPublicationFile(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = this.getUniqueFileName(filename);
    const drive = this.getPublicationDrive();
    try {
      await drive.put(uniqueFilename, { data });
    } catch {}
    return uniqueFilename;
  }

  async deletePublicationFile(filename: string): Promise<void> {
    const drive = this.getPublicationDrive();
    try {
      await drive.delete(filename);
    } catch {}
  }

  async downloadPublicationFile(filename: string): Promise<Buffer> {
    try {
      const img = await this.getPublicationDrive().get(filename);
      const buffer = await img.arrayBuffer();
      return Buffer.from(buffer);
    } catch {}
    return null;
  }

  private getUniqueFileName(filename: string): string {
    return `${uuidv4()}-${filename}`;
  }
}
