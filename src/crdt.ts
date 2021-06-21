import { normalizeEOL } from "@/utils";
import { createLineStarts, Piece, StringBuffer } from "./piece-tree-base";
import { ITree, SENTINEL, TreeNode } from "./rb-tree";

class TextBuffer implements ITree {
  root: TreeNode = SENTINEL;
  buffers: StringBuffer[];

  constructor(chunks: StringBuffer[]) {
    this.buffers = [new StringBuffer("", [0])];
    const lastNode: TreeNode | null = null;
    const len = chunks.length;
    for (let i = 0; i < len; i++) {
      if (chunks[i].buffer.length > 0) {
        if (!chunks[i].lineStarts) {
          chunks[i].lineStarts = createLineStarts(
            normalizeEOL(chunks[i].buffer)
          );
        }

        const piece = new Piece(
          i + 1,
          { line: 0, column: 0 },
          {
            line: chunks[i].lineStarts.length - 1,
            column:
              chunks[i].buffer.length -
              chunks[i].lineStarts[chunks[i].lineStarts.length - 1],
          },
          chunks[i].lineStarts.length - 1,
          chunks[i].buffer.length
        );
        this.buffers.push(chunks[i]);
        // lastNode = this.rbInsertRight(lastNode, piece);
      }
    }
  }
}
