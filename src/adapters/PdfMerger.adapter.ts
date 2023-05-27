import { PdfMerger } from 'src/utils/PdfMerger';

export class PdfMergerAdapter {
  private adapter: PdfMerger;

  constructor(filesList: File[], outputFileName: string) {
    this.adapter = new PdfMerger(filesList, outputFileName);
  }

  async addPdfFile() {
    await this.adapter.addPdfFile();
  }

  async saveAsBlob(): Promise<Blob> {
    return await this.adapter.saveAsBlob();
  }
}
