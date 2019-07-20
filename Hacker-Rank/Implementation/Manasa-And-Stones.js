/*
    Problem:
    https://www.hackerrank.com/challenges/manasa-and-stones/problem

*/

//--- CODE:


// Dynamic Programming
function stones(n, a, b) {
    //n is number of stones including 0th stone
    //a and b are possible differences

    let cache = {};
    let array = [];
    function helper(sum, i) {
        if (i == n - 1) {
            if (!cache[sum]||cache[sum]!="recorded") {
                cache[sum] = "recorded";
                array.push(sum);
            }
            return;
        }
        if (cache[sum]==i) {
            return;
        }
        cache[sum] = i;
        helper(sum + a, i + 1)
        helper(sum + b, i + 1)
    }
    helper(0, 0);

    array.sort(function (a, b) { return a - b });
    return array;
}

// Iterative

function stones(n, a, b) {
    let nums = [];
    if (a > b) [a,b] = [b,a];
    for (let i = 0; i <= n-1; i++) {
      nums.unshift(i * a + ((n-1-i) * b));
    }
    return Array.from(new Set(nums));
}