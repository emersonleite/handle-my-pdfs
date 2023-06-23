import { HandlePdf } from './HandlePdf';
import { PDFDocument } from 'pdf-lib';
import JsZip from 'jszip';

export class PdfSplit extends HandlePdf {
  subDocumentListAsBlob: Blob[] = [];

  async getSubDocumentList(): Promise<PDFDocument[]> {
    try {
      const fileAsArrayBuffer = await this.fileAsBlob.arrayBuffer();

      const documentToRemovePages = await PDFDocument.load(fileAsArrayBuffer);

      const subDocumentList: PDFDocument[] = [];

      for (const page of this.pageInterval) {
        const subDocument = await PDFDocument.create();

        let pageToAdd = page.start;
        while (pageToAdd <= page.end) {
          const [copiedPage] = await subDocument.copyPages(
            documentToRemovePages,
            [pageToAdd]
          );

          subDocument.addPage(copiedPage);
          pageToAdd++;
        }

        subDocumentList.push(subDocument);
      }

      return subDocumentList;
    } catch (err) {
      console.error(err);
    }
    return [];
  }

  async convertSubDocumentListToUint8Array(
    subDocumentList: PDFDocument[]
  ): Promise<Uint8Array[]> {
    const listOfDocuments = [];
    for (const subDocument of subDocumentList) {
      const convertedSubDocument = await subDocument.save();
      listOfDocuments.push(convertedSubDocument);
    }

    return listOfDocuments;
  }

  async convertSubDocumentListToBlob(
    subDocumentList: Uint8Array[]
  ): Promise<Blob[]> {
    const listOfDocuments = [];
    for (const subDocument of subDocumentList) {
      const convertedSubDocumentToBlob = new Blob([subDocument.buffer], {
        type: 'application/pdf',
      });
      listOfDocuments.push(convertedSubDocumentToBlob);
    }

    return listOfDocuments;
  }

  async handlePdf() {
    const handlePdfFiles = await this.getSubDocumentList();

    const subDocumentListAsUint8Array =
      await this.convertSubDocumentListToUint8Array(handlePdfFiles);

    this.subDocumentListAsBlob = await this.convertSubDocumentListToBlob(
      subDocumentListAsUint8Array
    );
  }

  async getFileAsBlob() {
    await this.handlePdf();

    const zip = JsZip();

    try {
      for (const file of this.subDocumentListAsBlob) {
        zip.file(`file-${Math.random()}.pdf`, file);
      }

      const fileAsBlob = await zip.generateAsync({ type: 'blob' });

      return fileAsBlob;
    } catch (err) {
      console.error(err);
    }

    return null;
  }
}
