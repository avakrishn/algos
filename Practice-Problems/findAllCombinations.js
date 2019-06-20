/*

Problem: N Choose K

Given two integers n and k, return all possible combinations of k numbers from 1 to n.

Examples:
n = 4
k = 2

result =
[
	[1,2],
	[1,3],
	[1,4],
	[2,3],
	[2,4],
	[3,4],
]

n = 3
k = 1

result =
[
	[1],
	[2],
	[3],
]

Input:
n = Integer

k = Integer

Output
result = Array of Arrays of Integers

Constraints:
Time: O(n choose k)

Space: O(n choose k)

The order of the output array DOES NOT MATTER.

n and k are both positive.

*/
// Using backtracking for space optimization
function combinationsBacktracking(n, k) {
  let combinations = [];
  let arr = [];
  function helper(num) {
    if (arr.length === k) {
      combinations.push(arr.slice());
      return;
    }
    if (num > n) {
      return;
    }

    arr.push(num);
    helper(num + 1);
    arr.pop();
    helper(num + 1);
  }
  helper(1);
  return combinations;
}

function combinationsALT(n, k) {
  let combinations = [];

  function helper(num, arr) {
    if (arr.length === k) {
      combinations.push(arr.slice());
      return;
    }
    if (num > n) {
      return;
    }
    helper(num + 1, arr.slice());
    arr.push(num);
    helper(num + 1, arr.slice());
  }
  helper(1, []);

  return combinations;
}

console.log(combinationsBacktracking(3, 1));
console.log(combinationsBacktracking(4, 2));
console.log(combinationsBacktracking(4, 10));

console.log(combinationsALT(3, 1));
console.log(combinationsALT(4, 2));
console.log(combinationsALT(4, 10));
