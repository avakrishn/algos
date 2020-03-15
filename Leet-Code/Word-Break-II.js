/*
  140. Word Break II (HARD)

  Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
Output:
[
  "cats and dog",
  "cat sand dog"
]
Example 2:

Input:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
Output:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
Output:
[]


*/

//-----------------------CODE

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
const wordBreak = function(s, wordDict) {
  if (s.length == 1) {
    if (s[0] === wordDict[0]) return wordDict;
  }

  let set = new Set();
  let cache = {};
  for (let i = 0; i < wordDict.length; i++) {
    set.add(wordDict[i]);
  }

  let result = [];

  function wordHelper(str) {
    if (cache.hasOwnProperty(str)) {
      return cache[str];
    }

    cache[str] = [];

    if (set.has(str)) {
      // return str;
      cache[str].push(str);
    }

    for (let i = 1; i <= str.length; i++) {
      let left = str.slice(0, i);
      if (set.has(left)) {
        let template = left + ' ';
        let right = str.slice(i);
        let res = wordHelper(right);
        if (res.length > 0) {
          if (typeof res === 'string') {
            let temp = template.slice(0);
            temp += res;
            cache[str].push(temp);
          }
          if (typeof res === 'object') {
            for (let j = 0; j < res.length; j++) {
              let temp = template.slice(0);
              temp += res[j];
              cache[str].push(temp);
            }
          }
        }
      }
    }
    return cache[str];
  }

  for (let i = 1; i <= s.length; i++) {
    let left = s.slice(0, i);
    if (set.has(left) && i < s.length) {
      let template = left + ' ';
      let right = s.slice(i);
      let possibilities = wordHelper(right);
      if (typeof possibilities === 'string') {
        possibilities = [possibilities];
      }

      for (let j = 0; j < possibilities.length; j++) {
        let temp = template.slice(0);
        temp += possibilities[j];
        result.push(temp);
      }
    } else if (set.has(left)) {
      result.push(left);
    }
  }
  return result;
};

//-----------------------TESTS
let testOneActual = wordBreak('pineapplepenapple', [
  'apple',
  'pen',
  'applepen',
  'pine',
  'pineapple'
]);
let testOneExpected = [
  'pine apple pen apple',
  'pineapple pen apple',
  'pine applepen apple'
];
let testTwoActual = wordBreak('catsandog', [
  'cats',
  'dog',
  'sand',
  'and',
  'cat'
]);

let testTwoExpected = [];

let testThreeActual = wordBreak(
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  [
    ('a',
    'aa',
    'aaa',
    'aaaa',
    'aaaaa',
    'aaaaaa',
    'aaaaaaa',
    'aaaaaaaa',
    'aaaaaaaaa',
    'aaaaaaaaaa')
  ]
);

let testThreeExpected = [];

let testFourActual = wordBreak('a', ['a']);

let testFourExpected = ['a'];

let testFiveActual = wordBreak('aaaaaaa', ['aaaa', 'aaa']);
let testFiveExpected = ['aaaa aaa', 'aaa aaaa'];

let testSixActual = wordBreak('aaaaaaa', ['aaaa', 'aa', 'a']);
let testSixExpected = [
  'a a a a a a a',
  'aa a a a a a',
  'a aa a a a a',
  'a a aa a a a',
  'aa aa a a a',
  'aaaa a a a',
  'a a a aa a a',
  'aa a aa a a',
  'a aa aa a a',
  'a aaaa a a',
  'a a a a aa a',
  'aa a a aa a',
  'a aa a aa a',
  'a a aa aa a',
  'aa aa aa a',
  'aaaa aa a',
  'a a aaaa a',
  'aa aaaa a',
  'a a a a a aa',
  'aa a a a aa',
  'a aa a a aa',
  'a a aa a aa',
  'aa aa a aa',
  'aaaa a aa',
  'a a a aa aa',
  'aa a aa aa',
  'a aa aa aa',
  'a aaaa aa',
  'a a a aaaa',
  'aa a aaaa',
  'a aa aaaa'
];

let testSevenActual = wordBreak('apple', ['pear', 'apple', 'peach']);
let testSevenExpected = ['apple'];

let actual = [
  testOneActual,
  testTwoActual,
  testThreeActual,
  testFourActual,
  testFiveActual,
  testSixActual,
  testSevenActual
];

let expected = [
  testOneExpected,
  testTwoExpected,
  testThreeExpected,
  testFourExpected,
  testFiveExpected,
  testSixExpected,
  testSevenExpected
];

for (let i = 0; i < actual.length; i++) {
  console.log(`Test ${i + 1} Actual: ${JSON.stringify(actual[i])}`);
  console.log(`-------------`);
  console.log(`Test ${i + 1} Expected: ${JSON.stringify(expected[i])}`);
  console.log(`=========================================`);
}
