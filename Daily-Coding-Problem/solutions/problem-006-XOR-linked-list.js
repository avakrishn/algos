'use strict';
const assert = require('assert');

//------------------------Problem 6:

/*

This problem was asked by Google.

An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index.

If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.

Level: Hard


*/

//------------------------Constraints and Edge Cases:

/*
    - Create a doubly linked list that is an XOR linked list
    - use a "both" field instead of "next" and "prev" fields
    - implement 
      - add(element) --> adds to tail
      - get(index) --> returns the node at the index
    
    - have access to 
      - get_pointer function that gets the memory address that the pointer is pointing to
      - dereference_pointer function that gets the node that is stored in the memory location pointed by the pointer


*/

//------------------------CODE:

class Node {
  constructor(val) {
    this.val = null;
    this.both = 0;
  }
}

class XORLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(element) {
    //  adds the element node to tail
    let newNode = new Node(element);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.both = getPointer(this.tail);
      this.tail.both = this.tail.both ^ get_pointer(newNode);
      this.tail = newNode;
    }
  }

  get(index) {
    // returns the node at index
    let currentNode = this.head;
    let previousAddress = 0;

    for (let i = 0; i < index; i++) {
      let tempPrevAddr = get_pointer(currentNode);
      currentNode = dereference_pointer(previousAddress ^ currentNode.both);
      previousAddress = tempPrevAddr;
    }
    return currentNode;
  }
}
