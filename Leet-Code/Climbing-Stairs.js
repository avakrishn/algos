/*
    70. Climbing Stairs (Easy)

    You are climbing a stair case. It takes n steps to reach to the top.

    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

    Note: Given n will be a positive integer.

    Example 1:

    Input: 2
    Output: 2
    Explanation: There are two ways to climb to the top.
    1. 1 step + 1 step
    2. 2 steps
    Example 2:

    Input: 3
    Output: 3
    Explanation: There are three ways to climb to the top.
    1. 1 step + 1 step + 1 step
    2. 1 step + 2 steps
    3. 2 steps + 1 step


*/

//--------------------CODE

/*
    Time: O(N)
    Space: O(N)

*/

/**
 * @param {number} n
 * @return {number}
 */


//----Memoization Way 1

var climbStairsMemo1 = function(n) {
    // let counter = 0;
    let memo = {};
    
    var climb = function (i){
        if(i > n){
            return 0;
        }
        if(i === n){
            return 1;
        }
        if(memo[i] > 0){
            return memo[i];
        }
        
        return memo[i] = climb(i+1) + climb(i+2);
      
        
    }
    
    climb(0);
    return memo[0];
};


// Memoization Way 2

var climbStairsMemo2 = function(n) {

    let memo = {};
    
    var climb = function (i){
        if(i < 0){
            return 0;
        }
        if(i === 0){
            return 1;
        }
        if(memo[i] > 0){
            return memo[i];
        }
        
        return memo[i] = climb(i-1) + climb(i-2);
      
        
    }
    
    climb(n);
    return memo[n];
};


// Tabulation Way 1

var climbStairsTab1 = function(n) {

    let tab = new Array(n+1).fill(0);
    tab[0] = 1;
    
    for (let i = 1; i <= n; i++){
        if(tab[i-1] !== undefined){
            tab[i] += tab[i-1];
        }
        if(tab[i-2] !== undefined){
            tab[i] += tab[i-2];
        }
        
        
    }
    
    return tab[n];
};

// Tabulation Way 2

var climbStairsTab2 = function(n) {
    if(n < 3){
        return n;
    }

    let tab = new Array(n+1).fill(0);
    tab[0] = 1;
    tab[1] = 1;
    tab[2] = 2;
    
    for (let i = 3; i <= n; i++){
        if(tab[i-1] !== undefined){
            tab[i] += tab[i-1];
        }
        if(tab[i-2] !== undefined){
            tab[i] += tab[i-2];
        }
        
        
    }
    
    return tab[n];
};






//--------------------TESTS

console.log(climbStairsMemo1(2) === 2);
console.log(climbStairsMemo2(2) === 2);
console.log(climbStairsTab1(2) === 2);
console.log(climbStairsTab2(2) === 2);

console.log(climbStairsMemo1(3) === 3);
console.log(climbStairsMemo2(3) === 3);
console.log(climbStairsTab1(3) === 3);
console.log(climbStairsTab2(3) === 3);

console.log(climbStairsMemo1(44) === 1134903170);
console.log(climbStairsMemo2(44) === 1134903170);
console.log(climbStairsTab1(44) === 1134903170);
console.log(climbStairsTab2(44) === 1134903170);