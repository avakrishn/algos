/*
  Linked Lists - Probability
Prompt
Given the head node of a linked list with integer values, return a random value from that linked list. Note that you must do this in linear runtime with only a single pass through the linked list, and also in constant auxiliary space.

  Reservoir Sampling
  Time O(N)
  Space O(1)

 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(val) {
    let newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
}

// generate random number between 0 and 1, if random number < 1/counter then update value to current's value
function probability(linkedList) {
  let current = linkedList.head;
  let value = current.val;
  let counter = 1;

  while (current !== null) {
    let randomNumber = Math.random();

    if (randomNumber < 1 / counter) {
      value = current.val;
    }
    counter++;
    current = current.next;
  }

  return value;
}

// generate random number between 0 and count(exculsive) if the random number === 0 update value to current's value
function altProbability(linkedList) {
  let current = linkedList.head;
  let value = current.val;
  let counter = 1;

  while (current !== null) {
    let randomNumber = Math.floor(Math.random() * counter);

    if (randomNumber === 0) {
      value = current.val;
    }
    counter++;
    current = current.next;
  }

  return value;
}

let newLinkedList = new LinkedList();

newLinkedList.addNode(1);
newLinkedList.addNode(2);
newLinkedList.addNode(3);
newLinkedList.addNode(4);
newLinkedList.addNode(5);

// console.log(probability(newLinkedList));

function testProbability(n, listNode, probability) {
  let counter = {};
  for (let i = 0; i < n; i++) {
    let value = probability(listNode);
    if (counter[value]) {
      counter[value]++;
    } else {
      counter[value] = 1;
    }
  }

  return counter;
}

console.log(testProbability(10000, newLinkedList, altProbability));

console.log(testProbability(10000, newLinkedList, probability));
