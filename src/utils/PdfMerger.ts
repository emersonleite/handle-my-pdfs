import PDFMerger from 'pdf-merger-js/browser';
import { PDFDocument } from 'pdf-lib';

export class PdfMerger {
  private filesList: File[] = [];

  private merger = new PDFMerger();

  constructor(filesList: File[]) {
    this.filesList = filesList;
  }

  async handlePdf(): Promise<void> {
    const PdfMerger = new PDFMerger();

    for (const file of this.filesList) {
      await PdfMerger.add(file);
    }
    this.merger = PdfMerger;
  }

  async getFileAsBlob(): Promise<Blob> {
    return await this.merger.saveAsBlob();
  }
}

export class PdfMergerSubstitute {
  private filesList: File[] = [];

  fileAsUint8Array: Uint8Array | null = null;

  constructor(filesList: File[]) {
    this.filesList = filesList;
  }

  async handlePdf(): Promise<void> {
    try {
      const newDocument = await PDFDocument.create();

      for (const file of this.filesList) {
        const fileAsArrayBuffer = await file.arrayBuffer();
        const fileAsPDFDocument = await PDFDocument.load(fileAsArrayBuffer);

        const pagesArray = await newDocument.copyPages(
          fileAsPDFDocument,
          fileAsPDFDocument.getPageIndices()
        );

        for (const page of pagesArray) {
          newDocument.addPage(page);
        }

        this.fileAsUint8Array = await newDocument.save();
      }
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
