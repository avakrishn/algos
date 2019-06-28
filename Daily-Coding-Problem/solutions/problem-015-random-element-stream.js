'use strict';
const assert = require('assert');

//------------------------Problem 15:

/*
  This problem was asked by Facebook.

  Given a stream of elements too large to store in memory, pick a random element from the stream with uniform probability.

  Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
    - You can use any data structure to store the large stream of elements
    - There should be a uniform probability in picking any of the elements as the random element
    - Time: O(N)
    - Space: O(1)
    - You cannot iterate over the array twice (once to find length to determine random number index and then another time to go to the index)

*/

//------------------------Inputs and Outputs:

/*
    Input: (1) -> (2) -> (3) -> (4) -> (5) ------>

    Output: Random probability of choosing any of those elements

*/

//------------------------Approach:

/*
    - Model data as a linked list
    - Variables
      - Value
      - Counter
    - Iterate over the linked list once
      - at each element if
        - a random number generated between 0 and counter is equal to 0 then update value with element's value
      - increment counter
    - return the random value


*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(1)
*/

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function randomElement(node) {
  let current = node,
    value = current.val,
    counter = 1;

  while (current !== null) {
    let randomNum = Math.floor(Math.random() * counter);

    if (randomNum === counter - 1) {
      value = current.val;
    }
    counter++;
    current = current.next;
  }
  return value;
}

//------------------------Alternative

function randomElementAlt(node) {
  let current = node,
    value = current.val,
    counter = 1;

  while (current !== null) {
    let randomNum = Math.random();

    if (randomNum < 1 / counter) {
      value = current.val;
    }
    counter++;
    current = current.next;
  }
  return value;
}

//------------------------TESTS:

let linkedList = new ListNode(1);
linkedList.next = new ListNode(2);
linkedList.next.next = new ListNode(3);
linkedList.next.next.next = new ListNode(4);
linkedList.next.next.next.next = new ListNode(5);

function testRandomNumber(n, func, linkedList) {
  let hash = {};
  for (let i = 0; i < n; i++) {
    let randomNumber = func(linkedList);
    if (hash[randomNumber]) {
      hash[randomNumber]++;
    } else {
      hash[randomNumber] = 1;
    }
  }
  return hash;
}

console.log(testRandomNumber(10000, randomElement, linkedList));
console.log(testRandomNumber(10000, randomElementAlt, linkedList));
