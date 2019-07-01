'use strict';

//------------------------Problem 16:

/*

  This problem was asked by Twitter.

  You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

  record(order_id): adds the order_id to the log
  get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.

  You should be as efficient with time and space as possible.

  Level: Easy

*/

//------------------------Constraints and Edge Cases:

/*
    - Be as efficient with time and space as possible

*/

//------------------------Approach:

/*
  1. Approach 1
    Using a Doubly Linked List of set size
      - record: add to tail and if size is greater than max size then set this.head to this.head.next --> O(1)
      - get last i element: if index is < 1/2 of size iterate from head to index otherwise iterate from tail backwards using prev pointer --> O(N/2) = O(N)

  2. Approach 2 (OPTIMIZED)
    Using a circular buffer cache [] or {}
      - record: O(1)
        - have a current index = 0 initially
        - place new element at cache[current index]
        - current index = current index + 1 % max size
      - get ith last element O(1)
        - return cache[maxsize - i] 
*/

//------------------------CODE:

/*
    Circular Buffer Approach
    Time: Record = O(1), Get = O(1) 
    Space: O(N) where N is the max size of the cache
*/

class Ecommerce {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.currentId = 0;
    this.cache = new Array(this.maxSize);
  }

  record(element) {
    this.cache[this.currentId] = element;
    this.currentId = (this.currentId + 1) % this.maxSize;
  }

  getLastIthElement(i) {
    return this.cache[this.maxSize - i];
  }
}

//------------------------TESTS:

let ecommerce = new Ecommerce(5);
ecommerce.record(1);
console.log(ecommerce);
ecommerce.record(2);
console.log(ecommerce);
ecommerce.record(3);
console.log(ecommerce);
ecommerce.record(4);
console.log(ecommerce);
ecommerce.record(5);
console.log(ecommerce);
ecommerce.record(6);
console.log(ecommerce);
ecommerce.record(7);
console.log(ecommerce);
ecommerce.record(8);
console.log(ecommerce);
ecommerce.record(9);
console.log(ecommerce);
ecommerce.record(10);
console.log(ecommerce);
console.log(ecommerce.getLastIthElement(1));
console.log(ecommerce.getLastIthElement(2));
console.log(ecommerce.getLastIthElement(3));
console.log(ecommerce.getLastIthElement(4));
console.log(ecommerce.getLastIthElement(5));
