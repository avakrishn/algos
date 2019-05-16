/*

345. Reverse Vowels of a String (Easy)

Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:

Input: "hello"
Output: "holle"
Example 2:

Input: "leetcode"
Output: "leotcede"
Note:
The vowels does not include the letter "y".

*/


/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let left = 0, right = s.length-1;
    let vowels = new Set();
    vowels.add("a").add("e").add("i").add("o").add("u");
    // Don't forget about Uppercase Letters    
    vowels.add("A").add("E").add("I").add("O").add("U"); 
    let str = s.split("");
    
    while(left <= right){
        if(!vowels.has(str[left])){
            left++;
            continue;
        }
        
        if(!vowels.has(str[right])){
            right--;
            continue;
        }
        
        [str[left], str[right]] =  [str[right], str[left]];
        left++;
        right--;
    }
    
    return str.join("");
    
};

//------------------TESTS

console.log(reverseVowels("hello"));
console.log('The output should be: "holle"')
console.log('----------------------------------');
console.log(reverseVowels("leetcode"));
console.log('The output should be: "leotcede"');
console.log('----------------------------------');
console.log(reverseVowels("aA"));
console.log('The output should be: "Aa"')
console.log('----------------------------------');