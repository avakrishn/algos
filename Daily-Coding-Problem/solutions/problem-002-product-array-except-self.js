'use strict';
const assert = require('assert');

//------------------------Problem:

/*

This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?

Level: Hard

*/


//------------------------Constraints and Edge Cases:

/*
    - If only an array with one number such as [4] return [1]
    - Can be negative, positive, integers, and floats
    - Don't use division
    - Time: O(N)
    - Space: O(N) 

*/


//------------------------Inputs and Outputs:

/*
    Input: [1, 2, 3, 4, 5]

    Output: [120, 60, 40, 30, 24]

    ---

    Input: [4]

    Output: [1]

    ---

    Input: [3, 2, 1]

    Output: [2, 3, 6]

    ---

    Input: [1, 2, 3, 4]

    Output: [24, 12, 8, 6]

*/


//------------------------Approach:

/*
    - key insight is that the product of all other elements except self = product of all elements to left * product of all elements to the right
    - initialize a product array of size as input array (nums) to return (productArr)
    - first calculate the product of all number to the left of each number
        - for first element, its left product = 1 (as there are no numbers to the left of it)
        - iterate over nums starting at index = 1, 
            - for all numbers in nums: productArray[i] = nums[i - 1] * productArray[i - 1] (the left product calculated for previous number * previous number)
    - next multiply each position in the productArr with its right product
        - for the last element in the nums array, its right product = 1
        - initialize rightProduct = last element in nums array
        - iterate over nums a second time in reverse order staring at index = nums.length - 2 
            - for all numbers in nums: productArr[i] = productArr[i] * right Product
            - rightProduct = rightProduct * nums[i]
    - return productArr


*/


//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function(nums) {
    let productArr = new Array(nums.length).fill(1);
    productArr[0] = 1;
    
    
    // find product of elements to the left of self
    for(let i = 1; i< nums.length; i++){
        productArr[i] = nums[i-1] * productArr[i-1];
    }
    
    // find product of elements to the right of self 
    let rightProduct = nums[nums.length-1];
    
    for(let i = nums.length-2; i >= 0; i--){
        productArr[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return productArr;
    
};

//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}


const testOneResult = productExceptSelf([1, 2, 3, 4, 5]);
const testOneString = JSON.stringify(testOneResult);
const testOneAssertion = (testOneResult.length === 5) && Array.isArray(testOneResult) && (testOneString === '[120,60,40,30,24]');
const testOne = runTest(testOneAssertion, 1);

const testTwoResult = productExceptSelf([4]);
const testTwoString = JSON.stringify(testTwoResult);
const testTwoAssertion = (testTwoResult.length === 1) && Array.isArray(testTwoResult) && (testTwoString === '[1]');
const testTwo = runTest(testTwoAssertion, 2);

const testThreeResult = productExceptSelf([3, 2, 1]);
const testThreeString = JSON.stringify(testThreeResult);
const testThreeAssertion = (testThreeResult.length === 3) && Array.isArray(testThreeResult) && (testThreeString === '[2,3,6]');
const testThree = runTest(testThreeAssertion, 3);

const testFourResult = productExceptSelf([1, 2, 3, 4]);
const testFourString = JSON.stringify(testFourResult);
const testFourAssertion = (testFourResult.length === 4) && Array.isArray(testFourResult) && (testFourString === '[24,12,8,6]');
const testFour = runTest(testFourAssertion, 4);
    

const testArray = [testOne, testTwo, testThree, testFour];

for(let test of testArray){
    console.log(test);
}



