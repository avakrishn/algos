'use strict';
const assert = require('assert');

//------------------------Problem 21:

/*
  This problem was asked by Snapchat.

  Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), find the minimum number of rooms required.

  For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.

  Level: Easy

*/

//------------------------Constraints and Edge Cases:

/*
    - There can be no intervals in the array - return 0 as number of rooms required
    - Intervals may not be sorted


    [[0, 50],[30, 75], [60, 150]]

    start = {0,30,60}
    end = {50, 75, 150}

    min_start = 0
    max_end = 150


*/

//------------------------Inputs and Outputs:

/*
    Input: [[30, 75], [0, 50], [60, 150]]

    Output: 2

    ---

    Input: 

    Output: 

    ---

*/

//------------------------Approach:

/*
  - First sort the array based on the 0th index of each interval, if the 0th index is the same then sort based on 1st index
  - Have an array of meeting rooms that correspond to intervals
  - Compare each interval with the meeting rooms array
    - if there is no overlap with one of the previous intervals then replace otherwise add it to the meeting list
  - return the length of the meeting rooms list

*/

//------------------------CODE:

/*
    Time:  O(NM) - N is the length of the intervals array and M is the length of the meetingRooms array
    Space: O(N)
*/

function requiredRooms(times) {
  let rooms = [];
  times = times.sort((a, b) => {
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

  let add = true;
  for (let i = 0; i < times.length; i++) {
    add = true;
    for (let j = 0; j < rooms.length; j++) {
      if (add && times[i][0] >= rooms[j][1]) {
        rooms[j] = times[i];
        add = false;
      }
    }
    if (add) {
      rooms.push(times[i]);
    }
  }

  return rooms.length;
}

//------------------------OPTIMIZED

/*
  Time: O(N) N is the difference between the global start time and the global end time
  Space: O(N) N is the number of intervals

  Approach: Using 2 Hash Maps
  - Create 2 Hash Maps: 1 map stores all the start times and 1 map stores all the end times
  - While doing this also get the min start time and the max end time
  - Have a max_count and a current_count
  - iterate from min start time to max end time
    - if number is in start time then current count += start hash[start time]
    - if current_count > max_count then set max_count = current_count
    - if number is in end time then current count -= end hash [end time]
  - return the max_count

*/

function requiredRoomsOptimized(times) {
  let startTime = {};
  let endTime = {};
  let minStart = Infinity;
  let maxEnd = -Infinity;
  let maxCount = 0;
  let currentCount = 0;

  for (let i = 0; i < times.length; i++) {
    let cStart = times[i][0];
    let cEnd = times[i][1];
    if (!startTime.hasOwnProperty(cStart)) {
      startTime[cStart] = 0;
    }
    startTime[cStart]++;
    if (!endTime.hasOwnProperty(cEnd)) {
      endTime[cEnd] = 0;
    }
    endTime[cEnd]++;

    if (cStart < minStart) {
      minStart = cStart;
    }

    if (cEnd > maxEnd) {
      maxEnd = cEnd;
    }
  }

  for (let i = minStart; i <= maxEnd; i++) {
    if (startTime.hasOwnProperty(i)) {
      currentCount += startTime[i];
    }
    if (endTime.hasOwnProperty(i)) {
      currentCount -= endTime[i];
    }
    if (currentCount > maxCount) {
      maxCount = currentCount;
    }
  }
  return maxCount;
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(
  requiredRooms([
    [30, 75],
    [0, 50],
    [0, 50],
    [50, 60],
    [60, 150],
    [60, 150]
  ]) === 3,
  1
);

const testTwo = runTest(requiredRooms([[30, 75], [0, 50], [60, 150]]) === 2, 2);

const testThree = runTest(
  requiredRooms([[30, 75], [0, 50], [10, 60], [60, 150]]) === 3,
  3
);

const testFour = runTest(requiredRooms([[60, 150]]) === 1, 4);

const testFive = runTest(requiredRooms([[60, 150], [150, 170]]) === 1, 5);

const testSix = runTest(
  requiredRooms([[60, 150], [60, 150], [150, 170]]) === 2,
  6
);

const testSeven = runTest(
  requiredRoomsOptimized([
    [30, 75],
    [0, 50],
    [0, 50],
    [50, 60],
    [60, 150],
    [60, 150]
  ]) === 3,
  7
);

const testEight = runTest(
  requiredRoomsOptimized([[30, 75], [0, 50], [60, 150]]) === 2,
  8
);

const testNine = runTest(
  requiredRoomsOptimized([[30, 75], [0, 50], [10, 60], [60, 150]]) === 3,
  9
);

const testTen = runTest(requiredRoomsOptimized([[60, 150]]) === 1, 10);

const testEleven = runTest(
  requiredRoomsOptimized([[60, 150], [150, 170]]) === 1,
  11
);

const testTwelve = runTest(
  requiredRoomsOptimized([[60, 150], [60, 150], [150, 170]]) === 2,
  12
);

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
  testTwelve
];

for (let test of testArray) {
  console.log(test);
}
