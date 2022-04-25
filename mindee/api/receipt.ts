import { APIObject } from "./object";
import { Input } from "../inputs";

interface ReceiptParseProps {
  input: string;
  inputType: string;
  filename: string | undefined;
  version: string;
  cutPdf: boolean;
  includeWords: boolean;
}

export class APIReceipt extends APIObject {
  baseUrl: string;

  constructor(public apiToken: string | undefined = undefined) {
    super(apiToken, "receipt");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TO DO : FIX
    this.baseUrl = `${this.baseUrl}/expense_receipts/`;
  }

  /**
   * @param {String} file: Receipt filepath (allowed jpg, png, tiff, pdf)
   * @param {String} inputType: String in {'path', 'stream', 'base64'}
   * @param {Boolean} includeWords: extract all words into http_response
   * @param {String} version: expense_receipt api version
   * @param {Boolean} cutPdf: Automatically reconstruct pdf with more than 4 pages
   * @returns {Response} Wrapped response with Receipts objects parsed
   */
  async parse({
    input,
    inputType = "path",
    filename = undefined,
    version = "3",
    cutPdf = true,
    includeWords = false,
  }: ReceiptParseProps) {
    super.parse();
    const inputFile = new Input(input, inputType, cutPdf, filename);
    await inputFile.init();
    const url = `v${version}/predict`;
    return await super._request(url, inputFile, includeWords);
  }
}
