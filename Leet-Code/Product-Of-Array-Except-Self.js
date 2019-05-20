'use strict';
const assert = require('assert');

//------------------------Problem:

/*

238. Product of Array Except Self (Medium)

Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]
Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

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
    Space: O(N) or O(1) is output array (productArr) is not considered for space complexity as the problem explanation suggests
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



