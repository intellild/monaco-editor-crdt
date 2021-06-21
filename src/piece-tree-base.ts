import { CharCode } from "./char-code";

export interface IBufferCursor {
  /**
   * Line number in current buffer
   */
  line: number;
  /**
   * Column number in current buffer
   */
  column: number;
}

export class Piece {
  constructor(
    readonly bufferIndex: number,
    readonly start: IBufferCursor,
    readonly end: IBufferCursor,
    readonly lineFeedCnt: number,
    readonly length: number
  ) {}
}

export function createLineStarts(str: string) {
  const lineStarts: number[] = [0];
  const len = str.length;
  for (let i = 0; i < len; i += 1) {
    const char = str.charCodeAt(i);

    if (char === CharCode.CarriageReturn) {
      if (i + 1 < len && str.charCodeAt(i + 1) === CharCode.LineFeed) {
        lineStarts.push(i + 2);
        i += 1;
      } else {
        lineStarts.push(i + 1);
      }
    } else if (char === CharCode.LineFeed) {
      lineStarts.push(i + 1);
    }
  }
  return lineStarts;
}

export class StringBuffer {
  buffer: string;
  lineStarts: Uint32Array | Uint16Array | number[];

  constructor(
    buffer: string,
    lineStarts: Uint32Array | Uint16Array | number[]
  ) {
    this.buffer = buffer;
    this.lineStarts = lineStarts;
  }
}
