/*
  198. House Robber (Easy)

  You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

    Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

    Example 1:

    Input: [1,2,3,1]
    Output: 4
    Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
                Total amount you can rob = 1 + 3 = 4.
    Example 2:

    Input: [2,7,9,3,1]
    Output: 12
    Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
                Total amount you can rob = 2 + 9 + 1 = 12.

*/

//-------------------CODE

/*

  Time: O(N)
  Space: O(N)
  Tabulation (Dynamic Programming) using an Array

*/

var rob = function(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let arr = new Array(nums.length).fill(0);
  let onePrev = -Infinity; // arr[i-1]
  let twoPrev = -Infinity; // arr[i-2]

  for (let i = 0; i < nums.length; i++) {
    arr[i] = Math.max(onePrev, twoPrev + nums[i], nums[i]);
    [onePrev, twoPrev] = [arr[i], onePrev];
  }

  return arr[nums.length - 1];
};

/*

  Time: O(N)
  Space: O(1)
  Tabulation (Dynamic Programming) using 3 pointers

*/

var robOptimized = function(nums) {
  let onePrev = -Infinity;
  let twoPrev = -Infinity;
  let current = 0;

  for (let i = 0; i < nums.length; i++) {
    current = Math.max(onePrev, twoPrev + nums[i], nums[i]);
    [onePrev, twoPrev] = [current, onePrev];
  }

  return current;
};

//----------------Tests

console.log(rob([1, 2, 3, 1]) === 4);
console.log(rob([2, 7, 9, 3, 1]) === 12);
console.log(rob([2, 4, 6, 2, 5]) === 13);
console.log(rob([5, 1, 1, 5]) === 10);
console.log(rob([]) === 0);
console.log(rob([1, 2]) === 2);
console.log(rob([10]) === 10);

console.log(robOptimized([1, 2, 3, 1]) === 4);
console.log(robOptimized([2, 7, 9, 3, 1]) === 12);
console.log(robOptimized([2, 4, 6, 2, 5]) === 13);
console.log(robOptimized([5, 1, 1, 5]) === 10);
console.log(robOptimized([]) === 0);
console.log(robOptimized([1, 2]) === 2);
console.log(robOptimized([10]) === 10);
