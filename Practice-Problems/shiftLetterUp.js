/*
Instructions: Given a string, shift each letter in the string one character up, and return the new string. 

If the next character goes past 'z', come around to the letter 'a'. 

For example: "apple" = "bqqmf" "zim" = "ajn" Create a function called shiftLetterUp() that takes one parameter, a string, and returns the new string with shifted letters.


*/

//------------CODE

/*
    Time: O(N)
    Space: O(N)

*/

function shiftLetterUp(str) {
    let answer = "";

    for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) === 122) {
            answer += "a"
        } else {
            let newChar = String.fromCharCode(str.charCodeAt(i) + 1);
            answer += newChar;
        }
    }

    return answer;

}


//-------------TESTS:

console.log(shiftLetterUp("apple") === "bqqmf");
console.log(shiftLetterUp("zim") === "ajn");
console.log(shiftLetterUp("dailyjavascript") === "ebjmzkbwbtdsjqu");