'use strict';
const assert = require('assert');

//------------------------Problem 9:

/*

  This problem was asked by Airbnb.

  Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.

  For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

  Follow-up: Can you do this in O(N) time and constant space?

  Level: Hard


*/

//------------------------Constraints and Edge Cases:

/*
    - Largest sum of NON-ADJACENT numbers
    - Numbers can be 0 or negative
    - Time: O(N)
    - Space: O(1)

*/

//------------------------Inputs and Outputs:

/*
    Input: [2, 4, 6, 2, 5] 

    Output: 13

    ---

    Input: [1, 2, 3, 1]

    Output: 4

    ---

    Input: [2, 7, 9, 3, 1]

    Output: 12

    ---

    Input: [5, 1, 1, 5]

    Output: 10

    ---

    Input: []

    Output: 0

    ---

    Input: [-3, -4, -5]

    Output: 0

    ---

    Input: [1,2]

    Output: 2

    ---

    Input: [10]

    Output: 10

    ---

    

*/

//------------------------Approach:

/*
  Use Tabulation - 
    either you chose the number and add to total and move the index by 2 or you skip the number, keep total the same, and move index by one

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/

var rob = function(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let arr = new Array(nums.length).fill(0);
  let onePrev = -Infinity; // arr[i-1]
  let twoPrev = -Infinity; // arr[i-2]

  for (let i = 0; i < nums.length; i++) {
    arr[i] = Math.max(onePrev, twoPrev + nums[i], nums[i], arr[i]);
    [onePrev, twoPrev] = [arr[i], onePrev];
  }

  return arr[nums.length - 1];
};

//------------------------Optimized:

/*
    Time: O(N)
    Space: O(1)
*/

var robOptimized = function(nums) {
  let onePrev = -Infinity;
  let twoPrev = -Infinity;
  let current = 0;

  for (let i = 0; i < nums.length; i++) {
    current = Math.max(onePrev, twoPrev + nums[i], nums[i], current);
    [onePrev, twoPrev] = [current, onePrev];
  }

  return current;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(rob([2, 4, 6, 2, 5]) === 13, 1);
const testTwo = runTest(rob([1, 2, 3, 1]) === 4, 2);
const testThree = runTest(rob([2, 7, 9, 3, 1]) === 12, 3);
const testFour = runTest(rob([5, 1, 1, 5]) === 10, 4);
const testFive = runTest(rob([]) === 0, 5);
const testSix = runTest(rob([1, 2]) === 2, 6);
const testSeven = runTest(rob([10]) === 10, 7);
const testEight = runTest(rob([-3, -4, -5]) === 0, 8);
const testNine = runTest(rob([0]) === 0, 9);
const testTen = runTest(robOptimized([2, 4, 6, 2, 5]) === 13, 10);
const testEleven = runTest(robOptimized([1, 2, 3, 1]) === 4, 11);
const testTwelve = runTest(robOptimized([2, 7, 9, 3, 1]) === 12, 12);
const testThirteen = runTest(robOptimized([5, 1, 1, 5]) === 10, 13);
const testFourteen = runTest(robOptimized([]) === 0, 14);
const testFifteen = runTest(robOptimized([1, 2]) === 2, 15);
const testSixteen = runTest(robOptimized([10]) === 10, 16);
const testSeventeen = runTest(robOptimized([-3, -4, -5]) === 0, 17);
const testEighteen = runTest(robOptimized([0]) === 0, 18);

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
  testTen,
  testEleven,
  testTwelve,
  testThirteen,
  testFourteen,
  testFifteen,
  testSixteen,
  testSeventeen,
  testEighteen
];

for (let test of testArray) {
  console.log(test);
}
