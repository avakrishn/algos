'use strict';
const assert = require('assert');

//------------------------Problem:

/*
  172. Factorial Trailing Zeroes (Easy)

  Given an integer n, return the number of trailing zeroes in n!.

  Example 1:

  Input: 3
  Output: 0
  Explanation: 3! = 6, no trailing zero.
  Example 2:

  Input: 5
  Output: 1
  Explanation: 5! = 120, one trailing zero.
  Note: Your solution should be in logarithmic time complexity.

*/

//------------------------Constraints and Edge Cases:

/*
    - T(n) : O(logN)
    - Space : O(1)

*/

//------------------------Inputs and Outputs:

/*
    Input: 8

    Output: 1

    ---

    Input: 30 

    Output: 7

    ---

    Input: 3 

    Output: 0

    ---

    Input: 5 

    Output: 1

    ---

*/

//------------------------Approach:

/*
  - We can't simply multiply out n! and count number of 0s since n! may be too big to fit in an int/long.
  - Trailing 0's are created by 2's and 5's. Since we will always have more 2's than 5's, the 5's will determine # of 0's.
  - One solution is to count # of factors of 5's in each term of the factorial (1...n), however, this is a time-intensive solution
  - Instead, count multiples of 5 (btwn 1 and n), then multiples of 25, then 125... using a for loop that gives us n/5 + n/25 + n/125 + n/625 + ...;

*/

//------------------------CODE:

/*
    Time: O(logN)
    Space: O(1)
*/

const trailingZeroes = function(n) {
  if (n < 5) {
    return 0;
  }
  let numFives = 0;

  for (let i = 5; i <= n; i *= 5) {
    // i is 5, 25, 125, 625 ...
    numFives += Math.floor(n / i); // to count how many multiples of "i" are in range 1...n, we just do n/i
  }
  return numFives;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(trailingZeroes(8) === 1, 1);
const testTwo = runTest(trailingZeroes(30) === 7, 2);
const testThree = runTest(trailingZeroes(3) === 0, 3);
const testFour = runTest(trailingZeroes(5) === 1, 4);
const testFive = runTest(trailingZeroes(646) === 160, 5);

const testArray = [testOne, testTwo, testThree, testFour, testFive];

for (let test of testArray) {
  console.log(test);
}
