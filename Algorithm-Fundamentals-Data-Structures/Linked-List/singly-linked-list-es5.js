/*
/**
 * Initialize your data structure here.
 */
var Node = function(val) {
  this.val = val;
  this.next = null;
};

var SinglyLinkedList = function() {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

/**
 * Get the index-th node in the linked list. If the index is invalid, return null.
 * @param {number} index
 * @return {node}
 */
SinglyLinkedList.prototype.getNode = function(index) {
  if (index >= this.size) return null;
  let current = this.head;
  for (let i = 1; i <= index; i++) {
    current = current.next;
  }

  return current;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
SinglyLinkedList.prototype.get = function(index) {
  let node = this.getNode(index);
  if (node) return node.val;

  return -1;
  // console.log('getValAt', index, JSON.stringify(this));
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
SinglyLinkedList.prototype.addAtHead = function(val) {
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
  // console.log("addAtHead", val, JSON.stringify(this));
};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
SinglyLinkedList.prototype.addAtTail = function(val) {
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
  // console.log("addAtTail", val, JSON.stringify(this));
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
SinglyLinkedList.prototype.addAtIndex = function(index, val) {
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
    // console.log("prevNode", prevNode)
    if (!prevNode) return;
    let nextNode = prevNode.next;
    let newNode = new Node(val);
    prevNode.next = newNode;
    newNode.next = nextNode;
    // console.log("prevNode", prevNode, "newNode", newNode, "nextNode", nextNode)
  }
  this.size++;
  // console.log("addAtIndex",index, "val", val, JSON.stringify(this));
};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
SinglyLinkedList.prototype.deleteAtIndex = function(index) {
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
    // console.log(index-1, this.size, JSON.stringify(prevNode), JSON.stringify(this));

    let deleteNode = prevNode.next;
    prevNode.next = deleteNode.next;
    deleteNode.next = null;
  }

  this.size--;
  // console.log("deleteAtIndex", index, JSON.stringify(this));
};

/**
 * Your SinglyLinkedList object will be instantiated and called as such:
 * var obj = new SinglyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
