'use strict';
const assert = require('assert');

//------------------------Problem 10:

/*

  This problem was asked by Apple.

  Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.

  Level: Medium


*/

//------------------------Approach:

/*
  Use setTimeout to executes f after n milliseconds

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(1)
*/

function jobScheduler(f, n) {
  setTimeout(f, n);
}

//------------------------TESTS:

function printHello() {
  console.log('Hello');
  return 'hello';
}

function countToTen() {
  for (let i = 1; i < 11; i++) {
    console.log(i);
  }
}

console.log(jobScheduler(printHello, 5000));
console.log(jobScheduler(countToTen, 10000));
