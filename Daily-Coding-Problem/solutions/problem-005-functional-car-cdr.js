'use strict';
const assert = require('assert');

//------------------------Problem:

/*

    This problem was asked by Jane Street.

    cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

    Given this implementation of cons:

        ```
            function cons (a,b){
                function pair(f){
                    return f(a,b);
                }
                return pair;
            }
        ```

    Implement car and cdr.

    Level: Medium

*/

//------------------------Constraints and Edge Cases:

/*
    - Implement car and cdr via functional programming

*/


//------------------------Inputs and Outputs:

/*
    Input: car(cons(3, 4))

    Output: 3

    ---

    Input: cdr(cons(3, 4))

    Output: 4

    ---

*/


//------------------------Approach:

/*
    - Break up the functions and the inputs and outputs
    - Notice that car and cdr take in a function that is returned from cons
            - The pair function that is returned from cons has access to the arguments a,b and through closures (inner function has access to variables in the outer scope - lexical environment) that is then passed through function f
    - So the argument passed to car and cdr is the function, pair and pair has access to a,b which it passes to another function
    - It is that new function that is created in car and cdr
             - In car create a function first which returns a
                - In car invoke the argument function of car on first: return f(first)
                    - f will become the function pair and within pair the function first(a,b) will be executed and a will be returned

            - In cdr create a function last which returns b
                - In cdr invoke the argument function of car on last: return f(last)
                    - f will become the function pair and within pair the function last(a,b) will be executed and b will be returned
    
    
    Key takeaways: Functional Programming and Closures


*/


//------------------------CODE:

/*
    Time: N/A 
    Space:  N/A
*/

function cons (a,b){
    function pair(f){
        return f(a,b);
    }
    return pair;
}



function car(f){
    function first(a,b){
        return a;
    }
    return(f(first));
}

function cdr(f){
    function last(a,b){
        return b;
    }
    return(f(last));
}



//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const testOne = runTest(car(cons(3, 4)) === 3, 1);
const testTwo = runTest(cdr(cons(3, 4)) === 4, 2);

const testArray = [testOne, testTwo];

for(let test of testArray){
    console.log(test);
}



