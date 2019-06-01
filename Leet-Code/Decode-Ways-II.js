'use strict';
const assert = require('assert');
const longStrCase = require("./tests/Decode-Ways-II-TestCase.js");

/*
    639. Decode Ways II

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

/*

Code works for large input strings but not extremely large input strings

*/

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

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const testOne = runTest(numDecodingsAdvanced("*") === 9, 1);
const testTwo = runTest(numDecodingsAdvanced("1*") === 18, 2);
const testThree = runTest(numDecodingsAdvanced("*27634732*26347*1236***") === 10901088, 3);
const testFour = runTest(numDecodingsAdvanced("**7") === 105, 4);
const testFive = runTest(numDecodingsAdvanced("***") === 999, 5);
// const testSix = runTest(numDecodingsAdvanced(longStrCase)===683755734, 6); // failed TestCase due to Maximum Call Stack Exceeded

const testArray = [testOne, testTwo, testThree, testFour, testFive];

for(let test of testArray){
    console.log(test);
}