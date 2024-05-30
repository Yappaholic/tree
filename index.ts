class Node {
  public left: Node | null;
  public right: Node | null;
  public value: number | null;
  constructor(value: number | null) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}
class Tree {
  public root: Node | null;
  constructor(arr: number[], start = 0) {
    let sorted = this.sortArray(arr);
    this.root = this.buildTree(sorted, start, sorted.length);
  }
  sortArray(arr: number[]) {
    let sorted = Array.from(new Set(arr));
    sorted.sort((a, b) => {
      return a - b;
    });
    return sorted;
  }
  buildTree(arr: number[], start = 0, end: number) {
    if (start > end) {
      return null;
    }
    const pivot = parseInt(`${(start + end) / 2}`);
    const root = new Node(arr[pivot]);
    root.left = this.buildTree(arr, start, pivot - 1);
    root.right = this.buildTree(arr, pivot + 1, end);
    return root;
  }
  insert(value: number) {
    let curr = this.root;
    while (curr) {
      if (!curr) {
        break;
      }
      //Traversal
      if (value > curr!.value!) {
        curr = curr.right;
      } else if (value < curr!.value!) {
        curr = curr!.left;
      }
      //Right handed
      if (!curr!.left || !curr!.right) {
        if (curr!.value! < value) {
          const tmp = curr!.value;
          if (curr!.right! && curr!.right!.value! > value) {
            curr!.value = value;
            curr!.left = new Node(tmp);
            break;
          } else if (curr!.right! && curr!.right!.value! < value) {
            curr!.value = curr!.right!.value;
            curr!.right!.value = value;
            curr!.left = new Node(tmp);
          } else if (!curr!.right) {
            curr!.right = new Node(value);
            break;
          }
        }
        //Left handed
        if (curr!.value! > value) {
          if (curr!.left && curr!.left!.value! < value) {
            const tmp = curr!.left!.value;
            curr!.left!.value = value;
            curr!.left!.left = new Node(tmp);
            break;
          } else if (!curr!.left) {
            curr!.left = new Node(value);
            break;
          }
        }
        return 0;
      }
    }
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
tree.insert(25);
tree.insert(2);
tree.insert(6);
tree.insert(325);
tree.insert(322);
tree.insert(323);
tree.prettyPrint(tree.root);
