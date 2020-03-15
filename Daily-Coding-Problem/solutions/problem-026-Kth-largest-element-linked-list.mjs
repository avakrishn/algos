"use strict";
import assert from "assert";
import {
  Node,
  singlyLinkedListFromArray,
  stringFromSinglyLinkedList
} from "../../Algorithm-Fundamentals-Data-Structures/Linked-List/singly-linked-list-es6.mjs";

//------------------------Problem:

/*

This problem was asked by Google.

Given a singly linked list and an integer k, remove the kth last element from the list. k is guaranteed to be smaller than the length of the list.

The list is very long, so making more than one pass is prohibitively expensive.

Do this in constant space and in one pass.

Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
  - T(n) = O(n) (one pass)
  - S(n) = O(1)

  By kth last element: k is guaranteed to be smaller than the length of the list.


*/

//------------------------Inputs and Outputs:

/*
  Input: 1->2->3->4->5, and k = 2

  Output: 1->2->3->5

  ---

  Input: 1 -> null, k = 1

  Output: []

  ---

*/

//------------------------Approach:

/*

**Approach 1:
  linear time
  constant space

  Store the size within the Singly Linked List 
  then iterate till you get to size - k - 1
  then remove that node's next element.

  0 1 2 3 4
  1 2 3 4 5

  k = 2 
  size = 5

  5-2 = 3 - 1 = 2
  node = get node at index 2
  remove node.next ( index 3 )
  so that the linked list becomes:

  0 1 2 3
  1 2 3 5
  

**Approach 2:
  linear time
  linear space

  Not have access to size
  Use a stack and use more than constant space

  0 1 2 3 4
  1 2 3 4 5

  stack = [5,4,3,2,1] (store the nodes)

  prevNode = in stack kth index + 1
  new nextNode = in stack kth index - 1



  5, 4, 3

  prevNode = 3
  nextNode  = 5

  prevNode.next = nextNode

  node = 4
  node.next = null

** Approach 3: 

  Maintain two pointers and update one with a delay of k steps.
  have a fast pointer or final pointer that starts at the kth index
  have a slow pointer or target pointer that starts at index 0
  keep track of the prev of the slow pointer

  walk through the linked list until the fast pointer is pointing to last node
  your slow pointer then will be pointing to the node to delete
  previous pointer next will be slow pointer next
  slow pointer next will be null

  however if fast pointer is set to the last node and slow pointer does not move
  then set head to slow pointer next

  O(n) time
  O(1) space

*/

//------------------------CODE:

/*
  Time: O(n) where n is the length of the linked list
  Space: O(1) two pointers
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
// Maintain two pointers and update one with a delay of k steps.
const removeKthFromEnd = (head, k) => {
  let target = head;
  let final = head;
  let prevNode = null;

  for (let i = 1; i < k; i++) {
    final = final.next;
  }

  while (final.next) {
    prevNode = target;
    final = final.next;
    target = target.next;
  }
  if (prevNode) {
    prevNode.next = target.next;
    target.next = null;
  } else {
    head = target.next;
  }

  return head;
};

//------------------------Modification:

// Also see leet code: 19. Remove Nth Node From End of List

const removeKthFromEndWithoutPrev = (head, k) => {
  let dummy = new Node(-1);
  dummy.next = head;
  let slow = dummy;
  let fast = dummy;

  // move fast to one ahead of k spot so there is a k sized gap between slow and fast and slow will end up to the previous of the node that needs to be deleted.
  for (let i = 0; i <= k; i++) {
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  // head may be removed
  return dummy.next;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneLinkedList = singlyLinkedListFromArray([1]);
const testOneResult = removeKthFromEnd(testOneLinkedList.head, 1);
const testOneExpected = [];

const testOne = runTest(
  stringFromSinglyLinkedList(testOneResult) === testOneExpected.join(""),
  1
);

const testTwoLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testTwoResult = removeKthFromEnd(testTwoLinkedList.head, 4);
const testTwoExpected = [2, 3, 4];

const testTwo = runTest(
  stringFromSinglyLinkedList(testTwoResult) === testTwoExpected.join(""),
  2
);

const testThreeLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testThreeResult = removeKthFromEnd(testThreeLinkedList.head, 3);
const testThreeExpected = [1, 3, 4];

const testThree = runTest(
  stringFromSinglyLinkedList(testThreeResult) === testThreeExpected.join(""),
  3
);

const testFourLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testFourResult = removeKthFromEnd(testFourLinkedList.head, 2);
const testFourExpected = [1, 2, 4];

const testFour = runTest(
  stringFromSinglyLinkedList(testFourResult) === testFourExpected.join(""),
  4
);

const testFiveLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testFiveResult = removeKthFromEnd(testFiveLinkedList.head, 1);
const testFiveExpected = [1, 2, 3];

const testFive = runTest(
  stringFromSinglyLinkedList(testFiveResult) === testFiveExpected.join(""),
  5
);

const testSixLinkedList = singlyLinkedListFromArray([1]);
const testSixResult = removeKthFromEndWithoutPrev(testSixLinkedList.head, 1);
const testSixExpected = [];

const testSix = runTest(
  stringFromSinglyLinkedList(testSixResult) === testSixExpected.join(""),
  6
);

const testSevenLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testSevenResult = removeKthFromEndWithoutPrev(
  testSevenLinkedList.head,
  4
);
const testSevenExpected = [2, 3, 4];

const testSeven = runTest(
  stringFromSinglyLinkedList(testSevenResult) === testSevenExpected.join(""),
  7
);

const testEightLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testEightResult = removeKthFromEndWithoutPrev(
  testEightLinkedList.head,
  3
);
const testEightExpected = [1, 3, 4];

const testEight = runTest(
  stringFromSinglyLinkedList(testEightResult) === testEightExpected.join(""),
  8
);

const testNineLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testNineResult = removeKthFromEndWithoutPrev(testNineLinkedList.head, 2);
const testNineExpected = [1, 2, 4];

const testNine = runTest(
  stringFromSinglyLinkedList(testNineResult) === testNineExpected.join(""),
  9
);

const testTenLinkedList = singlyLinkedListFromArray([1, 2, 3, 4]);
const testTenResult = removeKthFromEndWithoutPrev(testTenLinkedList.head, 1);
const testTenExpected = [1, 2, 3];

const testTen = runTest(
  stringFromSinglyLinkedList(testTenResult) === testTenExpected.join(""),
  10
);

const testArray = [
  testOne,
  testTwo,
  testThree,
  testFour,
  testFive,
  testSix,
  testSeven,
  testEight,
  testNine,
  testTen
];

for (let test of testArray) {
  console.log(test);
}
