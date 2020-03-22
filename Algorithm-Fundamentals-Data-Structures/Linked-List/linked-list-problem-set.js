// Linked List Problem Set

/* (Beginner) Implement a linked list with methods to: 
a. insert_head(val): inserts val  at the head 
b. insert_tail(val): inserts val  at the tail
c. contains(val): returns True if list contains val, False otherwise. 
d. remove_head(): removes node at the head, returns node’s value
e. remove_tail(): removes node at the tail, returns node’s value
f. merge(linked_list): appends linked_list at the tail
Example object: 
  LinkedList { 
    head: Node { 
      value: 1, 
      next: Node { value: 2 next: null },
    }, 
    tail: Node { 
      value: 2, next: null,
    } 
  } 
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertHead(val) {
    let newHead = new Node(val);
    if (!this.head) {
      this.head = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }
  }

  insertTail(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
  contains(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) return true;
      current = current.next;
    }
    return false;
  }

  removeHead() {
    if (!this.head) return;

    let newHead = this.head.next;
    this.head = newHead;
  }

  removeTail() {
    if (!this.head) return;

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
  }

  merge(linkedList) {
    if (!this.head) this.head = linkedList.head;

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = linkedList.head;
  }
}

console.log("---Implement a linked list with methods---");

let list = new LinkedList();
list.insertTail(2);
console.log(JSON.stringify(list));
list.insertHead(1);
list.insertTail(3);
list.insertTail(4);
list.insertTail(5);
console.log(JSON.stringify(list));
console.log(list.contains(5));
console.log(list.contains(6));
list.removeHead();
console.log(JSON.stringify(list));
list.removeTail();
console.log(JSON.stringify(list));

let anotherList = new LinkedList();
list.insertTail(10);
list.insertTail(11);
list.insertTail(12);

list.merge(anotherList);
console.log(JSON.stringify(list));

/*
Write a function to reverse the nodes of a singly linked list. (Intermediate).  
For a challenge, implement it recursively! (Advanced)
Input : 1 -> 2 -> 3 -> 4 -> NULL 
Output : 4 -> 3 -> 2 -> 1 -> NULL 
*/

/*

          p     c     n   
         null    1 -> 2 -> 3 -> 4 -> NULL

                                  p
                                       c
                                       
         null <- 1 <- 2 <-  3  <- 4   NULL

    while(c)
      n = c.next (2)
      c.next = p
      p = c
      c = n

    

    

*/

function reverseIterative(linkedList) {
  let prev = null;
  let current = linkedList.head;

  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  linkedList.head = prev;
}
console.log("---Reverse a Linked List Iterative---");
let list2 = new LinkedList();
list2.insertTail(1);
list2.insertTail(2);
list2.insertTail(3);
list2.insertTail(4);

console.log(JSON.stringify(list2));

reverseIterative(list2);
console.log(JSON.stringify(list2));

/*  
              c    val
    1 -> 2 -> 3 <- 4 
*/

function reverseRecursiveHelper(linkedList) {
  function reverseHelper(current) {
    if (!current.next) {
      return (linkedList.head = current);
    }
    let prevNode = reverseHelper(current.next);
    prevNode.next = current;
    current.next = null;
    return current;
  }
  return reverseHelper(linkedList.head);
}

console.log("---Reverse a Linked List Recursive Helper---");
let list3 = new LinkedList();
list3.insertTail(1);
list3.insertTail(2);
list3.insertTail(3);
list3.insertTail(4);

console.log(JSON.stringify(list3));

reverseRecursiveHelper(list3);
console.log(JSON.stringify(list3));

/*  
         h 
    1 -> 2 ->3 -> 4
*/

function reverseRecursive(head) {
  if (!head || !head.next) return head;

  let prevNode = reverseRecursive(head.next);
  head.next.next = head;
  head.next = undefined;
  return prevNode;
}

console.log("---Reverse a Linked List Recursive ---");
let list3_5 = new LinkedList();
list3_5.insertTail(1);
list3_5.insertTail(2);
list3_5.insertTail(3);
list3_5.insertTail(4);

console.log(JSON.stringify(list3_5));

list3_5.head = reverseRecursive(list3_5.head);
console.log(JSON.stringify(list3_5));

/*
Write a function to get the Nth node value in a linked list. (Beginner)
Input: 1->10->30->14, index = 2 Output: 30 

If indexth node does not exist return -1
*/

