'use strict';
const assert = require('assert');

//------------------------Problem 19:

/*

This problem was asked by Facebook.

A builder is looking to build a row of N houses that can be of K different colors. He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.

Given an N by K matrix where the nth row and kth column represents the cost to build the nth house with kth color, return the minimum cost which achieves this goal.

Level: Medium


*/

//------------------------Constraints and Edge Cases:

/*
    - Time: O(NK)
    - You have to paint all the houses such that no two adjacent houses have the same color.
    - Questions what if only one color available (1 column) and multiple houses --> This is not a valid case
    - rows corresponds to the house number and columns correspond to the color number

*/

//------------------------Inputs and Outputs:

/*
    Input: [[1,5,3], [2,9,4]]

    Output: 5

    ---

    Input: [[14,2,11],[11,14,5],[14,3,10]]

    Output: 10
    The three house use color [1,2,1] for each house. The total cost is 10.

    ---

    Input: [[5]]

    Output: 5
    There is only one color and one house.
*/

//------------------------Approach:

/*
  Tabulation
    Matrix: [[14,2,11],
            [11,14,5],
            [14,3,10]]

    - Using the matrix first find the min and second min for the first row
        min = [index, number] = [1, 2]
        secondMin = [index, number] = [2, 11]
    
    - for the remaining rows
        - if the current number(matrix[r][c]) is in the column of the previous row min
            current number += previous row second min [1]
        - else 
            current number += previous row min [1]
        - in each row keep track of the new min and secondMin after the addition
        - at the end of each row update the values of min and secondMin

      initially:

      matrix = [[14,2,11],
                [11,14,5],
                [14,3,10]]

      min = [1,2]
      secondMin = [2,11]

      after iterating through second row:

      matrix = [[14,2,11],
                [13,25,7],
                [14,3,10]]

      min = [2,7]
      secondMin = [0,13]

      after iterating through third row:

      matrix = [[14,2,11],
                [13,25,7],
                [21,10,23]]

      min = [1,10]
      secondMin = [0,21]

    - after do Tabulation through entire matrix return min[1] = 10


*/

//------------------------CODE:

/*
    Time: O(MN) -> going through each element in matrix once
    Space: O(1)
*/

function colorHouses(costs) {
  let rows = costs.length;
  let columns = costs[0].length;
  //column index, number
  let min = [-1, Infinity];
  let secondMin = [-1, Infinity];

  for (let c = 0; c < columns; c++) {
    if (costs[0][c] < min[1]) {
      secondMin = min;
      min = [c, costs[0][c]];
    } else if (costs[0][c] < secondMin[1]) {
      secondMin = [c, costs[0][c]];
    }
  }

  for (let r = 1; r < rows; r++) {
    let tempMin = [-1, Infinity];
    let tempSeconMin = [-1, Infinity];
    for (let c = 0; c < columns; c++) {
      if (c === min[0]) {
        costs[r][c] += secondMin[1];
      } else {
        costs[r][c] += min[1];
      }

      let current = costs[r][c];
      if (current < tempMin[1]) {
        tempSeconMin = tempMin;
        tempMin = [c, current];
      } else if (current < tempSeconMin[1]) {
        tempSeconMin = [c, current];
      }
    }
    min = tempMin;
    secondMin = tempSeconMin;
  }
  return min[1];
}

// ------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};
const testOneResult = colorHouses([[4, 2, 11], [11, 5, 14], [14, 3, 6]]);
const testOne = runTest(testOneResult === 15, 1);

const testTwoResult = colorHouses([[4, 2, 11], [11, 5, 14], [14, 3, 10]]);
const testTwo = runTest(testTwoResult === 16, 2);

const testThreeResult = colorHouses([[14, 2, 11], [11, 14, 5], [14, 3, 10]]);
const testThree = runTest(testThreeResult === 10, 3);

const testFourResult = colorHouses([[1, 5, 3], [2, 9, 4]]);
const testFour = runTest(testFourResult === 5, 4);

const testFiveResult = colorHouses([[5]]);
const testFive = runTest(testFiveResult === 5, 5);

const testArray = [testOne, testTwo, testThree, testFour, testFive];

for (let test of testArray) {
  console.log(test);
}
