/*
Math - Random Number
Prompt
Given a function foo that produces random numbers between 1-5 with equal probability, write a function bar that generates numbers between 1-7, that uses foo internally and NOT the built in random function.

Examples:

Input: None
Output: 4

If we were to run this one hundred times, we would expect there to be an almost
even distribution of fourteen 1s, 2s, 3s, 4s, 5s, 6s, and 7s.


You'll have access to a helper method:
foo() => P(1, 2, 3, 4, 5) = 20%

It outputs numbers between 1-5, each with 20% probability.

You DO NOT have to write foo(), it will be given.

Input:
None
Output
integer
Constraints:
Time: O(1)

Space: O(1)

Solve this without using the built in random function.
*/
/*
Approach:

5(row -1) + col

In baz call foo twice 
  - row + col = new value

      1   2   3   4   5
      ------------------
  1 | 1   2   3   4   5
  2 | 6   7   8   9   10
  3 | 11  12  13  14  15
  4 | 16  17  18  19  20 
  5 | 21  22  23  24  25

  just need up till 7 so after 7 just take number % 7 to restart the 1-7

      1   2   3   4   5
      ------------------
  1 | 1   2   3   4   5
  2 | 6   7   1   2   3
  3 | 4   5   6   7   1
  4 | 2   3   4   5   6 
  5 | 7  22  23  24  25

We want the same probability for each one of them
  - if we hit 22,23,24,25 --> do not consider it but recalculate until number fall within range 1 to 21
  return --> number % 7

Random even probabilty from 1-7 calculated by using random 1-5 calculator



*/

function foo() {
  return Math.floor(Math.random() * 5) + 1;
}

function baz() {
  let row = foo(),
    col = foo();
  let num = 5 * (row - 1) + col;
  if (num > 21) {
    return baz();
  } else {
    // if(num % 7 === 0){
    //   return 7;
    // } else{
    //   return num % 7;
    // }
    return 1 + ((num - 1) % 7);
  }
}

// console.log(baz());

let hash = {};
for (let i = 0; i < 1000; i++) {
  let x = baz();
  if (hash[x]) {
    hash[x]++;
  } else {
    hash[x] = 1;
  }
}

console.log(hash);
