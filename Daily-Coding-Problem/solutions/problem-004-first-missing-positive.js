'use strict';
const assert = require('assert');

//------------------------Problem 4:

/*

    First Missing Positive Number

    This problem was asked by Stripe.

    Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

    For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

    You can modify the input array in-place.


    Level: Hard


*/


//------------------------Constraints and Edge Cases:

/*
    - Time : O(N)
    - Space: O(1)
    - Array can contain negatives, zeros, and duplicates
    - You can modify the input array in place

*/


//------------------------Inputs and Outputs:

/*
    Input: [3, 4, -1, 1]

    Output: 2

    ---

    Input: [1, 2, 0]

    Output: 3

    ---

    Input: [1, 1]

    Output: 2

    ---

    Input: []

    Output: 1

    ---

    Input: [1]

    Output: 2

    ---

    Input: [1,2]

    Output: 3

    ---

    Input: [7,8,9,11,12]

    Output: 1

    ---
    

*/

//------------------------Approach 0: 

/*
    Brute Force if allowed to use extra space
        - loop through array and put all numbers into a set and keep track of a maximum number
        - then loop from 1 to the max number
            - first occurence of when the set does not contain the index return the index
        - if all are in set from 1 to max then return max + 1

*/

//------------------------CODE for Approach 0:

/*
    Time: O(N)
    Space: O(N)
*/

var firstMissingPositiveExtraSpace = function(nums) {

    let set = new Set();
    let max = 0;
    for (let i = 0; i <nums.length; i++){
        set.add(nums[i]);
        if(nums[i] > max){
            max = nums[i];
        }
    }
    
    
    for(let i = 1; i <= max; i++){
        if(!set.has(i)){
            return i;
        }
    }
    
    return max+1;
}




//------------------------Approach 1:

/*
    Swapping Approach
        - if length of array = 0 then return 1
        - First loop through input array
            - If number positive and is less than nums.length + 1 then swap thet number into the index of the input array position
            - Check to make sure that before swapping the index of number does not already contain the number in it (the case for duplicates present in the array)
            - If number is 0 or less than 0 or greater than nums.length then convert that number to -1
        - Second loop through input array
            - when the first occurence of a negative number is found return the index of that number as it is the missing number
        - If no negative number was found then return the length of the array

    
       
    #Pass 1, move every value to the position of its value (if within size of the array)

    #Pass 2, find first location where the index doesn't match the value (first occurence of a negative number)    

*/


//------------------------CODE for Approach 1:

/*
    Time: O(N)
    Space: O(1)
*/

var firstMissingPositiveSwap = function(nums) {
   
    if(nums.length == 0){
        return 1;
    }

    let i = 0;

    while (i < nums.length){
        // console.log(i);
        let index = nums[i];
        if(index < 0){
            i++;
            continue;
        }
        if(index !== i){
            if(index < nums.length + 1 && index !== nums[index]){
                [nums[i], nums[index]] = [nums[index], nums[i]];
            }else{
                nums[i] = -1;
             }
            
        }
        
        if(nums[i] === i){
            i++;
        }
    }
    
    let pInt = nums.length;

    for(let i = 1; i < nums.length; i++){
        if(nums[i] < 0){
            pInt = i;
            break;
        }
    }
    return pInt;
    
};


//------------------------Approach 2:

/*
    OPTIMIZED
    Mark elements as negative
        - First loop through input array
            - for all numbers that less than or equal to zero OR numbers that are greater than the input array length, replace the value with the length of the array + 1 
        - Second loop through input array
            - for each number that is less than the length of the input array change the value of number - 1 index  to be -1 * itself
        - Third loop through input array
            - for the first occurence of a positive number return the index + 1
        - If no positive number was found then return array length + 1


*/

//------------------------CODE for Approach 2:

/*
    Time: O(N)
    Space: O(1)
*/

var firstMissingPositiveMarkNegative = function(nums) {
    for(let i = 0; i< nums.length; i++){
        if(nums[i] <= 0 || nums[i] >nums.length){
            nums[i] = nums.length + 1;
        }
    }
    
    for(let i = 0; i < nums.length; i++){
        let current = Math.abs(nums[i]);
        if(current <= nums.length){
            nums[current-1] = -1 * Math.abs(nums[current-1]);
        }
    }

    for(let i = 0; i < nums.length; i++){
        if(nums[i] > 0){
            return i+1;
        }
    }
    
    return nums.length + 1;
}



//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}



const testOne = runTest(firstMissingPositiveMarkNegative([3, 4, -1, 1]) === 2, 1);
const testTwo = runTest(firstMissingPositiveSwap([3, 4, -1, 1]) === 2, 2);
const testThree = runTest(firstMissingPositiveExtraSpace([3, 4, -1, 1]) === 2, 3);
const testFour = runTest(firstMissingPositiveMarkNegative([1, 2, 0]) === 3, 4);
const testFive = runTest(firstMissingPositiveSwap([1, 2, 0]) === 3, 5);
const testSix = runTest(firstMissingPositiveExtraSpace([1, 2, 0]) === 3, 6);
const testSeven = runTest(firstMissingPositiveMarkNegative([1, 1]) === 2, 7);
const testEight = runTest(firstMissingPositiveSwap([1, 1]) === 2, 8);
const testNine = runTest(firstMissingPositiveExtraSpace([1, 1]) === 2, 9);
const testTen = runTest(firstMissingPositiveMarkNegative([]) === 1, 10);
const testEleven = runTest(firstMissingPositiveSwap([]) === 1, 11);
const testTwelve = runTest(firstMissingPositiveExtraSpace([]) === 1, 12);
const testThirteen = runTest(firstMissingPositiveMarkNegative([222222]) === 1, 13);
const testFourteen = runTest(firstMissingPositiveSwap([222222]) === 1, 14);
const testFifteen = runTest(firstMissingPositiveExtraSpace([222222]) === 1, 15);
const testSixteen = runTest(firstMissingPositiveMarkNegative([1]) === 2, 16);
const testSeventeen = runTest(firstMissingPositiveSwap([1]) === 2, 17);
const testEighteen = runTest(firstMissingPositiveExtraSpace([1]) === 2, 18);
const testNineteen = runTest(firstMissingPositiveMarkNegative([1, 2]) === 3, 19);
const testTwenty = runTest(firstMissingPositiveSwap([1, 2]) === 3, 20);
const testTwentyOne = runTest(firstMissingPositiveExtraSpace([1, 2]) === 3, 21);
const testTwentyTwo = runTest(firstMissingPositiveMarkNegative([7,8,9,11,12]) === 1, 22);
const testTwentyThree = runTest(firstMissingPositiveSwap([7,8,9,11,12]) === 1, 23);
const testTwentyFour = runTest(firstMissingPositiveExtraSpace([7,8,9,11,12]) === 1, 24);


const testArray = [testOne, testTwo, testThree, testFour, testFive, testSix, testSeven, testEight, testNine, testTen, testEleven, testTwelve, testThirteen, testFourteen, testFifteen, testSixteen, testSeventeen, testEighteen, testNineteen, testTwenty, testTwentyOne, testTwentyTwo, testTwentyThree, testTwentyFour];

for(let test of testArray){
    console.log(test);
}