function getNthNode(n, linkedList) {
  if (n < 0) return -1;
  if (n === 0 && linkedList.head) return linkedList.head.val;

  let current = linkedList.head;
  let i = 0;

  while (current && i < n) {
    current = current.next;
    i++;
  }

  if (i === n && current) return current.val;

  return -1;
}

console.log("---Get Nth Node Value in LinkedList---");

let list4 = new LinkedList();
list4.insertTail(1);
list4.insertTail(2);
list4.insertTail(3);
list4.insertTail(4);

console.log(getNthNode(-30, list4));
console.log(getNthNode(0, list4));
console.log(getNthNode(1, list4));
console.log(getNthNode(2, list4));
console.log(getNthNode(3, list4));
console.log(getNthNode(4, list4));
console.log(getNthNode(40, list4));

/*
Implement a doubly linked list with methods to insert, remove, and get size. (Intermediate). For additional practice, write this list to act as a stack and a queue (also called a Deque), with methods to enqueue, dequeue, push, pop, and peek.
*/

class NodeDouble {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constuctor() {
    this.head = null;
    this.tail = null;
  }

  insertHead(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let oldHead = this.head;
      newNode.next = oldHead;
      oldHead.prev = newNode;
      this.head = newNode;
    }
  }

  insertTail(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  removeHead() {
    if (!this.head) return;

    let temp = this.head.next;
    this.head.next = null;
    this.head = temp;
    this.head.prev = null;
  }

  removeTail() {
    if (!this.head) return;

    let temp = this.tail.prev;
    this.tail.prev = null;
    this.tail = temp;
    this.tail.next = null;
  }

  getSize() {
    let current = this.head;
    let counter = 0;
    while (current) {
      counter++;
      current = current.next;
    }
    return counter;
  }
}

console.log("--- Doubly Linked List ---");
let list5 = new DoublyLinkedList();
console.log(list5.getSize());
list5.insertTail(2);
console.log(list5);
list5.insertHead(1);
console.log(list5);
list5.insertTail(3);
console.log(list5);
list5.insertTail(4);
console.log(list5);
console.log(list5.getSize());
list5.removeHead();
list5.removeTail();
console.log(list5.getSize());
console.log(list5);

class Stack {
  constructor() {
    this.top = null;
  }

  push(val) {
    let newNode = new Node(val);
    if (!this.top) {
      this.top = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
  }

  pop() {
    if (!this.top) return;

    let oldTop = this.top;
    this.top = oldTop.next;
    oldTop.next = null;
  }

  peek() {
    return this.top.val;
  }

  isEmpty() {
    return !this.top;
  }
}

console.log("--- Stack ---");
let stack = new Stack();
console.log(JSON.stringify(stack));
console.log(stack.isEmpty());
stack.pop();
stack.push(3);
stack.push(2);
stack.push(1);
console.log(JSON.stringify(stack));
console.log(stack.peek());
console.log(stack.isEmpty());

class Queue {
  constructor() {
    this.first = null;
  }

  queue(val) {
    // push to end
    let newNode = new Node(val);

    if (!this.first) {
      this.first = newNode;
    } else {
      let current = this.first;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  dequeue() {
    // pop from first
    if (!this.first) return;

    let oldFirst = this.first;
    this.first = oldFirst.next;
    oldFirst.next = null;
  }

  peek() {
    return this.first.val;
  }

  isEmpty() {
    return !this.first;
  }
}

console.log("--- Queue ---");
let queue = new Queue();
console.log(JSON.stringify(queue));
console.log(queue.isEmpty());
queue.dequeue();
queue.queue(1);
queue.queue(2);
queue.queue(3);
console.log(JSON.stringify(queue));
queue.dequeue();
console.log(JSON.stringify(queue));
console.log(queue.peek());
console.log(queue.isEmpty());

/*
Dijkstra’s algorithm finds the shortest path from a start node to any node in a graph. (The graph must be connected, that is, there is a path between any two nodes. The “cost” or “distance” to traverse any edge must be positive).
Read about it here: https://en.wikipedia.org/wiki/Dijkstra's_algorithm
Implement a data structure that represents a connected graph with positive distances/costs between nodes. How would you represent an undirected vs. a directed graph? (Intermediate)
Write a get_shortest_path (node) function, which returns the order of nodes to visit on the shortest path from the head node to the destination node, and the total cost/distance of that path. (Advanced) 
**Disclaimer: Problem 5 is not sourced from any interview prep material. I decided to include it after learning about Dijkstra’s algorithm and considering how you would actually code it. I hope you enjoy learning about it! We can revisit this problem when we look at Trees and Graphs. 
*/
