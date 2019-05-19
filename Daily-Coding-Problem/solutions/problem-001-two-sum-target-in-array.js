'use strict';
var assert = require('assert');

//------------------------Problem:

/*

This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?

Level: Easy


*/


//------------------------Constraints and Edge Cases:

/*
    - Searching for TWO numbers withing array to add up to k
    - Numbers and k can be negative or positive, integers or floats
    - If there are less than 2 numbers return false
    - Do in One pass (Time: O(N))

*/


//------------------------Inputs and Outputs:

/*
    Input: numberList = [10, 15, 3, 7] , k = 17

    Output: True (10 + 7 = 17)

    ---

    Input: numberList = [10, 15, 3, 7] , k = 5

    Output: False

    ---

    Input: numberList = [10] , k = 10

    Output: False

    ---

    Input: numberList = [] , k = 17

    Output: False

    ---

    Input: numberList = [3, 3, 4, 2, 1] , k = 6

    Output: True (3 + 3 = 6 and 4 + 2 = 6)
*/


//------------------------Approach:

/*
    - Create an object called sumPairs
    - Iterate over each number in number list
    - If the number is a key in the sumPairs object, then its complement has already been found so return true
    - Else add to sumPairs { (k - number): number }
    - After finished iterating through array then return false
*/


//------------------------CODE:

/*
    Time: O(N)
    Space: O(N)
*/


const isTwoSumInArray = (numberList, k) =>{
    let sumPairs = {};

    for(let number of numberList){
        if(sumPairs[number]) return true;

        sumPairs[k-number] = number;
    }
    return false;
};


//------------------------Modification:

/*
    If two numbers exist in list of numbers that add up to k, then return a tuple of the indices of the two numbers.
    Else return false.

    Time: O(N)
    Space: O(N)

*/

const isTwoSumInArrayIndices = (numberList, k) =>{
    let sumPairs = {};
    for(let index in numberList){
        let number = numberList[index];

        if(sumPairs[number]) return [sumPairs[number], index];

        sumPairs[k-number] = index;
    }
    return false;

}


//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const testOne = runTest(isTwoSumInArray([10, 15, 3, 7], 17) === true, 1);

const testTwo = runTest(isTwoSumInArray([10, 15, 3, 7], 5) === false, 2);

const testThree = runTest(isTwoSumInArray([10], 10) === false, 3);

const testFour = runTest(isTwoSumInArray([], 17) === false, 4);

const testFive = runTest(isTwoSumInArray([0.5, 0.5], 1) === true, 5);

const testSix = runTest(isTwoSumInArray([7, 3, 20, 3, 4, 2, 1], 6) === true, 6);

const testSeven = runTest(isTwoSumInArray([-1, 3, 7, 10], 9) === true, 7);

const testEightResult = isTwoSumInArrayIndices([10, 15, 3, 7], 17);
const testEight = runTest(testEightResult[0] === '0' && testEightResult[1] === '3', 8);

const testNineResult = isTwoSumInArrayIndices([0.5, 0.5], 1);
const testNine = runTest(testNineResult[0] === '0' && testNineResult[1] === '1', 9);

const testTenResult = isTwoSumInArrayIndices([7, 3, 20, 3, 4, 2, 1], 6);
const testTen = runTest(testTenResult[0] === '1' && testTenResult[1] === '3', 10);

const testArray = [testOne, testTwo, testThree, testFour, testFive, testSix, testSeven, testEight, testNine, testTen];

for(let test of testArray){
    console.log(test);
}

