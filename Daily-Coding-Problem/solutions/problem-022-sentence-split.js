'use strict';
const assert = require('assert');

//------------------------Problem 22:

/*
This problem was asked by Microsoft.

Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.

For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].

Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].

Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
    - Return any one possibility or if no possibilities return null
    -

*/

//------------------------Inputs and Outputs:

/*
    Input: 'thequickbrownfox', ['quick', 'brown', 'the', 'fox']

    Output: [ 'the', 'quick', 'brown', 'fox' ]

    ---

    Input: 'bedbathandbeyond', ['bed', 'bath', 'bedbath', 'and', 'beyond']

    Output: [ 'bed', 'bath', 'and', 'beyond' ]

    ---

    Input: 'bedbathandbeyond', ['bed']

    Output: null

    ---

*/

//------------------------Approach:

/*
  - Iterate through string finding the substring that is in the wordDict then search through the rest of the string in a recursive fashion trying to find the next word in the remaining string that is in the wordDict.
  - When the sentence is successfully split break out of iteration/ recursion and return the split word in the form of an array
  - If the sentence cannot be split successfully then return null

*/

//------------------------CODE:

/*
    Time:  O(NK) where N is the length of the string and K is the length of the array
    Space: O(NK)
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const sentenceSplit = function(s, wordDict) {
  let set = new Set();
  let result = [];
  for (let i = 0; i < wordDict.length; i++) {
    set.add(wordDict[i]);
  }

  function findRemaining(str) {
    if (set.has(str)) {
      return str;
    }

    for (let i = 0; i <= str.length; i++) {
      let left = str.slice(0, i);
      if (set.has(left)) {
        let template = left + ' ';

        let right = str.slice(i);
        let res = findRemaining(right);
        if (res) {
          res = template + res;
          return res;
        }
      }
    }

    return false;
  }

  for (let i = 0; i <= s.length; i++) {
    let left = s.slice(0, i);
    if (set.has(left)) {
      let template = left + ' ';
      let right = s.slice(i);
      let res = findRemaining(right);
      if (res) {
        res = template + res;
        result = res.split(' ');
        break;
      }
    }
  }

  return result.length > 0 ? result : null;
};

//------------------------Modification:
/*
  Look at LeetCode Word Break and Word Break II
*/

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneResult = sentenceSplit('thequickbrownfox', [
  'quick',
  'brown',
  'the',
  'fox'
]);
const testOneExpected = ['the', 'quick', 'brown', 'fox'];
const testOne = runTest(
  JSON.stringify(testOneResult) === JSON.stringify(testOneExpected),
  1
);

const testTwoResult = sentenceSplit('bedbathandbeyond', [
  'bed',
  'bath',
  'bedbath',
  'and',
  'beyond'
]);
const testTwoExpected = ['bed', 'bath', 'and', 'beyond'];
const testTwo = runTest(
  JSON.stringify(testTwoResult) === JSON.stringify(testTwoExpected),
  2
);

const testThreeResult = sentenceSplit('bedbathandbeyond', ['bed']);
const testThreeExpected = null;
const testThree = runTest(
  JSON.stringify(testThreeResult) === JSON.stringify(testThreeExpected),
  3
);

const testArray = [testOne, testTwo, testThree];

for (let test of testArray) {
  console.log(test);
}
