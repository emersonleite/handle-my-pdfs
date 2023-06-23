import { PDFDocument } from 'pdf-lib';
import { IPageInterval } from 'src/interfaces/IPageInterval';
import { HandlePdf } from './HandlePdf';

export class PdfRemove extends HandlePdf {
  fileAsUint8Array: Uint8Array | null = null;

  constructor(pdfFile: File, pageInterval: IPageInterval[]) {
    super(pdfFile, pageInterval);
  }

  async handlePdf(): Promise<void> {
    try {
      const fileAsArrayBuffer = await this.fileAsBlob.arrayBuffer();

      const documentToRemovePages = await PDFDocument.load(fileAsArrayBuffer);

      for (const page of this.pageInterval) {
        let pageToRemove = page.end;
        while (pageToRemove >= page.start) {
          documentToRemovePages.removePage(pageToRemove);
          pageToRemove--;
        }
      }

      this.fileAsUint8Array = await documentToRemovePages.save();
    } catch (err) {
      console.error(err);
    }
  }

  async getFileAsBlob(): Promise<Blob | null> {
    if (this.fileAsUint8Array) {
      return new Blob([this.fileAsUint8Array.buffer], {
        type: 'application/pdf',
      });
    }
    return null;
  }
}
