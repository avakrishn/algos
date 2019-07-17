'use strict';
const assert = require('assert');

//------------------------Problem 1041:

/*
  1041. Robot Bounded In Circle (Easy)

    On an infinite plane, a robot initially stands at (0, 0) and faces north.  The robot can receive one of three instructions:

  "G": go straight 1 unit;
  "L": turn 90 degrees to the left;
  "R": turn 90 degress to the right.
  The robot performs the instructions given in order, and repeats them forever.

  Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

  

  Example 1:

  Input: "GGLLGG"
  Output: true
  Explanation: 
  The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
  When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
  Example 2:

  Input: "GG"
  Output: false
  Explanation: 
  The robot moves north indefinitely.
  Example 3:

  Input: "GL"
  Output: true
  Explanation: 
  The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...
  

  Note:

  1 <= instructions.length <= 100
  instructions[i] is in {'G', 'L', 'R'}



*/

//------------------------Constraints and Edge Cases:

/*
    - At least one character in the string
    - Time: O(N)
    - Space O(1)

*/

//------------------------Inputs and Outputs:

/*
    Input: "GGLLGG"

    Output: true

    ---

    Input: "GG"

    Output: false

    ---

    Input: "GL"

    Output: true

    ---

    Input: "GLRLLGLL"

    Output: true

    ---

*/

//------------------------Approach:

/*
  - Iterate through the string updating the position and direction
  - After going through string:
    - if the position not back to [0,0] ,but the direction is > 0 (east, south, west) return true
      - which means in 90 or 270 degree that is a square, it will back to [0,0] in 4 times
      - and 180 degree in 2 times 
    - else return false

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(1)
*/

/**
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function(instructions) {
  let position = [0, 0];
  let direction = 0; // 0 is north // 1 is east // 2 is south // 3 west

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] == 'R') {
      if (direction === 3) {
        direction = 0;
      } else {
        direction++;
      }
    } else if (instructions[i] == 'L') {
      if (direction === 0) {
        direction = 3;
      } else {
        direction--;
      }
    } else {
      position = moveRobot(position, direction);
    }
  }

  // if not facing north (direction!== 0) then after x number of iterations will end up completing the square and return to 0,0 following same pattern over and over again

  return (position[0] === 0 && position[1] === 0) || direction > 0;

  function moveRobot(position, direction) {
    let x = position[0];
    let y = position[1];
    let move = [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
    return move[direction];
  }
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(isRobotBounded('GGLLGG') === true, 1);
const testTwo = runTest(isRobotBounded('GG') === false, 2);
const testThree = runTest(isRobotBounded('GL') === true, 3);
const testFour = runTest(isRobotBounded('GLRLLGLL') === true, 4);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
