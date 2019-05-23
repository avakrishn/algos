'use strict';
const assert = require('assert');

//------------------------Problem:

/*
    77. Combinations (Medium)

    Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

    Example:

    Input: n = 4, k = 2
    Output:
    [
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4],
    ]



*/


//------------------------Constraints and Edge Cases:

/*
    - Cannot reuse N within the same combination (eg. [1,1] is NOT valid)
        - Each combination much have unique integers and can only ise each integer once in ever combination
    - Order does not matter in combinations --> want unique combinations
        - [1,3] === [3,1] (only want one of the two)
    - Lower Limit = 1
    - Upper Limit = N ; (integer > 1)
    - Use integers from 1 to N inclusive to create each unique combination, only once
    - Lenght of each combination = K ;  (K < N)
    - Output is a list of combinations where each combination is of length K and each combination contains unique numbers in the range of 1 to N inclusive

    - Contraints
        - Time: O(N choose K)
        - Space: O(N choose K)
*/


//------------------------Inputs and Outputs:

/*
    Input: N = 4, K = 2

    Output: [ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]

    ---

    Input: N = 3, K = 2

    Output: [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]

    ---

    Input: N = 2, K = 1

    Output: [ [ 1 ], [ 2 ] ]
    
    ---


*/


//------------------------Approach:

/*
    Recursion + Back Tracking
        --> Recursion: Used when repeat process over and over again; breaking down problem into smaller and smaller problems
        --> Backtracking: Space Optimization technique; altering same data structure across recursion to save space

    Steps:
        - initialize main function (N = upper limit, K = size of each combination)
        - initialize a result array (will be returned as answer)
        - intialize a combo array (will be pushed and popped from as well as pushed to result array when unique combination is formed)
        - initialize helper function and pass in a number n
            - Base Cases:
                - #1) if combo.length === K 
                    - return result.push(combo.slice());
                        - make a new slice of the combo array because combo array will continue to change due to backtracking and will at the end reference []
                - #2) if n > N (current number > upper limit)
                    - return
            - Recursion
                - push n into combo array
                - call helper function (n+1) : (left recursive call) -> adding n to combo step
                - pop from combo array : (before right recursive call must pop )
                - call helper function (n+1) : (right recursive call) -> skip adding n to combo step
                - (implicit) return
        - call helper function (n = 1 or lower limit)
        - return result array
    
    Recursion Tree:
                                    combo array, n
                            __________    [], 1   ____________
    add n to combo; n++    /                                      \  skip adding n to combo; n++        
                    [1], 2  return                            _____ [], 2   return  ____
                /         \                                 /                           \
    return  [1,2], 3          [1], 3  return            return  [2], 3                  [], 3 return
        base case           /        \                      /       \                   /          \
            #1         [1,3], 4      [1], 4           [2,3], 4      [2], 4            [3], 4      [], 4
          return       base case    base case        base case     base case     base case    base case
                            #1           #2               #1            #2            #2          #2
                        return          return          return       return         return      return 

*/


//------------------------CODE:

/*
    Time: O(N choose K) 
    Space: O(N choose K)
*/

const nChooseK = (N, K) => {
    let result = [];
    let combo = [];
  
    function nChooseKHelper(n){
      if(combo.length === K){
        return result.push(combo.slice());
      }
  
      if(n > N) return;
  
      combo.push(n);
  
      nChooseKHelper(n+1);
  
      combo.pop();
  
      nChooseKHelper(n+1);
  
    }
  
    nChooseKHelper(1);
    return result;
}


//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const createNChooseKTest = (testNumber, N, K, expectedString, resultLength) => {
    const result = nChooseK(N, K);
    const resultString = JSON.stringify(result);
    const test = (resultString === expectedString) && (result.length === resultLength) && (result[0].length === K);
    return runTest(test, testNumber);

}

const testOne = createNChooseKTest(1, 4, 2, '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]', 6, 2);
const testTwo = createNChooseKTest(2, 3, 2, '[[1,2],[1,3],[2,3]]', 3);
const testThree = createNChooseKTest(3, 2, 1, '[[1],[2]]', 2);


const testArray = [testOne, testTwo, testThree];

for(let test of testArray){
    console.log(test);
}

