import { PDFDocument } from 'pdf-lib';

export class PdfRemove {
  private fileAsBlob: Blob;

  private pagesToRemove: number[];

  constructor(pdfFile: File, pagesToRemove: number[]) {
    this.fileAsBlob = new Blob([pdfFile], { type: 'application/pdf' });

    this.pagesToRemove = pagesToRemove.sort((a, b) => b - a);
  }

  async removePage() {
    try {
      const fileAsArrayBuffer = await this.fileAsBlob.arrayBuffer();

      const documentToRemovePages = await PDFDocument.load(fileAsArrayBuffer);

      for (const page of this.pagesToRemove) {
        documentToRemovePages.removePage(page);
      }

      const newDocument = await documentToRemovePages.save();

      this.fileAsBlob = new Blob([newDocument.buffer], {
        type: 'application/pdf',
      });
    } catch (err) {
      console.log(err);
    }
  }

  async saveAsBlob(): Promise<Blob> {
    return this.fileAsBlob;
  }
}
