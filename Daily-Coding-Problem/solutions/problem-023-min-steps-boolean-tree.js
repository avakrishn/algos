'use strict';
const assert = require('assert');

//------------------------Problem 23:

/*
This problem was asked by Google.

You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. Each False boolean represents a tile you can walk on.

Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. If there is no possible path, then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.

For example, given the following board:

[[f, f, f, f],
[t, t, f, t],
[f, f, f, f],
[f, f, f, f]]
and start = (3, 0) (bottom left) and end = (0, 0) (top left), the minimum number of steps required to reach the end is 7, since we would need to go through (1, 2) because there is a wall everywhere else on the second row.

Level: Easy

*/

//------------------------Constraints and Edge Cases:

/*
    - The array can be any M*N and start and end can be any row, col coordinate
    - Edge cases:
      - Can't get from start to end
      - if either start or end is on a wall 't'
      - coordinates are not within bounds of the matrix
    - Time: O(MN) - iterate through each element in matrix once
    - Space: O(MN) - can have every element from matrix inside the set or queue
*/

//------------------------Inputs and Outputs:

/*
    Input: matrix = [[f, f, f, f],  
                    [t, t, f, t],
                    [f, f, f, f],
                    [f, f, f, f]]
          start = [3,0], 
          end = [0,0]

    Output: 7

    ---

    Input: matrix = [['f']], start = [0,0], end = [0,0]

    Output: 0

    ---

    Input: matrix = [['t']], start = [0,0], end = [0,0]

    Output: null

*/

//------------------------Approach:

/*
  Use BFS approach to find the shortest path
    - set start's value = 0
    - add start to queue
    - while queue is not empty
      - current = dequeue 
      - if reach end then break out of loop
      - else if up, down, right, left exists then increment the positions value by 1 + current's value
        - if it is not in the seen hash then add to seen hash and queue
    -consider edge cases - return null
*/

//------------------------CODE:

/*
    Time: O(MN)
    Space: O(MN)
*/

function minSteps(matrix, start, end) {
  let rows = matrix.length;
  let cols = matrix[0].length;
  if (
    matrix[start[0]][start[1]] === 't' ||
    matrix[end[0]][end[1]] === 't' ||
    end[0] < 0 ||
    end[0] >= rows ||
    end[1] < 0 ||
    end[1] >= cols
  ) {
    return null;
  }
  let queue = [];
  let seen = {};

  matrix[start[0]][start[1]] = 0;
  queue.push([start, 0]);
  seen[`${start[0]}-${start[0]}`] = true;

  while (queue.length > 0) {
    let current = queue.shift();
    let value = 1 + current[1];
    let curr_row = current[0][0];
    let curr_col = current[0][1];
    if (curr_row === end[0] && curr_col === end[1]) {
      break;
    }
    // row above
    if (curr_row - 1 > -1 && matrix[curr_row - 1][curr_col] !== 't') {
      let above = matrix[curr_row - 1][curr_col];
      if (above === 'f') {
        matrix[curr_row - 1][curr_col] = value;
      } else {
        matrix[curr_row - 1][curr_col] = Math.min(value, above);
      }
      if (!seen[`${curr_row - 1}-${curr_col}`]) {
        queue.push([[curr_row - 1, curr_col], matrix[curr_row - 1][curr_col]]);
        seen[`${curr_row - 1}-${curr_col}`] = true;
      }
    }

    // row below
    if (curr_row + 1 < rows && matrix[curr_row + 1][curr_col] !== 't') {
      let below = matrix[curr_row + 1][curr_col];
      if (below === 'f') {
        matrix[curr_row + 1][curr_col] = value;
      } else {
        matrix[curr_row + 1][curr_col] = Math.min(value, below);
      }
      if (!seen[`${curr_row + 1}-${curr_col}`]) {
        queue.push([[curr_row + 1, curr_col], matrix[curr_row + 1][curr_col]]);
        seen[`${curr_row + 1}-${curr_col}`] = true;
      }
    }

    // col left
    if (curr_col - 1 > -1 && matrix[curr_row][curr_col - 1] !== 't') {
      let left = matrix[curr_row][curr_col - 1];
      if (left === 'f') {
        matrix[curr_row][curr_col - 1] = value;
      } else {
        matrix[curr_row][curr_col - 1] = Math.min(value, left);
      }
      if (!seen[`${curr_row}-${curr_col - 1}`]) {
        queue.push([[curr_row, curr_col - 1], matrix[curr_row][curr_col - 1]]);
        seen[`${curr_row}-${curr_col - 1}`] = true;
      }
    }

    // col right
    if (curr_col + 1 < cols && matrix[curr_row][curr_col + 1] !== 't') {
      let right = matrix[curr_row][curr_col + 1];
      if (right === 'f') {
        matrix[curr_row][curr_col + 1] = value;
      } else {
        matrix[curr_row][curr_col + 1] = Math.min(value, right);
      }
      if (!seen[`${curr_row}-${curr_col + 1}`]) {
        queue.push([[curr_row, curr_col + 1], matrix[curr_row][curr_col + 1]]);
        seen[`${curr_row}-${curr_col + 1}`] = true;
      }
    }
  }

  if (matrix[end[0]][end[1]] !== 'f') {
    return matrix[end[0]][end[1]];
  } else {
    return null;
  }
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneMatrix = [
  ['f', 'f', 'f', 'f'],
  ['t', 't', 'f', 't'],
  ['f', 'f', 'f', 'f'],
  ['f', 'f', 'f', 'f']
];
const testOneStart = [3, 0];
const testOneEnd = [0, 0];

const testOne = runTest(
  minSteps(testOneMatrix, testOneStart, testOneEnd) === 7,
  1
);
const testTwo = runTest(minSteps([['f']], [0, 0], [0, 0]) === 0, 2);

const testThree = runTest(minSteps([['t']], [0, 0], [0, 0]) === null, 3);

const testFourMatrix = [
  ['f', 'f', 'f', 'f'],
  ['t', 't', 't', 't'],
  ['f', 'f', 'f', 'f'],
  ['f', 'f', 'f', 'f']
];
const testFourStart = [3, 0];
const testFourEnd = [0, 0];

const testFour = runTest(
  minSteps(testFourMatrix, testFourStart, testFourEnd) === null,
  4
);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
