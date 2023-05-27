import { PdfRemove } from 'src/utils/PdfRemove';

export class PdfRemoveAdapter {
  private adapter: PdfRemove;

  constructor(pdfFile: File, pagesToRemove: number[]) {
    this.adapter = new PdfRemove(pdfFile, pagesToRemove);
  }

  async removePage() {
    return this.adapter.removePage();
  }

  async saveAsBlob() {
    return this.adapter.saveAsBlob();
  }
}
