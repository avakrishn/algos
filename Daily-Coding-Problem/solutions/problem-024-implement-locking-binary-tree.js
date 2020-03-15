'use strict';
const assert = require('assert');

//------------------------Problem 24:

/*

This problem was asked by Google.

Implement locking in a binary tree. A binary tree node can be locked or unlocked only if all of its descendants or ancestors are not locked.

Design a binary tree node class with the following methods:

is_locked, which returns whether the node is locked
lock, which attempts to lock the node. If it cannot be locked, then it should return false. Otherwise, it should lock it and return true.
unlock, which unlocks the node. If it cannot be unlocked, then it should return false. Otherwise, it should unlock it and return true.
You may augment the node to add parent pointers or any other property you would like. You may assume the class is used in a single-threaded program, so there is no need for actual locks or mutexes. Each method should run in O(h), where h is the height of the tree.

Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
    - A binary tree node can be locked or unlocked only if all of its descendants or ancestors are not locked.
    - You may augment the node to add parent pointers or any other property you would like. 
    - Each method should run in O(h), where h is the height of the tree or faster.

*/

//------------------------Inputs and Outputs:

/*
    Input: 

    Output: 

    ---

    Input: 

    Output: 

    ---

*/

//------------------------Approach:

/*
  - In binary node class store 2 other properties (locked and parent) to keep track of if node is locked and what the parent node is respectively
  - is_locked : O(1) Time
    - return the value of this.locked
  - lock: O(h+m)
    - check to make sure that parent is not locked by going up the tree and returning true if no parent is locked - O(h)
    - check the children subtree using BFS to see if any descendent is locked - O(m) return true if no child is locked
    - if the above 2 are satisfied then change this.is_locked to true and return true
    - else return false
  - unlock: O(h+m)
    - check to make sure that parent is not locked by going up the tree and returning true if no parent is locked - O(h)
    - check the children subtree using BFS to see if any descendent is locked - O(m) return true if no child is locked
    - if the above 2 are satisfied then change this.is_locked to false and return true
    - else return false
*/

//------------------------CODE:

/*
    Time: is_locked : O(1), lock: O(h+m), unlock: O(h+m)
      - where h is the height to the node and m is the subtree under the node
    Space: N/A
*/

class BinaryNode {
  constructor(val) {
    this.val = val;
    this.parent = null;
    this.right = null;
    this.left = null;
    this.locked = false;
  }

  is_locked() {
    return this.locked;
  }

  lock() {
    if (this.is_locked() === true) return false;

    if (
      this.checkParentNotLocked() === true &&
      this.checkChildrenNotLocked() === true
    ) {
      this.locked = true;
      return true;
    } else {
      return false;
    }
  }
  unlock() {
    if (this.is_locked() === false) return false;

    if (
      this.checkParentNotLocked() === true &&
      this.checkChildrenNotLocked() === true
    ) {
      this.locked = false;
      return true;
    } else {
      return false;
    }
  }

  checkParentNotLocked() {
    let current_p = this.parent;
    if (current_p === null) return true;

    while (current_p !== null) {
      if (current_p.is_locked() === true) {
        return false;
      }
      current_p = current_p.parent;
    }

    return true;
  }

  checkChildrenNotLocked() {
    let current = this;
    let queue = [];
    queue.push(current);
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left !== null) {
        if (current.left.is_locked() === true) return false;
        queue.push(current.left);
      }

      if (current.right !== null) {
        if (current.right.is_locked() === true) return false;
        queue.push(current.right);
      }
    }
    return true;
  }
}

//------------------------Optimized:

/*

- In binary node class store 3 other properties (locked, parent, numLockedDescendants) to keep track of if node is locked , what the parent node is, and the number of children that are locked respectively
- is_locked : O(1) Time
  - return the value of this.locked
- lock: O(h)
  - check to make sure that parent is not locked by going up the tree and returning true if no parent is locked - O(h)
  - check the children: if numLockedDescendants === 0 then return true else return false
  - if the above 2 are satisfied then change this.is_locked to true and increment the numLockedDescendants of all of its ancestors/parents (O(h) time) and return true
  - else return false
- unlock: O(h)
  - check to make sure that parent is not locked by going up the tree and returning true if no parent is locked - O(h)
  - check the children: if numLockedDescendants === 0 then return true else return false
  - if the above 2 are satisfied then change this.is_locked to false and decrement the numLockedDescendants of all of its ancestors/parents (O(h) time) and return true
  - else return false

    Time: is_locked : O(1), lock: O(h), unlock: O(h)
      - where h is the height to the node
    Space: N/A
*/

class BinaryNodeOptimized {
  constructor(val) {
    this.val = val;
    this.parent = null;
    this.right = null;
    this.left = null;
    this.locked = false;
    this.numLockedDescendants = 0;
  }

  is_locked() {
    return this.locked;
  }

  lock() {
    if (this.is_locked() === true) return false;

    if (
      this.checkParentNotLocked() === true &&
      this.numLockedDescendants === 0
    ) {
      this.locked = true;
      this.incrementParentLockCount();
      return true;
    } else {
      return false;
    }
  }
  unlock() {
    if (this.is_locked() === false) return false;

    if (
      this.checkParentNotLocked() === true &&
      this.numLockedDescendants === 0
    ) {
      this.locked = false;
      this.decrementParentLockCount();
      return true;
    } else {
      return false;
    }
  }

  checkParentNotLocked() {
    let current_p = this.parent;
    if (current_p === null) return true;

    while (current_p !== null) {
      if (current_p.is_locked() === true) {
        return false;
      }
      current_p = current_p.parent;
    }

    return true;
  }

  incrementParentLockCount() {
    let current_p = this.parent;

    while (current_p !== null) {
      current_p.numLockedDescendants++;
      current_p = current_p.parent;
    }
  }

  decrementParentLockCount() {
    let current_p = this.parent;

    while (current_p !== null) {
      current_p.numLockedDescendants--;
      current_p = current_p.parent;
    }
  }
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

let tree1 = new BinaryNode(1);
tree1.left = new BinaryNode(2);
tree1.right = new BinaryNode(3);
tree1.left.left = new BinaryNode(4);
tree1.left.right = new BinaryNode(5);
tree1.right.left = new BinaryNode(6);
tree1.right.left.locked = true;
tree1.right.right = new BinaryNode(7);

let tree2 = new BinaryNodeOptimized(1);
tree2.numLockedDescendants++;
tree2.left = new BinaryNodeOptimized(2);
tree2.right = new BinaryNodeOptimized(3);
tree2.right.numLockedDescendants++;
tree2.left.left = new BinaryNodeOptimized(4);
tree2.left.right = new BinaryNodeOptimized(5);
tree2.right.left = new BinaryNodeOptimized(6);
tree2.right.left.locked = true;
tree2.right.right = new BinaryNodeOptimized(7);

const testOne = runTest(tree1.left.lock() === true, 1);
const testTwo = runTest(tree1.right.lock() === false, 2);
const testThree = runTest(tree1.left.unlock() === true, 3);
const testFour = runTest(tree2.left.lock() === true, 4);
const testFive = runTest(tree2.right.lock() === false, 5);
const testSix = runTest(tree2.left.unlock() === true, 6);

const testArray = [testOne, testTwo, testThree, testFour, testFive, testSix];

for (let test of testArray) {
  console.log(test);
}
