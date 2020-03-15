'use strict';
const assert = require('assert');

//------------------------MERGE SORT

//------------------------Explanation
/*
  1. Merge Sort is a Divide and Conquer Algorithm
    - Divide and Conquer:
      1. Divide: Break the given problem into subproblems of the same type
      2. Conquer: Recursively solve these subproblems
      3. Combine: Appropriately combine the answers
  2. Big Picture:
    - Divide the input array into 2 halves, call itself for the two halves and merge the 2 sorted halves. The merge process assumes that the 2 halves are sorted and merges them into 1 array.
    - Using recursion keep dividing the array in half till you get 1 element then combine the sorted arrays using 2 pointers.

*/

//------------------------Constraints/ Edge Cases
/*
  - The array can be composed of any primitve data type but all elements must be the same data type that can be sorted
  - Can have an empty array or an array with 1 element
    - I: [] O: []
    - I: [1] O: [1]
  - Time and Space Complexity:
      - Worst Time Complexity: O(N * log(N))
      - Worst Total (Call Stack + Auxiliary) Space Complexity: O(N)

      - Average Time Complexity: O(N * log(N))
      - Average Total (Call Stack + Auxiliary) Space Complexity: O(N)

      - Best Time Complexity: O(N * log(N))
      - Best Total (Call Stack + Auxiliary) Space Complexity: O(N)

      - Time : log(N) -> dividing * N -> merging
      - Space: N -> the number of elements in the input array
  - Stability: Stable
    - Order of duplicates are preserved

*/

//------------------------Input/ Outputs
/*
  ---
  
  Input: [38, 27, 43, 3, 9, 82, 10]

  Output: [3, 9 ,10, 27, 38, 43, 82]

  ---

  Input: []

  Output: []

  ---

  Input: [2]

  Output: [2]

  ---

  Input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  ---
*/

//------------------------Approach
/*
  
  1. Step 1: Find the middle point to divide the array into 2 halves 
  2. Step 2: Call mergeSort for first half and Call mergeSort for second half (divide array recursively till get to 1 element)
  3. Merge the two halves sorted in step 2

  Diagram:
  Input : [38, 27, 43, 3, 9, 82, 10]
    Divide phase
                      mid
        - [38, 27, 43, 3, 9, 82, 10]
        - [38, 27, 43] [3, 9, 82, 10]
        - [38] [27, 43] [3, 9] [82, 10]
        -    [27] [43]  [3] [9] [82] [10]
    Merge phase
            i   j        i      j 
        - [38] [27, 43] [3, 9] [10, 82]
            i           j
        - [27, 38, 43] [3, 9, 10, 82]
        - [3, 9 ,10, 27, 38, 43, 82]

  Use Tail Recursion for Space Optimization
*/

//------------------------CODE
/*

  Time: O(NlogN)
  Space: O(N)

  Space Optimization using Tail Recursion - convert the trailing code into a recursive function

*/

function mergeSort(arr) {
  function divide(arr) {
    if (arr.length < 2) return arr;
    const mid = Math.floor(arr.length / 2);
    const arr1 = arr.slice(0, mid);
    const arr2 = arr.slice(mid);
    return merge(divide(arr1), divide(arr2));
  }

  function merge(arr1, arr2) {
    let result = [],
      p1 = 0,
      p2 = 0;
    let totalElements = arr1.length + arr2.length;
    while (result.length < totalElements) {
      let p2OutBounds = p2 >= arr2.length,
        p1InBounds = p1 < arr1.length,
        el1LessOrEqualToEl2 = arr1[p1] <= arr2[p2];

      if (p2OutBounds || (p1InBounds && el1LessOrEqualToEl2)) {
        result.push(arr1[p1]);
        p1++;
      } else {
        result.push(arr2[p2]);
        p2++;
      }
    }
    return result;
  }

  return divide(arr);
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

/*
  ---
  
  Input: 

  Output: 

  ---

  Input: []

  Output: []

  ---

  Input: [2]

  Output: [2]

  ---

  Input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

  Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  ---
*/
const testOneResult = mergeSort([38, 27, 43, 3, 9, 82, 10]);
const testOneExpected = [3, 9, 10, 27, 38, 43, 82];
const testOne = runTest(
  JSON.stringify(testOneResult) === JSON.stringify(testOneExpected),
  1
);

const testTwoResult = mergeSort([]);
const testTwoExpected = [];
const testTwo = runTest(
  JSON.stringify(testTwoResult) === JSON.stringify(testTwoExpected),
  2
);

const testThreeResult = mergeSort([2]);
const testThreeExpected = [2];
const testThree = runTest(
  JSON.stringify(testThreeResult) === JSON.stringify(testThreeExpected),
  3
);

const testFourResult = mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
const testFourExpected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const testFour = runTest(
  JSON.stringify(testFourResult) === JSON.stringify(testFourExpected),
  4
);

const testArray = [testOne, testTwo, testThree, testFour];

for (let test of testArray) {
  console.log(test);
}
