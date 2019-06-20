'use strict';
const assert = require('assert');

//------------------------Problem 12:

/*

  This problem was asked by Amazon.

  There exists a staircase with N steps, and you can climb up either 1 or 2 steps at a time. Given N, write a function that returns the number of unique ways you can climb the staircase. The order of the steps matters.

  For example, if N is 4, then there are 5 unique ways:

  1, 1, 1, 1
  2, 1, 1
  1, 2, 1
  1, 1, 2
  2, 2

  What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

  Level: Hard


*/

//------------------------Constraints and Edge Cases:

/*
    - If there are no ways to climb up stairs return 0
    - Must return only the number of unique ways to climb up stairs using 1 step or 2 steps
    - N is a positive number greater than 0

*/

//------------------------Inputs and Outputs:

/*
    Input:  N = 4

    Output: 5
      1,1,1,1
      2,1,1
      1,2,1
      1,1,2
      2,2

    ---

    Input: N = 5

    Output: 8

    ---

*/

//------------------------Approach:

/*
    - Can be done using recursion (O(2^N)) or optimized using Memoization and Tabulation
    - Climbing up stairs is the same as the fibonacci sequence as you need to add up the previous and the previous previous steps possible ways to get the current step unique ways.
*/

//------------------------CODE:

/*
    Recursion
    Time: O(2^N)
    Space: O(2^N)
*/

function stepRecursion(n) {
  if (n === 0) return 1;
  if (n < 0) return 0;
  return stepRecursion(n - 1) + stepRecursion(n - 2);
}

/*  
    Memoization - top down
    Time: O(N)
    Space: O(N)
*/

function stepMemo(n) {
  let cache = {};
  function findWays(n) {
    if (n === 0) return 1;
    if (n < 0) return 0;
    if (cache[n]) return cache[n];
    return (cache[n] = stepMemo(n - 1) + stepMemo(n - 2));
  }
  return findWays(n);
}

/*
    Tabulation - bottom up
    Time: O(N)
    Space: O(N)
*/

function stepTab(n) {
  let arr = [1, 2];
  if (n < 3) return arr[n - 1];
  for (let i = 3; i <= n; i++) {
    [arr[0], arr[1]] = [arr[1], arr[0] + arr[1]];
  }
  return arr[1];
}

//------------------------Modification:

/*

    What if, instead of being able to climb 1 or 2 steps at a time, you could climb any number from a set of positive integers X? For example, if X = {1, 3, 5}, you could climb 1, 3, or 5 steps at a time.

    Input: N = 10 set = {1,3,5}
    Output: 47
*/

/*
  Recursion

    Time: O((2^N)*M)
    Space: O((2^N)*M)

*/
function stepRecursionMod(n, set) {
  let sum = 0;
  if (n === 0) return 1;
  if (n < 0) return 0;

  set.forEach(step => {
    sum += stepRecursionMod(n - step, set);
  });

  return sum;
}

/*
  Memoization

    Time: O(N*M)
    Space: O(N*M)
*/

function stepMemoMod(n, set) {
  let cache = {};

  function findWays(n, set) {
    let sum = 0;
    if (n === 0) return 1;
    if (n < 0) return 0;

    if (cache[n]) return cache[n];

    set.forEach(step => {
      sum += stepMemoMod(n - step, set);
    });

    return (cache[n] = sum);
  }

  return findWays(n, set);
}

/*
  Tabulation

    Time: O(N*M)
    Space: O(N*M)
*/

function stepTabMod(n, set) {
  let arr = new Array(n + 1).fill(0);
  set.forEach(step => {
    arr[step] = 1;
  });

  for (let i = 1; i <= n; i++) {
    set.forEach(step => {
      if (arr[i - step]) {
        arr[i] += arr[i - step];
      }
    });
  }

  return arr[n];
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const set = new Set();
set.add(1);
set.add(3);
set.add(5);

const testOne = runTest(stepRecursion(4) === 5, 1);
const testTwo = runTest(stepMemo(4) === 5, 2);
const testThree = runTest(stepTab(4) === 5, 3);
const testFour = runTest(stepRecursion(5) === 8, 4);
const testFive = runTest(stepRecursion(5) === 8, 5);
const testSix = runTest(stepRecursion(5) === 8, 6);
const testSeven = runTest(stepRecursionMod(10, set) === 47, 7);
const testEight = runTest(stepMemoMod(10, set) === 47, 8);
const testNine = runTest(stepTabMod(10, set) === 47, 9);

const testArray = [
  testOne,
  testTwo,
  testThree,
  testFour,
  testFive,
  testSix,
  testSeven,
  testEight,
  testNine
];

for (let test of testArray) {
  console.log(test);
}
