import { IPageInterval } from 'src/interfaces/IPageInterval';

export abstract class HandlePdf {
  protected fileAsBlob: Blob;

  protected pageInterval: IPageInterval[];

  constructor(pdfFile: File, pageInterval: IPageInterval[]) {
    this.fileAsBlob = new Blob([pdfFile], { type: 'application/pdf' });

    this.pageInterval = pageInterval
      .sort((a, b) => b.end - a.end)
      .map((item) => {
        return { start: item.start - 1, end: item.end - 1 };
      });
  }

  abstract handlePdf?(): Promise<void>;

  abstract getFileAsBlob?(): Promise<Blob | null>;
}
