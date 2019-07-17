'use strict';
const assert = require('assert');

//------------------------Problem 463:

/*
463. Island Perimeter (Easy)
You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.

Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes" (water inside that isn't connected to the water around the island). One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

 

Example:

Input:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

Output: 16

*/

//------------------------Constraints and Edge Cases:

/*
    - Time: O(NM)
    - There is only max 1 island

*/

//------------------------Inputs and Outputs:

/*
    Input: [[0,1,0,0],
            [1,1,1,0],
            [0,1,0,0],
            [1,1,0,0]]

    Output: 16

    ---

    Input: []

    Output: 0

    ---

*/

//------------------------Approach:

/*
  Iterate through the matrix and if encounter a 1, count how many 0's surround it = edges must add to perimeter
  return perimeter

*/

//------------------------CODE:

/*
    Time: O(NM) 
    Space: O(1)
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
const islandPerimeter = function(grid) {
  /*
      The number of 0's adjacent to each 1 is the the number you add to the perimeter
  */

  let perimeter = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c]) {
        if (!grid[r - 1] || !grid[r - 1][c]) perimeter++;
        if (!grid[r][c - 1] || !grid[r][c - 1]) perimeter++;
        if (!grid[r + 1] || !grid[r + 1][c]) perimeter++;
        if (!grid[r][c - 1] || !grid[r][c - 1]) perimeter++;
      }
    }
  }

  return perimeter;
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(
  islandPerimeter([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]) ===
    16,
  1
);
const testTwo = runTest(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [1, 1, 1, 0]
  ]) === 20,
  2
);
const testThree = runTest(islandPerimeter([[0, 1, 0, 0]]) === 4, 3);
const testFour = runTest(islandPerimeter([]) === 0, 4);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
