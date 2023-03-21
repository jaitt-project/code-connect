class ReverseLinkedList {
  constructor(id) {
    this.id = id;
    this.difficulty = 'medium';
    // this.prompt = 
    // this.example = 
    // this.solution =
  }

  evaluate(func) {
    // todo
  }
}

module.exports = ReverseLinkedList;

// HACK HOUR TESTS
// describe('reverseLinkedList test', () => {

//   let head;

//   it('should return null if the head is null', () => {
//     head = null;
//     const reversed = reverseLinkedList(head);
//     expect(reversed).toBe(null);
//   });

//   it('should work on linked list with only one node', () => {
//     head = new Node(7);
//     const reversed = reverseLinkedList(head);
//     expect(reversed.value).toBe(7);
//   });

//   it('head and tail should be reversed', () => {
//     head = new Node(1);
//     head.next = new Node(2);
//     const reversed = reverseLinkedList(head);
//     expect(reversed.value).toBe(2);
//     expect(reversed.next.value).toBe(1);
//   });

//   it('should reverse a small linked list successfully', () => {
//     head = new Node(0);
//     let current = head;

//     for(let i = 1; i < 11; i++){
//       current.next = new Node(i);
//       current = current.next;
//     }

//     let reversed = reverseLinkedList(head);
//     for(let i = 10; i >= 0; i--){
//       expect(reversed.value).toBe(i);
//       reversed = reversed.next;
//     }

//   });

//   it('should reverse a large linked list successfully', () => {
//     head = new Node(3);
//     let current = head;

//     for(let i = 4; i < 104; i++){
//       current.next = new Node(i);
//       current = current.next;
//     }

//     let reversed = reverseLinkedList(head);
//     for(let i = 103; i >= 3; i--){
//       expect(reversed.value).toBe(i);
//       reversed = reversed.next;
//     }
//   });
// });