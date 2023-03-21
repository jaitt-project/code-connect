const {performance} = require('perf_hooks');

class NumIslands {
  constructor(id) {
    this.id = id;
    this.title = 'Num Islands';
    this.difficulty = 'hard';
    this.prompt = 'Given a 2d grid map of 1s (land) and 0s (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water. Assume that the grid will be an array of arrays of numbers either 0 or 1, and that the grid will have at least one element.';
    this.example = `Input:\n[\n  [0, 1, 1, 1, 0],\n  [1, 1, 0, 1, 0],\n  [1, 1, 0, 0, 0],\n  [0, 0, 0, 0, 0]\n]\nOutput: 1\n\nInput:\n[\n  [1, 1, 0, 0, 0],\n  [1, 1, 0, 0, 0],\n  [0, 0, 1, 0, 0],\n  [0, 0, 0, 1, 1]\n]\nOutput: 3`;
    this.solution = `function numIslands(grid) {\n  const m = grid.length, n = grid[0].length;\n\n  let total = 0;\n\n  const processIsland = (i, j) => {\n    grid[i][j] = 0;\n\n    if (i > 0 && grid[i - 1][j]) processIsland(i - 1, j);\n    if (i < m - 1 && grid[i + 1][j]) processIsland(i + 1, j);\n    if (j > 0 && grid[i][j - 1]) processIsland(i, j - 1);\n    if (j < n - 1 && grid[i][j + 1]) processIsland(i, j + 1);\n  };\n\n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (grid[i][j]) {\n        total++;\n        processIsland(i, j);\n      }\n    }\n  }\n\n  return total;\n};`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // handles single-element trivial cases
    let grid1 = [[1]];
    let grid2 = [[0]];

    try {
      tests['Handles single-element trivial cases'] = func(grid1) === 1 && func(grid2) === 0;
    } catch (error) {
      tests['Handles single-element trivial cases'] = false;
    }

    // handles single-rows or single-columns
    grid1 = [[1, 1, 0, 0, 0, 1, 0]];
    grid2 = [[0, 1, 1, 1, 0, 1, 0, 1, 1]];
    let grid3 = [[1], [1], [0], [0], [1], [0]];
    let grid4 = [[0], [1], [1], [1], [0], [1], [0], [1], [1]];

    try {
      tests['Handles single-rows or single-columns'] = func(grid1) === 2 && func(grid2) === 3 && func(grid3) === 2 && func(grid4) === 3;
    } catch (error) {
      tests['Handles single-rows or single-columns'] = false;
    }

    // handles the general case
    grid1 = [[0, 1, 1, 1, 0],[1, 1, 0, 1, 0],[1, 1, 0, 0, 0],[0, 0, 0, 0, 0]];
    grid2 = [[1, 1, 0, 0, 0],[1, 1, 0, 0, 0],[0, 0, 1, 0, 0],[0, 0, 0, 1, 1]];
    grid3 = [[1, 1, 1, 1, 1],[1, 1, 0, 0, 1],[1, 0, 0, 0, 1],[1, 1, 1, 1, 1]];
    grid4 = [[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0],[0, 0, 0, 0, 0]];
    let grid5 = [[1, 1, 1, 1, 1],[1, 1, 1, 1, 1],[1, 1, 1, 1, 1],[1, 1, 1, 1, 1]];

    try {
      tests['Handles the general case'] = func(grid1) === 1 && func(grid2) === 3 && func(grid3) === 1 && func(grid4) === 0 && func(grid5) === 1;
    } catch (error) {
      tests['Handles the general case'] = false;
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
      func([[1, 1, 0, 0, 0],[1, 1, 0, 0, 0],[0, 0, 1, 0, 0],[0, 0, 0, 1, 1]]);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = NumIslands;