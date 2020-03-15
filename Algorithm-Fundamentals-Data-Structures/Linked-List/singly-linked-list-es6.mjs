/**
 * Initialize your data structure here.
 */
export class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Get the index-th node in the linked list. If the index is invalid, return null.
   * @param {number} index
   * @return {node}
   */
  getNode(index) {
    if (index >= this.size) return null;
    let current = this.head;
    for (let i = 1; i <= index; i++) {
      current = current.next;
    }

    return current;
  }
  /**
   * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
   * @param {number} index
   * @return {number}
   */

  get(index) {
    let node = this.getNode(index);
    if (node) return node.val;

    return -1;
  }

  /**
   * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtHead(val) {
    let newHead = new Node(val);
    if (!this.head) {
      this.head = newHead;
      this.tail = newHead;
    } else {
      let prevHead = this.head;
      newHead.next = prevHead;
      this.head = newHead;
    }
    this.size++;
  }

  /**
   * Append a node of value val to the last element of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtTail(val) {
    let newTail = new Node(val);
    if (!this.head) {
      this.head = newTail;
      this.tail = newTail;
    } else {
      let prevTail = this.tail;
      prevTail.next = newTail;
      this.tail = newTail;
    }
    this.size++;
  }

  /**
   * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  addAtIndex(index, val) {
    if (index < 0 || index > this.size) {
      return;
    } else if (index === 0) {
      this.addAtHead(val);
      return;
    } else if (index === this.size) {
      this.addAtTail(val);
      return;
    } else {
      let prevNode = this.getNode(index - 1);
      if (!prevNode) return;
      let nextNode = prevNode.next;
      let newNode = new Node(val);
      prevNode.next = newNode;
      newNode.next = nextNode;
    }
    this.size++;
  }

  /**
   * Delete the index-th node in the linked list, if the index is valid.
   * @param {number} index
   * @return {void}
   */
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return;
    } else if (index === 0) {
      let newHead = this.head.next;
      if (this.size === 1) {
        this.tail = newHead;
      }
      this.head = newHead;
    } else if (index === this.size - 1) {
      let prevNode = this.getNode(index - 1);
      prevNode.next = null;
      this.tail = prevNode;
    } else {
      let prevNode = this.getNode(index - 1);
      if (!prevNode) return;

      let deleteNode = prevNode.next;
      prevNode.next = deleteNode.next;
      deleteNode.next = null;
    }

    this.size--;
  }
}

export const singlyLinkedListFromArray = arr => {
  let linkedList = new SinglyLinkedList();
  for (let i = 0; i < arr.length; i++) {
    linkedList.addAtTail(arr[i]);
  }
  return linkedList;
};

export const arrayFromSinglyLinkedList = head => {
  let current = head;
  let arr = [];
  while (current) {
    arr.push(current.val);
    current = current.next;
  }
  return arr;
};

export const stringFromSinglyLinkedList = head => {
  let str = arrayFromSinglyLinkedList(head);
  return str.join("");
};
