/*
    509. Fibonacci Number (Easy)

    The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

    F(0) = 0,   F(1) = 1
    F(N) = F(N - 1) + F(N - 2), for N > 1.
    Given N, calculate F(N).

    

    Example 1:

    Input: 2
    Output: 1
    Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
    Example 2:

    Input: 3
    Output: 2
    Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
    Example 3:

    Input: 4
    Output: 3
    Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
    

    Note:

    0 ≤ N ≤ 30.


*/

//---------------CODE

//----WAY 1: Recursion
 /*
    Recursive
    Time: O(2^N)
    Space: O(2^N)

 */

var fib = function(N) {
    if(N < 2){
        return N;
    }
    
    return fib(N-1) + fib(N-2);
    
};

//----WAY 2: Memoization
/*
    Time: O(N)
    Space: O(N)

*/


var fibMemo = function(N) {
    let fibs = {};
    
    var fibHelper = function(i){
                
        if(fibs[i]){
            return fibs[i];
        }
        
        if(i < 2){
            return fibs[i] = i;
        }
        
        return fibs[i] = fibHelper(i-1) + fibHelper(i-2);
    }
    
    fibHelper(N);
    return fibs[N];
    
};

//----WAY 3: Tabulation
/*
    Time: O(N)
    Space: O(1)

*/

var fibTab = function(N) {
    let fibTab = [0,1];
    if(N < 2){
        return fibTab[N];
    }
    
    for(let i = 2; i < N; i++){
        let sum = fibTab[0] + fibTab[1];
        fibTab[0] = fibTab[1];
        fibTab[1] = sum;
    }
    
    return fibTab[0] + fibTab[1];
    
};


//---------------TESTS

console.log(fib(0) === 0);
console.log(fibMemo(0) === 0);
console.log(fibTab(0) === 0);

console.log(fib(1) === 1);
console.log(fibMemo(1) === 1);
console.log(fibTab(1) === 1);

console.log(fib(2) === 1);
console.log(fibMemo(2) === 1);
console.log(fibTab(2) === 1);

console.log(fib(8) === 21);
console.log(fibMemo(8) === 21);
console.log(fibTab(8) === 21);

console.log(fib(44) === 701408733);
console.log(fibMemo(44) === 701408733);
console.log(fibTab(44) === 701408733);