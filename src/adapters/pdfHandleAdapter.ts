export abstract class PdfHandleAdapter {
  abstract handlePdf(): Promise<void>;

  abstract getFileAsBlob(): Promise<Blob | null>;
}
