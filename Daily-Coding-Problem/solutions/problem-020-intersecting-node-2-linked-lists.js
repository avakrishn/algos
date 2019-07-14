'use strict';
const assert = require('assert');

//------------------------Problem 20:

/*
  This problem was asked by Google.

  Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.

  For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.

  In this example, assume nodes with the same value are the exact same node objects.

  Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

  For example, the following two linked lists:

  A:         a1 --> a2 
                      \
                        c1 --> c2 --> c3
                      / 
  B:   b1 --> b2 --> b3

  begin to intersect at node c1.

  Example 1:
  A:         4 --> 1 
                      \
                        8 --> 4 --> 5
                      / 
  B:   5 --> 0 --> 1

  begin to intersect at node 8.

      Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,0,1,8,4,5], skipA = 2, skipB = 3
      Output: Reference of the node with value = 8
      Input Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,0,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.

    Example 2:
      A:     0 --> 9 --> 1 
                          \
                            2 --> 4
                          / 
      B:                 3

      begin to intersect at node 2.

        Input: intersectVal = 2, listA = [0,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
        Output: Reference of the node with value = 2
        Input Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect). From the head of A, it reads as [0,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.

    Example 3: 

    A: 2 --> 6 --> 4

    B:       1 --> 5 

    No intersection

        Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
        Output: null
        Input Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
        Explanation: The two lists do not intersect, so return null.



    If the two linked lists have no intersection at all, return null.
    The linked lists must retain their original structure after the function returns.
    You may assume there are no cycles anywhere in the entire linked structure.
    Your code should preferably run in O(n) ~ O(N+M) time (where N is the length of linked list 1 and M is the length of linked list 2) and use only O(1) memory.

    Level: Easy
*/

//------------------------Constraints and Edge Cases:

/*
    - If the two linked lists have no intersection at all, return null.
    - The linked lists must retain their original structure after the function returns.
    - You may assume there are no cycles anywhere in the entire linked structure.
    - Your code should preferably run in O(n) ~ O(N+M) time (where N is the length of linked list 1 and M is the length of linked list 2) and use only O(1) memory.

*/

//------------------------Inputs and Outputs:

/*
    Input: 
      A:         4 --> 1 
                        \
                          8 --> 4 --> 5
                        / 
      B:   5 --> 0 --> 1

    Output: Intersected at Node '8'

    ---

    Input: 
      A:     0 --> 9 --> 1 
                          \
                            2 --> 4
                          / 
      B:                 3


    Output: Intersected at Node '2'

    ---

    Input: 
        A: 2 --> 6 --> 4

        B:       1 --> 5 

    Output: No Interection

    ---

*/

//------------------------Approach:

/*
  - Two Pointer Approach
    - Set a pointer = headA
    - Set b pointer = headB
    - When a reaches end of the linkedlist a then set a = headB
    - When b reaches end of the linkedlist b then set b = headA
    - if ever a === b then return the Intersected Node
    - else if the two linked lists are not intersecting then the tails of the linked lists will not match and can return No Intersection
    
    - Time: O(M + N) time (where M and N are the lengths of the lists) 
    - Space: O(1)

    - Not manipulating the original linked lists
*/

//------------------------CODE:

/*
    Time: O(M+N)
    Space:  O(1)
*/

//  Definition for singly-linked list.
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function(headA, headB) {
  if (headA === null || headB === null) {
    // return null;
    return 'No Intersection';
  }
  let a = headA;
  let b = headB;
  let same = true;
  let aEnd, bEnd;
  while (same) {
    if (a === b) {
      // return a;
      return `Intersected at Node '${a.val}'`;
    }

    if (a.next === null) {
      aEnd = a;
      a = headB;
      if (b.next !== null) {
        b = b.next;
      } else {
        bEnd = b;
        b = headA;
      }
    } else if (b.next === null) {
      bEnd = b;
      b = headA;
      if (a.next !== null) {
        a = a.next;
      } else {
        aEnd = a;
        a = headB;
      }
    } else {
      a = a.next;
      b = b.next;
    }

    if (aEnd && bEnd && aEnd !== bEnd) {
      same = false;
    }
  }
  // return null;
  return 'No Intersection';
};

//------------------------TESTS:

function createLinkedLists(arr1, arr2, intNodeVal) {
  let lL1 = null,
    lL2 = null,
    intersection,
    cur1,
    cur2;

  for (let i = 0; i < arr1.length; i++) {
    if (i === 0) {
      lL1 = new ListNode(arr1[i]);
      cur1 = lL1;
    } else {
      cur1.next = new ListNode(arr1[i]);
      cur1 = cur1.next;
    }
    if (arr1[i] === intNodeVal) {
      intersection = cur1;
    }
  }
  for (let j = 0; j < arr2.length; j++) {
    if (j === 0) {
      lL2 = new ListNode(arr2[j]);
      cur2 = lL2;
    } else {
      cur2.next = new ListNode(arr2[j]);
      cur2 = cur2.next;
    }
    if (arr2[j] === intNodeVal) {
      cur2.next = intersection;
      break;
    }
  }

  return [lL1, lL2];
}

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

let lLArrOne = createLinkedLists([4, 1, 8, 4, 5], [5, 0, 1, 8, 4, 5], 8);
let lLArrTwo = createLinkedLists([0, 9, 1, 2, 4], [3, 2, 4], 2);
let lLArrThree = createLinkedLists([2, 6, 4], [1, 5]);
let lLArrFour = createLinkedLists([], [2]);
let lLArrFive = createLinkedLists([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21], [2]);
let lLArrSix = createLinkedLists([1], [2]);
let lLArrSeven = createLinkedLists(
  [1],
  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
);

const testOne = runTest(
  getIntersectionNode(lLArrOne[0], lLArrOne[1]) === "Intersected at Node '8'",
  1
);

const testTwo = runTest(
  getIntersectionNode(lLArrTwo[0], lLArrTwo[1]) === "Intersected at Node '2'",
  2
);

const testThree = runTest(
  getIntersectionNode(lLArrThree[0], lLArrThree[1]) === 'No Intersection',
  3
);

const testFour = runTest(
  getIntersectionNode(lLArrFour[0], lLArrFour[1]) === 'No Intersection',
  4
);

const testFive = runTest(
  getIntersectionNode(lLArrFive[0], lLArrFive[1]) === 'No Intersection',
  5
);

const testSix = runTest(
  getIntersectionNode(lLArrSix[0], lLArrSix[1]) === 'No Intersection',
  6
);

const testSeven = runTest(
  getIntersectionNode(lLArrSeven[0], lLArrSeven[1]) === 'No Intersection',
  7
);

const testArray = [
  testOne,
  testTwo,
  testThree,
  testFour,
  testFive,
  testSix,
  testSeven
];

for (let test of testArray) {
  console.log(test);
}
