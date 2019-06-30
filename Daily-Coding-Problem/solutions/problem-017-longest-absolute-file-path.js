'use strict';
const assert = require('assert');

//------------------------Problem 17:

/*

This problem was asked by Google.

Suppose we represent our file system by a string in the following manner:

The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

dir
    subdir1
    subdir2
        file.ext
The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:

dir
    subdir1
        file1.ext
        subsubdir1
    subdir2
        subsubdir2
            file2.ext
The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.

Note:

The name of a file contains at least a period and an extension.

The name of a directory or sub-directory will not contain a period.


Level: Hard

*/

//------------------------Constraints and Edge Cases:

/*
    - Time: O(N)
    - If no file path return 0 otherwise return the longest file path eg. "dir/subdir2/subsubdir2/file2.ext" has a length of 32

*/

//------------------------Inputs and Outputs:

/*
    Input: "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"

    Output: 20

    ---

    Input: "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"

    Output: 32

    ---

    Input: "dir\n\tsubdir1\n\tsubdir2"

    Output: 0

    ---

*/

//------------------------Approach:

/*
  (Using a Stack)
  1. Take input and split input on '\n'
  2. initialize variables
    - longestLen = 0
    - currentTree (stack)
    - currentLevel = 0
  3. Map over each element in the split input array
    a. Take each element and split on '\t'
    b. name = last element in split element array
    c. level = length of split element array
    d. if level is less than or equal to the current level then currentTree is equal to currentTree up until previous level
    e. if name includes '.' then we have reached a file
      - calculate path length
      - set longestlength = max of itself and the new path length
    f. set currentLevel equal to level
    g. push the name into currentTree
  4. return longestLen
*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/

/**
 * @param {string} input
 * @return {number}
 */

const lengthLongestPath = function(input) {
  let split = input.split('\n');
  let longestLen = 0;
  let currentTree = [];
  let currentLevel = 0;

  split.map(nestedEl => {
    let splitNested = nestedEl.split('\t');
    let name = splitNested[splitNested.length - 1];
    let level = splitNested.length;
    if (level <= currentLevel) {
      currentTree = currentTree.slice(0, level - 1);
    }
    if (name.includes('.')) {
      let newPath = currentTree.join('') + '-' + name;
      let currentLen = newPath.length - 1;
      longestLen = Math.max(longestLen, currentLen);
    }
    currentLevel = level;
    currentTree.push(`-${name}`);
  });
  return longestLen;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(
  lengthLongestPath('dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext') === 20,
  1
);
const testTwo = runTest(
  lengthLongestPath(
    'dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext'
  ) === 32,
  2
);
const testThree = runTest(
  lengthLongestPath('dir\n\tsubdir1\n\tsubdir2') === 0,
  3
);

const testArray = [testOne, testTwo, testThree];

for (let test of testArray) {
  console.log(test);
}
