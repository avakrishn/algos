'use strict';
const assert = require('assert');

//------------------------Problem 139:

/*
139. Word Break (Medium)
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false




*/

//------------------------Constraints and Edge Cases:

/*
    - string is non empty and dictionary is non empty
    - you are allowed to reuse a word in dictionary
    - dictionary does not have duplicate words
    - Time O(MN) = M = string length * N = dictionary size
    - Space O(N) = cache and set

*/

//------------------------Inputs and Outputs:

/*
    Input: s = "leetcode", wordDict = ["leet", "code"]

    Output: true

    Explanation: Return true because "leetcode" can be segmented as "leet code".

    ---

    Input: s = "applepenapple", wordDict = ["apple", "pen"]

    Output: true

    Explanation: Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.

    ---

    Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]

    Output: false

    ---
*/

//------------------------Approach:

/*
  - Dynamic Programming Memoization
  - First create a set that holds all the words in the dictionary (O(1) search)
  - Then create a helper method recursion function that takes in a string
    - base cases:
        - if cache contains string --> return its value
        - if the set contains string --> return true
    - recursion:
      - for loop iterates from i= 1 to i = string length -1
          - left = slice string from 0 to i
          - if set contains left
              - right = slice string from i
              - if you call recursive function on right = true
                  - return true
      - (if you have not returned true from the for loop)
      - set cache[string] = false
      - return false
  - return the recursive/ dp Memo function on the original string

*/

//------------------------CODE:

/*
    - Time O(MN) = M = string length * N = dictionary size
    - Space O(N) = cache and set
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function(s, wordDict) {
  let set = new Set();
  let cache = {};
  for (let i = 0; i < wordDict.length; i++) {
    set.add(wordDict[i]);
  }

  function wordHelper(str) {
    if (cache.hasOwnProperty(str)) {
      return cache[str];
    }
    if (set.has(str)) {
      return true;
    }
    for (let i = 1; i < str.length; i++) {
      let left = str.slice(0, i);
      if (set.has(left)) {
        let right = str.slice(i);
        if (wordHelper(right)) {
          return true;
        }
      }
    }
    cache[str] = false;
    return false;
  }

  return wordHelper(s);
};

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};
/*
 Input: s = , wordDict = 

    Output: true

    Explanation: Return true because "leetcode" can be segmented as "leet code".

    ---

    Input: s = , wordDict = 

    Output: true

    Explanation: Return true because "applepenapple" can be segmented as "apple pen apple". Note that you are allowed to reuse a dictionary word.

    ---

    Input: s = , wordDict = 

    Output: false

    ---


*/
const testOne = runTest(wordBreak('leetcode', ['leet', 'code']) === true, 1);

const testTwo = runTest(
  wordBreak('applepenapple', ['apple', 'pen']) === true,
  2
);

const testThree = runTest(
  wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']) === false,
  3
);

const testFour = runTest(
  wordBreak('catsanddog', ['cats', 'dog', 'sand', 'and', 'cat']) === true,
  4
);

const testFive = runTest(
  wordBreak(
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
    [
      'a',
      'aa',
      'aaa',
      'aaaa',
      'aaaaa',
      'aaaaaa',
      'aaaaaaa',
      'aaaaaaaa',
      'aaaaaaaaa',
      'aaaaaaaaaa'
    ]
  ) === false,
  5
);

const testSix = runTest(wordBreak('cars', ['car', 'ca', 'rs']) === true, 6);

const testArray = [testOne, testTwo, testThree, testFour, testFive, testSix];

for (let test of testArray) {
  console.log(test);
}
