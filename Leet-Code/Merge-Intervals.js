'use strict';
const assert = require('assert');

//------------------------Problem 56:

/*
  56. Merge Intervals (Medium)

  Given a collection of intervals, merge all overlapping intervals.

  Example 1:

  Input: [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
  Example 2:

  Input: [[1,4],[4,5]]
  Output: [[1,5]]
  Explanation: Intervals [1,4] and [4,5] are considered overlapping.
  NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.

*/

//------------------------Constraints and Edge Cases:

/*
    - There can be an empty array of intervals
    - The intervals may not be sorted
    - Time: O(NlogN)
    - Space: O(N)

*/

//------------------------Inputs and Outputs:

/*
    ---

    Input: [[1,3],[2,6],[8,10],[15,18]]

    Output: [[1,6],[8,10],[15,18]]

    ---
    
    Input: [[1,4],[4,5]]

    Output: [[1,5]]

    ---

    Input: []

    Output: []

    ---

    Input: [[1,5], [1,4]]

    Output: [[1,5]]

    ---
    
    Input: [[1,4],[2,3]]

    Output: [[1,4]]

    ---

*/

//------------------------Approach:

/*
  - First sort the array based on the 0th index of each interval, if the 0th index is the same then sort based on 1st index
  - Then compare adjacent intervals
    - If there is an overlap - adjust the last interval pushed into the result array 1st index with max of the last result interval and the current interval
    - If there is no overlap then push the current into the result array
  - return the result array

*/

//------------------------CODE:

/*
    Time: O(NlogN)
      (sorting O(NlogN) + linear scan O(N) = O(NlogN))
    Space: O(N)
      (result array)
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

const merge = function(intervals) {
  let result = [];
  intervals = intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] <= b[1]) {
        return -1;
      } else {
        return 1;
      }
    } else if (a[0] < b[0]) {
      return -1;
    } else {
      return 1;
    }
  });

  for (let i = 0; i < intervals.length; i++) {
    let lastI = result[result.length - 1];
    let current = intervals[i];
    if (lastI && current[0] <= lastI[1]) {
      result[result.length - 1] = [lastI[0], Math.max(current[1], lastI[1])];
    } else {
      result.push(current);
    }
  }

  return result;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneResult = merge([[1, 3], [2, 6], [8, 10], [15, 18]]);
const testOneExpected = [[1, 6], [8, 10], [15, 18]];
const testOne = runTest(
  JSON.stringify(testOneResult) === JSON.stringify(testOneExpected),
  1
);

const testTwoResult = merge([[1, 4], [4, 5]]);
const testTwoExpected = [[1, 5]];
const testTwo = runTest(
  JSON.stringify(testTwoResult) === JSON.stringify(testTwoExpected),
  2
);

const testThreeResult = merge([]);
const testThreeExpected = [];
const testThree = runTest(
  JSON.stringify(testThreeResult) === JSON.stringify(testThreeExpected),
  3
);

const testFourResult = merge([[1, 5], [1, 4]]);
const testFourExpected = [[1, 5]];
const testFour = runTest(
  JSON.stringify(testFourResult) === JSON.stringify(testFourExpected),
  4
);

const testFiveResult = merge([[1, 4], [2, 3]]);
const testFiveExpected = [[1, 4]];
const testFive = runTest(
  JSON.stringify(testFiveResult) === JSON.stringify(testFiveExpected),
  5
);

const testArray = [testOne, testTwo, testThree, testFour, testFive];

for (let test of testArray) {
  console.log(test);
}
