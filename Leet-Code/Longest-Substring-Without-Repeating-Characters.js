/*
  3. Longest Substring Without Repeating Characters (Medium)

  Given a string, find the length of the longest substring without repeating characters.

  Example 1:

  Input: "abcabcbb"
  Output: 3 
  Explanation: The answer is "abc", with the length of 3. 
  Example 2:

  Input: "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.
  Example 3:

  Input: "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3. 
              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/

//--------------CODE

/*
  - Sliding Window Problem Approach
    - Expand window when character is not in the hashmap
    - Restart window when see a repeating character
    - In hashmap store {"character" : int index of char}
    - when restart window set start and end pointers to hashmap[string[character]] + 1

    Time: O(N) - traversing string once
    Space: O(1) - in hashmap there can be a max of 26 characters
*/

/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function(str) {
  let map = new Map();
  let maxLength = 0;
  let counter = 0;
  let pointer = 0;

  while (pointer < str.length) {
    if (map.get(str[pointer]) === undefined) {
      // can't use bang operator because !0 = true
      counter++;
      map.set(str[pointer], pointer);
      pointer++;
    } else {
      counter = 0;
      pointer = map.get(str[pointer]) + 1;
      map.clear();
    }

    maxLength = Math.max(counter, maxLength);
  }
  return maxLength;
};

//----------Tests:

console.log(lengthOfLongestSubstring('abcabcbb') === 3);
console.log(lengthOfLongestSubstring('bbbbb') === 1);
console.log(lengthOfLongestSubstring('b') === 1);
console.log(lengthOfLongestSubstring('pwwkew') === 3);
console.log(lengthOfLongestSubstring('') === 0);
