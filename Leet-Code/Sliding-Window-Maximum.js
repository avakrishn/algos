'use strict';
const assert = require('assert');

/*
239. Sliding Window Maximum (Hard)
Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.

Example:

Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
Output: [3,3,5,5,6,7] 
Explanation: 

Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Note: 
You may assume k is always valid, 1 ≤ k ≤ input array's size for non-empty array.

Follow up:
Could you solve it in linear time?

*/

//------------------------Constraints and Edge Cases:

/*
    - Time: O(N)
    - Space: O(K)
    - 1 <= k <= length of the array

*/

//------------------------Inputs and Outputs:

/*
    Input: array = [10, 5, 2, 7, 8, 7] and k = 3

    Output: [10, 7, 8, 8]

    ---

    Input: array = [1,3,-1,-3,5,3,6,7], and k = 3

    Output: [3,3,5,5,6,7] 

    ---

*/

//------------------------Approach:

/*
  - Use a double direction queue where you can dequeue from either end
    - Used an array to implement a queue
    - As you iterate through nums array, store indices in the queue
      - If the queue contains an out of bounds indices for the specific k window then dequeue
      - If the current number in nums is greater than nums[first element in double q] then clear the double queue
          (double queue should be sorted that the first element is the index of the largest element in the double queue)
      - while the nums[last double queue element] is smaller than current nums[i] pop from double queue
      - push current index into double Queue
      - when i becomes greater than k-1 add nums[double queue [0]] to the results array
    - return the results array

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(k) -- size of queue
*/

const maxSlidingWindow = function(nums, k) {
  let doubleQ = [],
    result = [];
  for (let i = 0; i < nums.length; i++) {
    if (doubleQ[0] < i - k + 1) doubleQ = doubleQ.slice(1);
    if (nums[doubleQ[0]] < nums[i]) doubleQ = [];

    while (doubleQ.length > 0 && nums[doubleQ[doubleQ.length - 1]] < nums[i]) {
      doubleQ.pop();
    }

    doubleQ.push(i);
    if (i >= k - 1) {
      result.push(nums[doubleQ[0]]);
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

const testOneResult = JSON.stringify(maxSlidingWindow([10, 5, 2, 7, 8, 7], 3));
const testOne = runTest(testOneResult === '[10,7,8,8]', 1);

const testTwoResult = JSON.stringify(
  maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
);
const testTwo = runTest(testTwoResult === '[3,3,5,5,6,7]', 2);

const testThreeResult = JSON.stringify(maxSlidingWindow([5, 5, 5, 5], 4));
const testThree = runTest(testThreeResult === '[5]', 3);

const testArray = [testOne, testTwo, testThree];

for (let test of testArray) {
  console.log(test);
}
