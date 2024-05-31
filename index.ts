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
  minValue(root: Node | null) {
    let minv = root!.value;
    while (root!.left !== null) {
      minv = root!.left.value;
      root = root!.left;
    }
    return minv;
  }
  height(root: Node | null): any {
    if (root === null) {
      return 0;
    }
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }
  bstToVine(grand: any) {
    let count = 0;
    let tmp = grand.right;
    while (tmp) {
      if (tmp.left) {
        let oldTmp = tmp;
        tmp = tmp.left;
        oldTmp.left = tmp.right;
        tmp.right = oldTmp;
        grand.right = tmp;
      } else {
        count++;
        grand = tmp;
        tmp = tmp.right;
      }
    }

    return count;
  }
  compress(grand: any, m: any) {
    let tmp = grand.right;

    for (let i = 0; i < m; i++) {
      let oldTmp = tmp;
      tmp = tmp.right;
      grand.right = tmp;
      oldTmp.right = tmp.left;
      tmp.left = oldTmp;
      grand = tmp;
      tmp = tmp.right;
    }
  }
  balanceBST(root: Node | null) {
    let grand = new Node(0);

    grand.right = root;

    let count = this.bstToVine(grand);

    let h = Math.log2(count + 1);

    let m = Math.pow(2, h) - 1;

    this.compress(grand, count - m);

    for (m = Math.floor(m / 2); m > 0; m = Math.floor(m / 2)) {
      this.compress(grand, m);
    }

    return grand.right;
  }
  isBalanced(root: Node | null) {
    if (root === null) {
      return true;
    }
    let lh = this.height(root.left);
    let rh = this.height(root.right);
    if (
      Math.abs(lh - rh) <= 1 &&
      this.isBalanced(root.left) == true &&
      this.isBalanced(root.right) == true
    ) {
      return true;
    }
    return false;
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
  insert(value: number, root: any) {
    if (this.find(value, root) == true) {
      return null;
    }
    if (root === null) {
      root = new Node(value);
      return root;
    }
    if (root!.value! < value) {
      root.right = this.insert(value, root.right);
    } else if (root!.value! > value) {
      root.left = this.insert(value, root.left);
    }
    return root;
  }

  delete(root: Node | null, value: number | null) {
    if (root === null) return root;

    if (value! < root!.value!) root.left = this.delete(root.left, value);
    else if (value! > root.value!) root.right = this.delete(root.right, value);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;

      root.value = this.minValue(root.right);

      root.right = this.delete(root!.right!, root.value);
    }
    return root;
  }
  find(value: number, root: Node | null) {
    let queue = [root];
    if (queue.length === 0) {
      return;
    }
    while (queue.length != 0) {
      let pop = queue.shift() as Node | undefined | null;
      if (!pop) {
        continue;
      }
      if (pop.value === value) {
        return true;
      }
      queue.push(pop.left);
      queue.push(pop.right);
    }
    return false;
  }
  leverOrder(root: Node | null, ...fn: any[]) {
    let queue = [root];
    let result: Node[] = [];
    while (queue.length) {
      let pop = queue.shift() as Node;
      result.push(pop);
      if (pop.left) {
        queue.push(pop.left);
      }
      if (pop.right) {
        queue.push(pop.right);
      }
    }
    if (fn.length === 1) {
      let func = fn[0];
      return result.forEach((res) => func(res));
    }
    return result;
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
tree.insert(25, tree.root);
tree.insert(22, tree.root);
let root = tree.balanceBST(tree.root);
tree.prettyPrint(root);
