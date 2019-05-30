'use strict';
/*

202. Happy Number (Easy)

Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Example: 

Input: 19
Output: true
Explanation: 
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1


*/

//--------------------Approach

/**
 * @param {number} n
 * @return {boolean}
 */
/*
    21
    2^2 + 1^2 = 4 + 1 = 5
    5^2 = 25
    2^2 + 5^2 = 4 + 25 = 29
    2^2 + 9^2 = 4 + 81 = 85
    8^2 + 5^2 = 64 + 25 = 89
    8^2 + 9^2 = 64 + 81 = 145
    1^2 + 4^2 + 5^2 = 1 + 16 + 25 = 42
    4^2 + 2^2 = 16 + 4 = 20 
    2^2 + 0^2 = 4 + 0 = 4
    4^2 = 16
    1^2 + 6^2 = 1 + 36 = 37
    3^2 + 7^2 = 9 + 49 = 58
    5^2 + 8^2 = 25 + 64 = 89 <--- seen this number before (loop)
    
*/
// Memoization

/*
Using Memoization + Helper Method Recursion. 
Base cases: check if number is 1 (return true) or has been seen before, number in cache, (return false). 
Otherwise add the number to the cache and find the squared sum of its digits. 
Then call the recursive helper function on the squared sum.

Time: O(N) N = number of call stacks it takes to get to 1 or a number already seen
Space: O(N) N = number of call stacks it takes to get to 1 or a number already seen


*/

//--------------------CODE

const isHappy = function(n) {
    let cache = new Set();
   
    function findNextNumber(num){
        if(num === 1) return true;
        
        if(cache.has(num)) return false;
    
        cache.add(num);
		
		let numArray = num.toString().split("");
        
        let squaredSum = numArray.reduce((total, digit) => total + digit ** 2, 0);
        
        return findNextNumber(squaredSum);
    }
    
    return findNextNumber(n);
}


//--------------------Tests

console.log("Test 1: ", isHappy(19) === true);
console.log("Test 2: ", isHappy(1) === true);
console.log("Test 3: ", isHappy(21) === false);
console.log("Test 4: ", isHappy(100) === true);
console.log("Test 5: ", isHappy(101) === false);
console.log("Test 6: ", isHappy(0) === false);
console.log("Test 7: ", isHappy(7) === true);

