/*

    344. Reverse String (Easy)

    Write a function that reverses a string. The input string is given as an array of characters char[].

    Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

    You may assume all the characters consist of printable ascii characters.

    

    Example 1:

    Input: ["h","e","l","l","o"]
    Output: ["o","l","l","e","h"]
    Example 2:

    Input: ["H","a","n","n","a","h"]
    Output: ["h","a","n","n","a","H"]


*/


//-----------------CODE

/*
    Time: O(N)
    Space: O(1)
*/


/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0, right = s.length-1;
    
    while(left <= right){
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
};

//-----------------TESTS

console.log(reverseString(["h","e","l","l","o"]));
console.log('Result should be: ["o","l","l","e","h"]');
console.log('-----------------------------------------')
console.log(reverseString(["H","a","n","n","a","h"]));
console.log('Result should be: ["h","a","n","n","a","H"]');
console.log('-----------------------------------------')
console.log(reverseString(["P"]));
console.log('Result should be: ["P"]');
console.log('-----------------------------------------')



