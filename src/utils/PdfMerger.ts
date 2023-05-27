import PDFMerger from 'pdf-merger-js/browser';

export class PdfMerger {
  private filesList: File[] = [];

  private outputFileName = '';

  private merger = new PDFMerger();

  constructor(filesList: File[], outputFileName: string) {
    this.filesList = filesList;
    this.outputFileName = outputFileName;
  }

  async addPdfFile() {
    for (const file of this.filesList) {
      await this.merger.add(file);
    }
    return this.merger;
  }

  async saveAsBlob(): Promise<Blob> {
    return await this.merger.saveAsBlob();
  }
}
