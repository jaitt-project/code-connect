const {performance} = require('perf_hooks');

class BstHeight {
  constructor(id) {
    this.id = id;
    this.title = 'BST Height';
    this.difficulty = 'hard';
    this.prompt = `Given the following data structure, find the tallest height of a binary search tree.\n\nfunction BinarySearchTree(value) {\n  this.value = value;\n  this.right = null;\n  this.left = null;\n}`;
    this.example = `Ex. the tallest height of:\n\n    4\n  /  \\\n 2     7\n/ \\     \\\n1   3     9\n        /\n       8\n\nis 3, because the tallest height of the tree connects the numbers 4 - 7 - 9 - 8 and has 3 links.`;
    this.solution = `function bstHeight(tree) {\n  if (!tree) return -1;\n  const leftHeight = bstHeight(tree.left);\n  const rightHeight = bstHeight(tree.right);\n  return Math.max(leftHeight, rightHeight) + 1;\n};`;
  }

  evaluate(func) {
    function BinarySearchTree(value) {
      this.value = value;
      this.right = null;
      this.left = null;
    }

    // initialize test resulsts
    const tests = {};

    // Finds the height of a binary search tree
    let binarySearchTree;
    try {
      tests['Finds the height of a binary search tree'] = true;

      binarySearchTree = new BinarySearchTree(5);
      binarySearchTree.left = new BinarySearchTree(3);
      binarySearchTree.left.left = new BinarySearchTree(1);
      console.log(func(binarySearchTree))
      if (func(binarySearchTree) !== 2) tests['Finds the height of a binary search tree'] = false;

      binarySearchTree.left.left.right = new BinarySearchTree(2);
      if (func(binarySearchTree) !== 3) tests['Finds the height of a binary search tree'] = false;

      binarySearchTree.left.left.left = new BinarySearchTree(0);
      if (func(binarySearchTree) !== 3) tests['Finds the height of a binary search tree'] = false;

      binarySearchTree.right = new BinarySearchTree(8);
      if (func(binarySearchTree) !== 3) tests['Finds the height of a binary search tree'] = false;
    } catch (error) {
      tests['Finds the height of a binary search tree'] = false;
    }

    // check whether all tests passed
    let pass = true;
    for (let test in tests) {
      if (tests[test] === false) pass = false;
    }

    // get function runtime
    let runtime;
    if (pass) {
      const before = performance.now();
      func(binarySearchTree);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = BstHeight;