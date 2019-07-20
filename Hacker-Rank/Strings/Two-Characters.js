'use strict';
const assert = require('assert');

//------------------------Problem:

/*

  Two Characters
  In this challenge, you will be given a string. You must remove characters until the string is made up of any two alternating characters. When you choose a character to remove, all instances of that character must be removed. Your goal is to create the longest string possible that contains just two alternating letters.

  As an example, consider the string abaacdabd. If you delete the character a, you will be left with the string bcdbd. Now, removing the character c leaves you with a valid string bdbd having a length of 4. Removing either b or d at any point would not result in a valid string.

  Given a string s, convert it to the longest possible string t made up only of alternating characters. Print the length of string t on a new line. If no string t can be formed, print 0 instead.

  Function Description

  Complete the alternate function in the editor below. It should return an integer that denotes the longest string that can be formed, or 0 if it cannot be done.

  alternate has the following parameter(s):

  s: a string

  https://www.hackerrank.com/challenges/two-characters/problem


*/

//------------------------Constraints and Edge Cases:

/*
    - s is a string with only lowercase letters and will be atleast 1 character in length
    -

*/

//------------------------Inputs and Outputs:

/*
    Input: 10
          beabeefeab

    Output: 5

    ---

    Input: 28
          asdcbsdcagfsdbgdfanfghbsfdab

    Output: 8

    ---

    Input: 28
          asvkugfiugsalddlasguifgukvsa

    Output: 0
*/

//------------------------Approach:

/*
  - Iterate through string
    - check to see if current character is same as previous character, if so add character to repeating map
    - add the index of the chacracter to positions mapping (char : [indices of char in string])
  - For all keys in the repeating mapping delete from positions mapping
  - For each character in the positions mapping compare its indices array length with other characters and only call the checkifAlternating function on both characters if their positions array length differ by at most 1
  - Compare the maxLength returned by the checkifAlternating function and reset maxLenngth if need be
  
  - checkIfAlternating function takes in two characters and checks based on their positions in the array if there was only a substring with those 2 characters would it be alternating - if yes return the length of the substring , if no return 0

  - return the maxLength


*/

//------------------------CODE:

function alternate(s) {
  let repeating = {}; // if we find repeating characters
  let positions = {}; // char : [indices of char in string]
  let previous = s[0]; // previous character
  positions[s[0]] = [0];

  for (let i = 1; i < s.length; i++) {
    // if there is a repeating character add it to repeating object
    if (previous != s[i]) {
      previous = s[i];
    } else {
      repeating[s[i]] = true;
    }

    if (positions[s[i]]) {
      positions[s[i]].push(i);
    } else {
      positions[s[i]] = [i];
    }
  }

  // delete the repeating characters from count and positions objects
  for (let key in repeating) {
    delete positions[key];
  }

  let maxLength = 0;
  for (let i in positions) {
    for (let j in positions) {
      if (i !== j) {
        let diff = Math.abs(positions[i].length - positions[j].length);
        if (diff <= 1) {
          let substrLen = checkIfAlternating(i, j);
          maxLength = Math.max(maxLength, substrLen);
        }
      }
    }
  }

  // check if the two characters are alternative within the string
  function checkIfAlternating(char1, char2) {
    let char1_arr = positions[char1];
    let char2_arr = positions[char2];

    // determine which is first and which is second by setting first = array whose 1st element is smallest
    let first;
    let second;
    if (char1_arr[0] < char2_arr[0]) {
      first = char1_arr;
      second = char2_arr;
    } else {
      first = char2_arr;
      second = char1_arr;
    }

    // if the first array length is smaller then the second it cannot work and we return 0
    if (first.length < second.length) {
      return 0;
    }
    let i = 0;
    let j = 0;

    // two pointers i and j weaving through first and second arrays checking to see if first [i] < second[j] and first[i+1] > second[j] ...
    while (j < second.length && i < first.length) {
      if (first[i] < second[j]) {
        i++;
      } else {
        return 0;
      }
      if (i == first.length) {
        break;
      }
      if (second[j] < first[i]) {
        j++;
      } else {
        return 0;
      }
    }
    return first.length + second.length;
  }

  return maxLength;
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOne = runTest(alternate('beabeefeab') === 5, 1);
const testTwo = runTest(alternate('asdcbsdcagfsdbgdfanfghbsfdab') === 8, 2);
const testThree = runTest(alternate('asvkugfiugsalddlasguifgukvsa') === 0, 3);

const testArray = [testOne, testTwo, testThree];

for (let test of testArray) {
  console.log(test);
}
