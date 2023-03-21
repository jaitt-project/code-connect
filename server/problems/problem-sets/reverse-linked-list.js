const {performance} = require('perf_hooks');

class ReverseLinkedList {
  constructor(id) {
    this.id = id;
    this.title = 'Reverse Linked List';
    this.difficulty = 'medium';
    this.prompt = `Given the following data structure, write a function for reversing a linked list.\n\nfunction Node(value) {\n  this.value = value;\n  this.next = null;\n}\n\nYour function will have one input, the head of the list. Your function should return the new head of the list. If the input is null, your function should return null.`;
    this.example = `If the linked list is 1 -> 2 -> 3 -> 4 -> 5, the result should be 5 -> 4 -> 3 -> 2 -> 1.`;
    this.solution = `function reverseLinkedList(head) {\n  if (head === null) return null;\n  let reversed = new Node();\n  let currentNode = head;\n\n  while (currentNode !== null) {\n    reversed.value = currentNode.value;\n    if (currentNode.next !== null) {\n      const newNode = new Node();\n      newNode.next = reversed;\n      reversed = newNode;\n    }\n\n    currentNode = currentNode.next;\n  }\n\n  return reversed;\n};`;
  }

  evaluate(func) {
    // initialize Node class 
    function Node(value) {
      this.value = value;
      this.next = null;
    }

    // const strFunc = func.toString();
    // const spliceIndex = strFunc.indexOf('{');
    // const newStrFunc = strFunc.slice(0, spliceIndex + 1) + '\n  function Node(value){this.value=value;this.next=null;}' + strFunc.slice(spliceIndex + 1);
    // console.log(newStrFunc)
    // eval(newStrFunc);
    // console.log(anonymous({value: 7, next: null}));
    // initialize test resulsts
    const tests = {};

    // Should return null if the head is null
    let head = null
    try {
      let reversed = func(head);
      tests['Should return null if the head is null'] = reversed === null;
    } catch (error) {
      tests['Should return null if the head is null'] = false;
    }

    // Should work on linked list with only one node
    head = new Node(7);
    try {
      reversed = func(head);
      tests['Should work on linked list with only one node'] = reversed.value === 7;
    } catch (error) {
      tests['Should work on linked list with only one node'] = false;
    }

    // Head and tail should be reversed
    head = new Node(1);
    head.next = new Node(2);
    try {
      reversed = func(head);
      tests['Head and tail should be reversed'] = reversed.value === 2 && reversed.next.value === 1;
    } catch (error) {
      tests['Head and tail should be reversed'] = false;
    }

    // Should reverse a small linked list successfully
    head = new Node(0);
    let current = head;

    for(let i = 1; i < 11; i++){
      current.next = new Node(i);
      current = current.next;
    }

    try {
      reversed = func(head);
      tests['Should reverse a small linked list successfully'] = true;

      for(let i = 10; i >= 0; i--) {
        if (reversed.value !== i) tests['Should reverse a small linked list successfully'] = false;
        reversed = reversed.next;
      }
    } catch (error) {
      tests['Should reverse a small linked list successfully'] = false;
    }

    // Should reverse a large linked list successfully
    head = new Node(3);
    current = head;

    for(let i = 4; i < 104; i++) {
      current.next = new Node(i);
      current = current.next;
    }

    let runtime; // get runtime for function
    let before;
    try {
      before = performance.now();
      reversed = func(head);
      runtime = performance.now() - before;

      tests['Should reverse a large linked list successfully'] = true;

      for(let i = 103; i >= 3; i--) {
        if (reversed.value !== i) tests['Should reverse a large linked list successfully'] = false;
        reversed = reversed.next;
      }
    } catch (error) {
      tests['Should reverse a large linked list successfully'] = false;
    }

    // check whether all tests passed
    let pass = true;
    for (let test in tests) {
      if (tests[test] === false) pass = false;
    }

    // return overall evaluation
    return {pass, tests, runtime}
  }
}

module.exports = ReverseLinkedList;
