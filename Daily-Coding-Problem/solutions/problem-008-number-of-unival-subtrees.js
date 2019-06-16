'use strict';
const assert = require('assert');

//------------------------Problem 8:

/*

This problem was asked by Google.

A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.

Given the root to a binary tree, count the number of unival subtrees.

For example, the following tree has 5 unival subtrees:

         0
        / \
       1   0
          / \
         1   0
        / \
       1   1


Level: Easy


*/

//------------------------Constraints and Edge Cases:

/*
    - Edge Cases:
      - Tree could have just one node --> 1 unival subtree
      - So there will always be at least 1 unival subtree in each tree with at least one node
    - Cases: 
      - leaf - increment unival counter
      - subtree root with a value that is the same as it's right and its left nodes - increment unival counter
      - subtree root with either a right or a left with a value equal to the subtree root's value and the other being a null node - increment unival counter
      - subtree root with a right and/ or left node with values that are not equal to the root's value

*/

//------------------------Inputs and Outputs:

/*
    Input: root of following tree

         0
        / \
       1   0
          / \
         1   0
        / \
       1   1

    Output: 5
    

    ---

    Input:  1

    Output: 1

    ---

*/

//------------------------Approach:

/*
    Do post-order DFS - compare left subtree and right subtree with the root of the subtree - if they are same to the root of subtree then increment unival counter by 1, account for cases listed above
*/

//------------------------CODE:

/*
    Time:  O(N) where N is each node in the tree
    Space: O(N) where there are N number of stacks on the call stack
*/

/*

         0
        / \
       1   0
          / \
         1   0
        / \
       1   1


*/

class Node {
  constructor(val) {
    this.val = val;
    this.right = null;
    this.left = null;
  }
}

function univalSubtreeCounter(root) {
  let univalCounter = 0;
  function compareSubtrees(current) {
    console.log(current);
    if (current === null) {
      return true;
    }

    let left = compareSubtrees(current.left);
    let right = compareSubtrees(current.right);

    if (
      (left === true || left === current.val) &&
      (right === true || right === current.val)
    ) {
      univalCounter++;
      return current.val;
    } else {
      return false;
    }
  }

  compareSubtrees(root);
  return univalCounter;
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

/*
treeOne

         0
        / \
       1   0
          / \
         1   0
        / \
       1   1

  Output = 5
*/

const rootOne = new Node(0);
rootOne.left = new Node(1);
rootOne.right = new Node(0);
rootOne.right.left = new Node(1);
rootOne.right.right = new Node(0);
rootOne.right.left.left = new Node(1);
rootOne.right.left.right = new Node(1);

/*
treeTwo
    1

    Output = 1
*/
const rootTwo = new Node(1);

/*
treeThree
       a
      / \
      a   a
          /\
          a  a
              \
               A

  Output = 3
*/

const rootThree = new Node('a');
rootThree.left = new Node('a');
rootThree.right = new Node('a');
rootThree.right.left = new Node('a');
rootThree.right.right = new Node('a');
rootThree.right.right.right = new Node('A');

/*
treeFour

     a
    / \
    c   b
        /\
        b  b
            \
             b
  Output = 5
*/

const rootFour = new Node('a');
rootFour.left = new Node('c');
rootFour.right = new Node('b');
rootFour.right.left = new Node('b');
rootFour.right.right = new Node('b');
rootFour.right.right.right = new Node('b');

/*
treeFive

null Node

Output = 1

*/
const rootFive = new Node();

const testOne = runTest(univalSubtreeCounter(rootOne) === 5, 1);
const testTwo = runTest(univalSubtreeCounter(rootTwo) === 1, 2);
const testThree = runTest(univalSubtreeCounter(rootThree) === 3, 3);
const testFour = runTest(univalSubtreeCounter(rootFour) === 5, 4);
const testFive = runTest(univalSubtreeCounter(rootFive) === 1, 5);

const testArray = [testOne, testTwo, testThree, testFour, testFive];

for (let test of testArray) {
  console.log(test);
}
