import { PdfMerger } from 'src/utils/PdfMerger';
/* import { PdfMergerSubstitute as PdfMerger } from 'src/utils/PdfMerger'; */
import { PdfHandleAdapter } from './pdfHandleAdapter';

export class PdfMergerAdapter extends PdfHandleAdapter {
  private adapter: PdfMerger;

  constructor(filesList: File[]) {
    super();
    this.adapter = new PdfMerger(filesList);
  }

  async handlePdf(): Promise<void> {
    await this.adapter.handlePdf();
  }

  async getFileAsBlob(): Promise<Blob | null> {
    await this.handlePdf();
    return await this.adapter.getFileAsBlob();
  }
}
