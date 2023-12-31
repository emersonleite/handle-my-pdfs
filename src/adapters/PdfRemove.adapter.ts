import { PdfRemove } from 'src/utils/PdfRemove';
import { PdfHandleAdapter } from './pdfHandleAdapter';
import { IPageInterval } from 'src/interfaces/IPageInterval';

export class PdfRemoveAdapter extends PdfHandleAdapter {
  private adapter: PdfRemove;

  constructor(pdfFile: File, pageInterval: IPageInterval[]) {
    super();
    this.adapter = new PdfRemove(pdfFile, pageInterval);
  }

  async handlePdf(): Promise<void> {
    return this.adapter.handlePdf();
  }

  async getFileAsBlob(): Promise<Blob | null> {
    await this.handlePdf();
    return await this.adapter.getFileAsBlob();
  }
}
