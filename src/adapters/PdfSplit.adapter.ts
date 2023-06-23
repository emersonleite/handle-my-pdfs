import { PdfSplit } from 'src/utils/PdfSplit';
import { PdfHandleAdapter } from './pdfHandleAdapter';
import { IPageInterval } from 'src/interfaces/IPageInterval';

export class PdfSplitAdapter extends PdfHandleAdapter {
  private adapter: PdfSplit;

  constructor(pdfFile: File, pageInterval: IPageInterval[]) {
    super();
    this.adapter = new PdfSplit(pdfFile, pageInterval);
  }

  async handlePdf(): Promise<void> {
    return this.adapter.handlePdf();
  }

  async getFileAsBlob(): Promise<Blob | null> {
    await this.handlePdf();
    return await this.adapter.getFileAsBlob();
  }
}
