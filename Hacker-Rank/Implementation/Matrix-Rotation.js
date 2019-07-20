'use strict';
const assert = require('assert');
/*
  Code for Matrix Rotation Hackerrank Problem:
  https://www.hackerrank.com/challenges/matrix-rotation-algo/problem
  Level: Hard

  You are given a 2D matrix of dimension m x n  and a positive integer r. You have to rotate the matrix r times and print the resultant matrix. Rotation should be in anti-clockwise direction.

*/
/*
  Constraints: 
    - matrix: a 2D array of integers (m x n)
    - r: an integer that represents the rotation factor
    - It is guaranteed that the minimum of the m and n will be even.

*/

//---------------------Inputs and Outputs:

// Input:
const matrix_1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
//Output:
const rotated_matrix_1 = [
  [2, 3, 4, 8],
  [1, 7, 11, 12],
  [5, 6, 10, 16],
  [9, 13, 14, 15]
];

// Input:
const matrix_2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
//Output:
const rotated_matrix_2 = [
  [3, 4, 8, 12],
  [2, 11, 10, 16],
  [1, 7, 6, 15],
  [5, 9, 13, 14]
];

// Input:
const matrix_3 = [
  [1, 2, 3, 4],
  [7, 8, 9, 10],
  [13, 14, 15, 16],
  [19, 20, 21, 22],
  [25, 26, 27, 28]
];
//Output:
const rotated_matrix_3 = [
  [28, 27, 26, 25],
  [22, 9, 15, 19],
  [16, 8, 21, 13],
  [10, 14, 20, 7],
  [4, 3, 2, 1]
];

// Input:
const matrix_4 = [[1, 1], [1, 1]];
//Output:
const rotated_matrix_4 = [[1, 1], [1, 1]];

//--------------------CODE
function matrixRotation(matrix, r) {
  //1. figure out row or column is smaller and even
  let rows = matrix.length;
  let columns = matrix[0].length;
  let short_side;
  if (columns < rows) {
    //column is smaller and even
    short_side = columns;
  } else {
    //row is smaller or equal to column
    short_side = rows;
  }
  //2. figure out number of rings
  let num_rings = short_side / 2;
  //3. figure out the boundaries for the outer most ring
  let top_row = 0;
  let bottom_row = rows - 1;
  let left_column = 0;
  let right_column = columns - 1;
  let rings = {};
  let ring_lengths = {};
  //4. figure out ring coordinates using the four boundaries. when looping into the next inner ring, tighten the boundaries.
  for (let i = 0; i < num_rings; i++) {
    rings[i] = [];
    ring_lengths[i] = 0;
    for (let j = top_row; j < bottom_row; j++) {
      rings[i].push([j, left_column]);
      ring_lengths[i]++;
    }
    for (let j = left_column; j < right_column; j++) {
      rings[i].push([bottom_row, j]);
      ring_lengths[i]++;
    }
    for (let j = bottom_row; j > top_row; j--) {
      rings[i].push([j, right_column]);
      ring_lengths[i]++;
    }
    for (let j = right_column; j > left_column; j--) {
      rings[i].push([top_row, j]);
      ring_lengths[i]++;
    }
    top_row++;
    bottom_row--;
    left_column++;
    right_column--;
  }
  //5. r % each ring length will give number of rotations for each ring. Then chop the tail of each rings[i] of rotation length and append to the beginning of rings[i] array
  let rotations = 0;
  for (let i = 0; i < num_rings; i++) {
    rotations = r % ring_lengths[i];
    rings[i] = [
      ...rings[i].slice(ring_lengths[i] - rotations),
      ...rings[i].slice(0, ring_lengths[i] - rotations)
    ];
  }
  //6. combine the rotated rings back into the final matrix
  let final_matrix = new Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    final_matrix[i] = new Array(columns).fill(0);
  }
  top_row = 0;
  bottom_row = rows - 1;
  left_column = 0;
  right_column = columns - 1;
  let coordinates, counter;
  //counter should go from 0 to ring_lengths[i]
  //coordinates should be [row,column] from rings[i]
  for (let i = 0; i < num_rings; i++) {
    counter = 0;
    for (let j = top_row; j < bottom_row; j++) {
      coordinates = rings[i][counter];
      counter++;
      final_matrix[j][left_column] = matrix[coordinates[0]][coordinates[1]];
    }
    for (let j = left_column; j < right_column; j++) {
      coordinates = rings[i][counter];
      counter++;
      final_matrix[bottom_row][j] = matrix[coordinates[0]][coordinates[1]];
    }
    for (let j = bottom_row; j > top_row; j--) {
      coordinates = rings[i][counter];
      counter++;
      final_matrix[j][right_column] = matrix[coordinates[0]][coordinates[1]];
    }
    for (let j = right_column; j > left_column; j--) {
      coordinates = rings[i][counter];
      counter++;
      final_matrix[top_row][j] = matrix[coordinates[0]][coordinates[1]];
    }
    top_row++;
    bottom_row--;
    left_column++;
    right_column--;
  }
  // Hackerrank's method of output:
  // for (let i = 0; i < rows; i++) {
  //   console.log(final_matrix[i].join(' '));
  // }
  return final_matrix;
}

//------------Tests
const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneResult = matrixRotation(matrix_1, 1);
const testOneAssertion =
  JSON.stringify(testOneResult) === JSON.stringify(rotated_matrix_1);
const testOne = runTest(testOneAssertion, 1);

const testTwoResult = matrixRotation(matrix_2, 2);
const testTwoAssertion =
  JSON.stringify(testTwoResult) === JSON.stringify(rotated_matrix_2);
const testTwo = runTest(testTwoAssertion, 2);

const testThreeResult = matrixRotation(matrix_3, 7);
const testThreeAssertion =
  JSON.stringify(testThreeResult) === JSON.stringify(rotated_matrix_3);
const testThree = runTest(testThreeAssertion, 3);

const testFourResult = matrixRotation(matrix_4, 3);
const testFourAssertion =
  JSON.stringify(testFourResult) === JSON.stringify(rotated_matrix_4);
const testFour = runTest(testFourAssertion, 4);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
