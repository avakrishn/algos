'use strict';
const assert = require('assert');

//------------------------Problem 7:

/*
    This problem was asked by Facebook.

    Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, count the number of ways it can be decoded.

    For example, the message '111' would give 3, since it could be decoded as 'aaa', 'ka', and 'ak'.

    You can assume that the messages are decodable. For example, '001' is not allowed.

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


//------------------------Modification:

/*
    Level: Hard

    A message containing letters from A-Z is being encoded to numbers using the following mapping way:

    'A' -> 1
    'B' -> 2
    ...
    'Z' -> 26
    Beyond that, now the encoded string can also contain the character '*', which can be treated as one of the numbers from 1 to 9.

    Given the encoded message containing digits and the character '*', return the total number of ways to decode it.

    Also, since the answer may be very large, you should return the output mod 109 + 7.

    Example 1:
    Input: "*"
    Output: 9
    Explanation: The encoded message can be decoded to the string: "A", "B", "C", "D", "E", "F", "G", "H", "I".
    Example 2:
    Input: "1*"
    Output: 9 + 9 = 18
    Note:
    The length of the input string will fit in range [1, 105].
    The input string will only contain the character '*' and digits '0' - '9'.

    Trick is that have to account for "*"

*/

/*
    Time: O(n)
    Space: O(N)
    Using Memoization and Recursion
*/

//-----------------------CODE

var numDecodingsAdvanced = function(str) {
    let m = ((10**9) + 7);

    let allCounts = new Map();
   
    
    function decoderHelper(index){
        let count = 0 % m;
        
        if(index === str.length){
            return 1;
        }
        
        if(allCounts.has(index)){
            return allCounts.get(index) % m;
        }
        
        let nextIndexInBounds = (index + 1) < str.length;
        let indexPlusTwoInBounds = (index + 2) <= str.length;
        let strTwoDigitSlice = str.slice(index, index+2);
        // let strTwoDigitSlice = str[index] + str[index+1];
        let twoDigitsEqualLetter = ( strTwoDigitSlice > 0) && (strTwoDigitSlice < 27);
       
        
        if(str[index] == "*"){
            count = (count + 9 * decoderHelper(index + 1)) % m;
            
            if(nextIndexInBounds && str[index+1] == "*" 
                && (!indexPlusTwoInBounds 
                    || (indexPlusTwoInBounds && str[index+2] != 0))){ 
                
                //"**" --> "11 - 19 and 21-26"
                count = (count + 15 * decoderHelper(index + 2)) % m;
                
            } 
            else if(indexPlusTwoInBounds){
                    if(str[index+1] == '0'){ //"*0" --> 10 or 20
                        
                        count = (count + 2 * decoderHelper(index+2)) % m;   
                    }
                
                    else if(str[index + 1] > 0 && str[index + 1] < 7){ // "*1" - "*6"
                        
                        count = (count + 2 * decoderHelper(index+2)) % m;
                    }
                
                    else if(str[index + 1] > 6 && str[index + 1] < 10){ // "*7" - "*9"
                        
                        count = (count + decoderHelper(index+2)) % m;   
                    }
            } 
        } 

        
        else if(str[index] > 0){ // "1-9"
            count = (count + decoderHelper(index+1)) % m;
            
            if(nextIndexInBounds){
                if(str[index] == '1' && str[index+1] == "*" 
                   && (!indexPlusTwoInBounds 
                       || (indexPlusTwoInBounds && str[index+2] != 0))){  
                    //"1*"
                    count = (count + 9 * decoderHelper(index+2)) % m;  
                }

                else if(str[index] == '2' 
                        && str[index+1] == "*"
                        && (!indexPlusTwoInBounds 
                            || indexPlusTwoInBounds && str[index+2] != 0)){

                    count = (count + 6 * decoderHelper(index+2)) % m; 
                }

                else if(twoDigitsEqualLetter && indexPlusTwoInBounds){
                    count = (count + decoderHelper(index+2)) % m;
                }
               
            }
        }
       
        allCounts.set(index, count % m);
        return count % m;
        
    }   

    return decoderHelper(0) % m; 
};


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
const testSix = runTest(numDecodingsAdvanced("*") === 9, 6);
const testSeven = runTest(numDecodingsAdvanced("1*") === 18, 7);
const testEight = runTest(numDecodingsAdvanced("*27634732*26347*1236***") === 10901088, 8);
const testNine = runTest(numDecodingsAdvanced("**7") === 105, 9);
const testTen = runTest(numDecodingsAdvanced("***") === 999, 10);

const testArray = [testOne, testTwo, testThree, testFour, testFive, testSix, testSeven, testEight, testNine, testTen];

for(let test of testArray){
    console.log(test);
}



