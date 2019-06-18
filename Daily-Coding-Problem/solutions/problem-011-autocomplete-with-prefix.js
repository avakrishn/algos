'use strict';
const assert = require('assert');

//------------------------Problem 11:

/*

  This problem was asked by Twitter.

  Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

  For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

  Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.

  Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
    - If no string in the set has the prefix then return a []
    - all strings / prefix contain only lowercase letters
*/

//------------------------Inputs and Outputs:

/*
    Input: "de",  ["dog", "deer", "deal"], 

    Output: ["deer", "deal"]

    ---

    Input: "app", ['ape', 'apple', 'apples']

    Output: ['apple', 'apples']

    ---

    Input: "str" , ['ape', 'apple', 'apples']

    Output: []

    ---

*/

//------------------------Approach:

/*
    Iterate through set of strings and convert into trie then traverse trie along prefix and then return all words upuntil where end = true;
*/

//------------------------CODE:

/*
    Time: 
    Space: 
*/

class TrieNode {
  constructor(val) {
    this.val = val;
    this.next = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!current.next[word[i]]) {
        let newNode = new TrieNode(word[i]);
        current.next[word[i]] = newNode;
        current = newNode;
      } else {
        current = current.next[word[i]];
      }
    }
    current.end = true;
  }

  prefixExists(prefix) {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!current.next[prefix[i]]) {
        return false;
      }
      current = current.next[prefix[i]];
    }

    return true;
  }

  findAllWordsFromPrefix(prefix) {
    let current = this.root;
    let arr = [];
    for (let i = 0; i < prefix.length; i++) {
      if (!current.next[prefix[i]]) {
        return [];
      }
      current = current.next[prefix[i]];
    }

    function dfs(node, str) {
      if (node.end === true) {
        arr.push(str);
      }
      if (Object.keys(node.next).length < 1) {
        return;
      }
      for (let trieNodeKey in node.next) {
        let nextNode = node.next[trieNodeKey];
        dfs(nextNode, str + nextNode.val);
      }
    }

    dfs(current, prefix);
    return arr;
  }
}

function autocomplete(s, arr) {
  let trie = new Trie();
  for (let i = 0; i < arr.length; i++) {
    trie.addWord(arr[i]);
  }
  return trie.findAllWordsFromPrefix(s);
}

//------------------------TESTS:

const runTest = (test, index) => {
  const error = assert(test, `Test ${index}: Incorrect Result`);
  if (!error) return `Test ${index}: ${true}`;
  return error;
};

const testOneResult = autocomplete('', ['dog', 'deer', 'deal']);
const testOne = runTest(
  JSON.stringify(testOneResult) === '["dog","deer","deal"]',
  1
);

const testTwoResult = autocomplete('d', ['dog', 'deer', 'deal']);
const testTwo = runTest(
  JSON.stringify(testTwoResult) === '["dog","deer","deal"]',
  2
);

const testThreeResult = autocomplete('de', ['dog', 'deer', 'deal']);
const testThree = runTest(
  JSON.stringify(testThreeResult) === '["deer","deal"]',
  3
);

const testFourResult = autocomplete('dee', ['dog', 'deer', 'deal']);
const testFour = runTest(JSON.stringify(testFourResult) === '["deer"]', 4);

const testFiveResult = autocomplete('deer', ['dog', 'deer', 'deal']);
const testFive = runTest(JSON.stringify(testFiveResult) === '["deer"]', 5);

const testSixResult = autocomplete('ap', ['ape', 'apple', 'apples']);
const testSix = runTest(
  JSON.stringify(testSixResult) === '["ape","apple","apples"]',
  6
);

const testSevenResult = autocomplete('app', ['ape', 'apple', 'apples']);
const testSeven = runTest(
  JSON.stringify(testSevenResult) === '["apple","apples"]',
  7
);

const testEightResult = autocomplete('spr', ['dog', 'deer', 'deal']);
const testEight = runTest(JSON.stringify(testEightResult) === '[]', 8);

const testNineResult = autocomplete('spr', []);
const testNine = runTest(JSON.stringify(testNineResult) === '[]', 9);

const testTenResult = autocomplete('', []);
const testTen = runTest(JSON.stringify(testTenResult) === '[]', 10);

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
  testTen
];

for (let test of testArray) {
  console.log(test);
}
