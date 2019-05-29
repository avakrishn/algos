'use strict';
const assert = require('assert');

//------------------------Problem:

/*

    448.  Find All Numbers Disappeared in an Array (Easy)
    
    Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

    Find all the elements of [1, n] inclusive that do not appear in this array.

    Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

    Example:

    Input:
    [4,3,2,7,8,2,3,1]

    Output:
    [5,6]

*/


//------------------------Constraints and Edge Cases:

/*
    - Integers are between 1 and te size of the array
    - There can be duplicates of the same number
    - Time: O(N)
    - Space : O(1) where the returned list does not count as extra space

*/


//------------------------Inputs and Outputs:

/*
    Input: [4,3,2,7,8,2,3,1]

    Output: [5,6]

    ---

    Input: [1]

    Output: []

    ---

    Input: [2,2,2,2]

    Output: [1,3,4]

    ---

    Input: []

    Output: []

    ---

*/


//------------------------Approach:

/*
    Mark Elements as Negative
        - first loop
            - for each element (abs value) make the array[element -1] = -1 times the absolute value of itself
            - for example: 
                - Input: [4,3,2,7,8,2,3,1]
                - each iteration of first loop: 
                    i = 0, element = 4, array[4-1] = -7: [4, 3, 2, -7, 8, 2, 3, 1]
                    i = 1, element = 3, array[3-1] = -2: [4, 3, -2, -7, 8, 2, 3, 1]
                    i = 2, element = 2, array[2-1] = -3: [4, -3, -2, -7, 8, 2, 3, 1]
                    i = 3, element = 7, array[7-1] = -3: [4, -3, -2, -7, 8, 2, -3, 1]
                    i = 4, element = 8, array[8-1] =  1: [4, -3, -2, -7, 8, 2, -3, -1]
                    i = 5, element = 2, array[2-1] =  -3: [4, -3, -2, -7, 8, 2, -3, -1] (nothing changes as have already seen a 2)
                    i = 6, element = 3, array[3-1] =  -2: [4, -3, -2, -7, 8, 2, -3, -1] (nothing changes as have already seen a 3)
                    i = 7, element = 1, array[1-1] =  -4: [-4, -3, -2, -7, 8, 2, -3, -1]
        - second loop
            - loop through array
                - when find a number that is greater than 0 push it into result array
        
        - return result array
            - for example return result = [5, 6]


*/


//------------------------CODE:

/*
    - Time: O(N)
    - Space : O(1) where the returned list does not count as extra space
*/


const findDisappearedNumbers = function(nums) {
    
    let answer = [];
    for(let i= 0; i< nums.length; i++){
        let current = Math.abs(nums[i]);
        nums[current-1] = -1 * Math.abs(nums[current-1]);

        // alternate
        // if(nums[current-1] > 0){
        //     nums[current-1] *= -1;
        // }
    }
    
    for(let i = 0; i<nums.length; i++){
        if(nums[i] > 0){
            answer.push(i+1);
        }
    }
    
    return answer;
    
};





//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}


const testOneResult = JSON.stringify(findDisappearedNumbers([4,3,2,7,8,2,3,1]));
const testOne = runTest(testOneResult === '[5,6]', 1);

const testTwoResult = JSON.stringify(findDisappearedNumbers([1]));
const testTwo = runTest(testTwoResult === '[]', 2);

const testThreeResult = JSON.stringify(findDisappearedNumbers([2,2,2,2]));
const testThree = runTest(testThreeResult === '[1,3,4]', 3);

const testFourResult = JSON.stringify(findDisappearedNumbers([]));
const testFour = runTest(testFourResult === '[]', 4);


const testArray = [testOne, testTwo, testThree, testFour];

for(let test of testArray){
    console.log(test);
}


