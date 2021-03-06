'use strict';
const assert = require('assert');

//------------------------Problem 102:

/*

  102. Binary Tree Level Order Traversal (Medium)

  Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

  For example:
  Given binary tree [3,9,20,null,null,15,7],
      3
    / \
    9  20
      /  \
    15   7
  return its level order traversal as:
  [
    [3],
    [9,20],
    [15,7]
  ]
*/

//------------------------Constraints and Edge Cases:

/*
    - Time O(N)
    - Space O(N)
    - the root can be null

*/

//------------------------Inputs and Outputs:

/*
    Input: [3,9,20,null,null,15,7]

    Output: [[15,7], [9,20], [3]]

    ---

    Input: []

    Output: []

    ---

    Input: [3]

    Output: [[3]]

    ---

    Input: [3,9,20,null,null,15,7,8,6,4,1]

    Output: [[8,6,4,1], [15,7], [9,20], [3]]

    ---
*/

//------------------------Approach:

/*
  - Use BFS (Breadth First Search) traversal using a queue
  - take the length of the queue to get the right number of nodes for each level
  - Can also use BFS for problems to find the length of the longest path in a tree
  - reverse the result before it is returned

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/

class TreeNode {
  constructor(val) {
    this.val = val;
    this.right = this.left = null;
  }
}

const levelOrderBottom = function(root) {
  let result = [];
  if (root === null) {
    return result;
  }
  // BFS uses a queue
  let queue = [];
  queue.push(root);
  while (queue.length > 0) {
    let levelList = [];
    let len = queue.length; // snapshot length of the queque to determine the level
    for (let i = 0; i < len; i++) {
      let current = queue.shift(); // dequeue
      levelList.push(current.val);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    result.push(levelList);
    // result.unshift(levelList); // alt.
  }
  // return result; // alt.
  return result.reverse();
};

//------------------------TESTS:

// Array into Binary Tree:

function deserialize(arr) {
  if (arr.length == 0) return null;
  let root = new TreeNode(arr[0]);
  let queue = [root];
  // [1,2,3,4]

  for (let i = 1; i < arr.length; i = i + 2) {
    let current = queue.shift();
    if (arr[i] !== null) {
      let newLeft = new TreeNode(arr[i]);
      current.left = newLeft;
      queue.push(newLeft);
    }
    if (i + 1 < arr.length && arr[i + 1] !== null) {
      let newRight = new TreeNode(arr[i + 1]);
      current.right = newRight;
      queue.push(newRight);
    }
  }
  return root;
}

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const rootOne = deserialize([3, 9, 20, null, null, 15, 7]);
const resultOne = levelOrderBottom(rootOne);
const expectedOne = [[15, 7], [9, 20], [3]];
const testOne = runTest(
  JSON.stringify(resultOne) === JSON.stringify(expectedOne),
  1
);

const rootTwo = deserialize([]);
const resultTwo = levelOrderBottom(rootTwo);
const expectedTwo = [];
const testTwo = runTest(
  JSON.stringify(resultTwo) === JSON.stringify(expectedTwo),
  2
);

const rootThree = deserialize([3]);
const resultThree = levelOrderBottom(rootThree);
const expectedThree = [[3]];
const testThree = runTest(
  JSON.stringify(resultThree) === JSON.stringify(expectedThree),
  3
);

const rootFour = deserialize([3, 9, 20, null, null, 15, 7, 8, 6, 4, 1]);
const resultFour = levelOrderBottom(rootFour);
const expectedFour = [[8, 6, 4, 1], [15, 7], [9, 20], [3]];
const testFour = runTest(
  JSON.stringify(resultFour) === JSON.stringify(expectedFour),
  4
);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
