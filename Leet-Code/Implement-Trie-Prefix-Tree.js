/*
  Problem: 208
  Implement Trie(Prefix Tree) (Medium)

  Implement a trie with insert, search, and startsWith methods.

  Example:

  Trie trie = new Trie();

  trie.insert("apple");
  trie.search("apple");   // returns true
  trie.search("app");     // returns false
  trie.startsWith("app"); // returns true
  trie.insert("app");   
  trie.search("app");     // returns true

*/

//-------------------CODE

//----------ES5

/**
 * Initialize your data structure here.
 */
var TrieNodeES5 = function(val = null) {
  this.val = val;
  this.next = {};
  this.end = false;
};

var TrieES5 = function() {
  this.root = new TrieNodeES5();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
TrieES5.prototype.insert = function(word) {
  let i = 0;
  let current = this.root;
  for (i; i < word.length; i++) {
    if (!current.next[word[i]]) {
      let newTrie = new TrieNodeES5(word[i]);
      current.next[word[i]] = newTrie;
      current = newTrie;
    } else {
      current = current.next[word[i]];
    }
  }

  current.end = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
TrieES5.prototype.search = function(word) {
  let current = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!current.next[word[i]]) {
      return false;
    }

    current = current.next[word[i]];
  }
  if (current.end === true) {
    return true;
  } else {
    return false;
  }
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
TrieES5.prototype.startsWith = function(prefix) {
  let current = this.root;
  for (let i = 0; i < prefix.length; i++) {
    if (!current.next[prefix[i]]) {
      return false;
    }

    current = current.next[prefix[i]];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

//----------ES6

/**
 * Initialize your data structure here.
 */

class TrieNodeES6 {
  constructor(val = null) {
    this.val = val;
    this.next = {};
    this.end = false;
  }
}

class TrieES6 {
  constructor() {
    this.root = new TrieNodeES6();
  }

  insert(word) {
    let i = 0;
    let current = this.root;
    for (i; i < word.length; i++) {
      if (!current.next[word[i]]) {
        let newTrie = new TrieNodeES6(word[i]);
        current.next[word[i]] = newTrie;
        current = newTrie;
      } else {
        current = current.next[word[i]];
      }
    }

    current.end = true;
  }

  search(word) {
    let current = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!current.next[word[i]]) {
        return false;
      }

      current = current.next[word[i]];
    }
    if (current.end === true) {
      return true;
    } else {
      return false;
    }
  }

  startsWith(prefix) {
    let current = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!current.next[prefix[i]]) {
        return false;
      }

      current = current.next[prefix[i]];
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

//-------------------TESTS

let trieES5 = new TrieES5();
trieES5.insert('apple');
console.log(trieES5.search('apple') === true); // returns true
console.log(trieES5.search('app') === false); // returns false
console.log(trieES5.startsWith('app') === true); // returns true
trieES5.insert('app');
console.log(trieES5.search('app') === true); // returns true
// console.log(trieES5);

let trieES6 = new TrieES5();
trieES6.insert('apple');
console.log(trieES6.search('apple') === true); // returns true
console.log(trieES6.search('app') === false); // returns false
console.log(trieES6.startsWith('app') === true); // returns true
trieES6.insert('app');
console.log(trieES6.search('app') === true); // returns true
// console.log(trieES6);
