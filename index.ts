class Node {
  public left: Node | null;
  public right: Node | null;
  public value: number | null;
  constructor(value: number) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}
class Tree {
  public root: Node | null;
  constructor(arr: number[]) {
    this.root = this.buildTree(arr);
  }
  sortArray(arr: number[]) {
    let sorted = Array.from(new Set(arr));
    sorted.sort((a, b) => {
      return a - b;
    });
    return sorted;
  }
  buildTree(arr: number[]) {
    let sorted = this.sortArray(arr);
    let end = sorted.length;
    if (end === 0) {
      return null;
    }
    const pivot = Math.floor(end / 2);
    const root = new Node(sorted[pivot]);
    root.left = this.buildTree(sorted.slice(0, pivot));
    root.right = this.buildTree(sorted.slice(pivot + 1, end));
    return root;
  }
  prettyPrint = (node: Node | null, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);

