'use strict';
const assert = require('assert');

//------------------------Problem 13:

/*

This problem was asked by Amazon.

Given an integer k and a string s, find the length of the longest substring that contains at most k distinct characters.

For example, given s = "abcba" and k = 2, the longest substring with k distinct characters is "bcb".

Level: Hard

*/

//------------------------Constraints and Edge Cases:

/*
    - Find the longest substring(consecutive characters) with at most k distinct characters (there can be repeating characters)
    - Try and solve in Time: O(N)

*/

//------------------------Inputs and Outputs:

/*
    Input: s = "abcba" k = 2

    Output: "bcb"

    ---

    Input: "ababbcbbca"

    Output: 

    ---

*/

//------------------------Approach:

/*

  "aababbcbbca"
         p

         k = 3
  "aaaaddabababaccam"
                p

  "abcdabcdabcd"
  
  charsToFind 0
  pointer 13
  counter 13
  maxLen 0 
  hashmap {"a":0, "d":4, "b":7}
  previousP = 4
  

  initialize function (str)
    initialize charsToFind = k
    initialize pointer = 0 // index in str
    initialize counter = 0 // temp counter
    initialize maxLen variable // longset substring length
    initialize hashmap // {character : index of char}
    initialize previousP = 0

    while the pointer < str.length
      if(charsToFind > 0 && hashmap.get(str[pointer]) === undefined)
        hashmap.set(str[pointer], pointer)
        // previousChar = str[pointer]
       
        if(k-charsToFind === 1) previousP = pointer
        counter++
        pointer++
        charsToFind--

      else if (hashmap.get(str[pointer]))
        // if(previousChar !== str[pointer]){
        //   hashmap.set(str[pointer], pointer)
        // }
        if(str[pointer] === str[previousP])
          previousP = pointer
        counter++
        pointer++
      
      else
        empty hashmap
        charsToFind = k
        pointer = 1 + previousP
        counter = 0

      maxLength = max(maxLength, counter)

        
        
        
      


*/

//------------------------CODE:

/*
    Time:  O(2N) = O(N)
    Space: O(1) set can have at most 26 distinct characters
*/

function kDistinctSubstring(str, k) {
  if (k === 1) {
    return str[0];
  }

  if (k > str.length) {
    return '';
  }

  let charsToFind = k,
    start = 0,
    end = 0,
    seen = new Set(),
    previousP = 0,
    max = [0, 0],
    distinct = new Set();

  while (end < str.length) {
    if (charsToFind > 0 && !seen.has(str[end])) {
      seen.add(str[end]);
      if (k - charsToFind === 1) previousP = end;
      end++;
      charsToFind--;
    } else if (seen.has(str[end])) {
      if (str[end] === str[previousP]) previousP = end;
      end++;
    } else {
      seen = new Set();
      charsToFind = k;
      start = previousP;
      end = previousP;
    }

    if (end - start > max[1] - max[0]) {
      max = [start, end];
    }
    distinct.add(str[end]);
  }

  if (distinct.size < k) {
    return '';
  }

  return str.slice(max[0], max[1]);
}

//------------------------MODIFICATION:
/*
  Find Length of Largest Substring with k distinct characters
  
    Time:  O(2N) = O(N)
    Space: O(1) set can have at most 26 distinct characters
*/
function kDistinctSubstringMaxLength(str, k) {
  if (k === 1) {
    return 1;
  }

  if (k > str.length) {
    return 0;
  }

  let charsToFind = k,
    pointer = 0,
    counter = 0,
    maxLen = 0,
    seen = new Set(),
    previousP = 0,
    distinct = new Set();

  while (pointer < str.length) {
    if (charsToFind > 0 && !seen.has(str[pointer])) {
      seen.add(str[pointer]);
      if (k - charsToFind === 1) previousP = pointer;
      counter++;
      pointer++;
      charsToFind--;
    } else if (seen.has(str[pointer])) {
      if (str[pointer] === str[previousP]) previousP = pointer;
      counter++;
      pointer++;
    } else {
      seen = new Set();
      charsToFind = k;
      pointer = previousP;
      counter = 0;
    }
    maxLen = Math.max(maxLen, counter);
    distinct.add(str[pointer]);
  }
  if (distinct.size < k) {
    return 0;
  }

  return maxLen;
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(
  kDistinctSubstring('abbcdaddddcadccdmrst', 3) === 'cdaddddcadccd',
  1
);

const testTwo = runTest(
  kDistinctSubstring('abbcdaddddcadccd', 3) === 'cdaddddcadccd',
  2
);

const testThree = runTest(kDistinctSubstring('abcba', 2) === 'bcb', 3);

const testFour = runTest(kDistinctSubstring('abcba', 1) === 'a', 4);

const testFive = runTest(kDistinctSubstring('abcba', 10) === '', 5);

const testSix = runTest(
  kDistinctSubstring('abababaabababababababababababababababcba', 10) === '',
  6
);

const testSeven = runTest(
  kDistinctSubstringMaxLength('abbcdaddddcadccdmrst', 3) ===
    'cdaddddcadccd'.length,
  7
);

const testEight = runTest(
  kDistinctSubstringMaxLength('abbcdaddddcadccd', 3) === 'cdaddddcadccd'.length,
  8
);

const testNine = runTest(
  kDistinctSubstringMaxLength('abcba', 2) === 'bcb'.length,
  9
);

const testTen = runTest(
  kDistinctSubstringMaxLength('abcba', 1) === 'a'.length,
  10
);

const testEleven = runTest(
  kDistinctSubstringMaxLength('abcba', 10) === ''.length,
  11
);

const testTwelve = runTest(
  kDistinctSubstringMaxLength(
    'abababaabababababababababababababababcba',
    10
  ) === ''.length,
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
