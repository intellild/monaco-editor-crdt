class TextNode {
  readonly id: string;

  constructor(
    readonly owner: string,
    readonly timestamp: number,
    public offset: number,
    public content: string,
    public isTombstone: boolean,
    public next: TextNode | null,
    public sibling: TextNode | null
  ) {
    this.id = `${owner}:${timestamp}:${offset}`;
  }

  split(offset: number) {
    const nextContent = this.content.substring(0, offset);
    const siblingContent = this.content.substring(offset);
    const sibling = new TextNode(
      this.owner,
      this.timestamp,
      offset,
      siblingContent,
      false,
      this.next,
      null
    );
    this.content = nextContent;
    this.sibling = sibling;
  }

  static create(owner: string, timestamp: number, content: string) {
    return new TextNode(owner, timestamp, 0, content, false, null, null);
  }
}

class CRDTTextBuffer {
  timestamp = 0;
  hashMap = new Map<string, TextNode>();
  node: TextNode;

  constructor(content: string, owner: string) {
    const node = TextNode.create(owner, this.timestamp, content);
    this.hashMap.set(node.id, node);
    this.node = node;
  }
}
