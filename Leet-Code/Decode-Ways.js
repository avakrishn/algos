'use strict';
const assert = require('assert');

//------------------------Problem:

/*
    91. Decode Ways (Medium)
    
    A message containing letters from A-Z is being encoded to numbers using the following mapping:

    'A' -> 1
    'B' -> 2
    ...
    'Z' -> 26
    Given a non-empty string containing only digits, determine the total number of ways to decode it.

    Example 1:

    Input: "12"
    Output: 2
    Explanation: It could be decoded as "AB" (1 2) or "L" (12).
    Example 2:

    Input: "226"
    Output: 3
    Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
    Level: Medium


*/


//------------------------Constraints and Edge Cases:

/*
    - All Messages are decodable
    - String integers
    - The string is non empty

*/


//------------------------Inputs and Outputs:

/*
    Input: "12"

    Output:  2
    
    It could be decoded as "AB" (1 2) or "L" (12).

    ---

    Input: "226"

    Output: 3

    It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

    ---

    Input: "111"

    Output: 3

    It could be decoded as 'aaa', 'ka', and 'ak'.

*/


//------------------------Approach:

/*
    Memoization + Recursion
    Time: O(N) - only visiting each index once (if visit index again get count result from cache)
    Space: O(N) - call stack and Map created depend on size of the string

    - initialize function that takes in a string
        - initialize Map as cache
        - initialize helper function that takes in an index
            - Base Cases
                - initialize count to 0
                - if index is the length of the string - return 1 as have gone through entire string in one valid path
                - if index is in cache then return the result of cache[index]
            - Recursive Cases
                - if str[index] is greater than 0 then there is a valid path to continue to the next index : count += helper function with index + 1
                    - if str[index] + str[index+1] + "" are within bounds of the array and the concatenation if a number that is > 0 but < 27 : then continuing on with index + 2 is a valid way so count += helper function with index + 2
            
            - add cache[index] = count
            - return count

        - return helper function on index 0
        



*/


//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/


const numDecodings = function(str) {
    let allCounts = new Map();
    function helper(index){
        let count = 0;
        
        if(index === str.length){
            return 1;
        }
        
        if(allCounts.has(index)){
            return allCounts.get(index);
        }
        
        let firstDigitNotZero = str[index] > 0;
        let indexPlusTwoInBounds = (index + 2) <= str.length;
        let strTwoDigitSlice = str.slice(index, index+2)
        let twoDigitsEqualLetter = ( strTwoDigitSlice > 0) && (strTwoDigitSlice < 27);
        
        if(firstDigitNotZero){
            count += helper(index+1);
            
            if(indexPlusTwoInBounds && twoDigitsEqualLetter){
                count += helper(index+2);
            }
        }
        
        allCounts.set(index, count);
        return count;
        
    }
    
    return helper(0);
}




//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const testOne = runTest(numDecodings("1") === 1, 1);
const testTwo = runTest(numDecodings("12") === 2, 2);
const testThree = runTest(numDecodings("226") === 3, 3);
const testFour = runTest(numDecodings("1231221321") === 48, 4);
const testFive = runTest(numDecodings("111") === 3, 5);


const testArray = [testOne, testTwo, testThree, testFour, testFive];

for(let test of testArray){
    console.log(test);
}



