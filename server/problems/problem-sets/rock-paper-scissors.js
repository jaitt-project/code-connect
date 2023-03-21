const {performance} = require('perf_hooks');

class RockPaperScissors {
  constructor(id) {
    this.id = id;
    this.title = 'Rock Paper Scissors';
    this.difficulty = 'hard';
    this.prompt = `Return an array of strings (all of length n) whose values are all the possible ways of creating strings from the letters 'r', 'p', and 's'.`;
    this.example = `rps(0) -> ['']\nrps(1) -> ['r', 'p', 's']\nrps(2) -> ['rr', 'rp', 'rs', 'pr', 'pp', 'ps', 'sr', 'sp', 'ss']\nrps(3) -> [\n  'rrr', 'rrp', 'rrs', 'rpr', 'rpp', 'rps', 'rsr', 'rsp', 'rss',\n  'prr', 'prp', 'prs', 'ppr', 'ppp', 'pps', 'psr', 'psp', 'pss',\n  'srr', 'srp', 'srs', 'spr', 'spp', 'sps', 'ssr', 'ssp', 'sss'\n]`;
    this.solution = `function rps(n) {\n  const results = [];\n\n  const generate = str => {\n    if (str.length) === n {\n      results.push(str)\n      return;\n    }\n    generate(str + 'r');\n    generate(str + 'p');\n    generate(str + 's');\n  }\n  generate('');\n  return results;\n}`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // Handles rps combinations
    try {
      result1 = func(0);
      expected1 = [''];
      result2 = func(1);
      expected2 = ['r', 'p', 's'];
      result3 = func(2);
      expected3 = ['rr', 'rp', 'rs', 'pr', 'pp', 'ps', 'sr', 'sp', 'ss'];
      result4 = func(3);
      expected4 = ['rrr', 'rrp', 'rrs', 'rpr', 'rpp', 'rps', 'rsr', 'rsp', 'rss', 'prr', 'prp', 'prs', 'ppr', 'ppp', 'pps', 'psr', 'psp', 'pss', 'srr', 'srp', 'srs', 'spr', 'spp', 'sps', 'ssr', 'ssp', 'sss'];

      tests['Handles rps combinations'] = true;

      for (let i = 0; i < result4.length; i++) {
        if (result1[i] !== expected1[i]) tests['Handles rps combinations'] = false;
        if (result2[i] !== expected2[i]) tests['Handles rps combinations'] = false;
        if (result3[i] !== expected3[i]) tests['Handles rps combinations'] = false;
        if (result4[i] !== expected4[i]) tests['Handles rps combinations'] = false;
      }
    } catch (error) {
      tests['Handles rps combinations'] = false;
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
      func(3);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = RockPaperScissors;