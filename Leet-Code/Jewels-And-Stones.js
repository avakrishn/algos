/*
Jewels and Stones

You're given strings J representing the types of stones that are jewels, and S representing the stones you have.  Each character in S is a type of stone you have.  You want to know how many of the stones you have are also jewels.

The letters in J are guaranteed distinct, and all characters in J and S are letters. Letters are case sensitive, so "a" is considered a different type of stone from "A".

Example 1:

Input: J = "aA", S = "aAAbbbb"
Output: 3
Example 2:

Input: J = "z", S = "ZZ"
Output: 0
Note:

S and J will consist of letters and have length at most 50.
The characters in J are distinct.

*/


//------------------------------------CODE------------------------------

// O(n) Time

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    /*
        1. for every character in J add it as a property to a jewels object
        2. for every character in S check to see if it exists within the jewels object
        3. if it does exist increment counter by one
        4. return counter
    */
    let counter = 0;
    let jewelsObj = {};
    
    for(let i = 0; i< J.length; i++){
        jewelsObj[J[i]] = true;
    }
    
    for(let k = 0; k< S.length; k++){
        if(S[k] in jewelsObj){
            counter++;
        }
    }
    
    return counter;
    
};

//------------------------------------Tests------------------------------


console.log(numJewelsInStones("aA", "aAAbbbb") === 3); //true
console.log(numJewelsInStones("z", "ZZ") === 0); //true
console.log(numJewelsInStones("abc", "AaBBCc") === 2); //true