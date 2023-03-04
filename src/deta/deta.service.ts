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

  getClientDrive() {
    return this.deta.Drive('client-photo');
  }

  getPieceDrive() {
    return this.deta.Drive('ticket-piece');
  }

  async uploadClientFile(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = this.getUniqueFileName(filename);
    const drive = this.getClientDrive();
    try {
      await drive.put(uniqueFilename, { data });
    } catch {}
    return uniqueFilename;
  }

  async deleteClientFile(filename: string): Promise<void> {
    const drive = this.getClientDrive();
    try {
      await drive.delete(filename);
    } catch {}
  }

  async downloadClientFile(filename: string): Promise<Buffer> {
    try {
      const img = await this.getClientDrive().get(filename);
      const buffer = await img.arrayBuffer();
      return Buffer.from(buffer);
    } catch {}
    return null;
  }

  async uploadPieceFile(filename: string, data: Buffer): Promise<string> {
    const uniqueFilename = this.getUniqueFileName(filename);
    const drive = this.getPieceDrive();
    try {
      await drive.put(uniqueFilename, { data });
    } catch {}
    return uniqueFilename;
  }

  async deletePieceFile(filename: string): Promise<void> {
    const drive = this.getPieceDrive();
    try {
      await drive.delete(filename);
    } catch {}
  }

  async downloadPieceFile(filename: string): Promise<Buffer> {
    try {
      const img = await this.getPieceDrive().get(filename);
      const buffer = await img.arrayBuffer();
      return Buffer.from(buffer);
    } catch {}
    return null;
  }

  private getUniqueFileName(filename: string): string {
    return `${uuidv4()}-${filename}`;
  }
}
