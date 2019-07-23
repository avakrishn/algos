// 1.1 Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

//----------------------EXAMPLES
// Input: "apple"
// Output: false

// Input: "car"
// Output: true

/*
Questions:
1. ASCII vs Unicode
2. Consider space a character?
*/

// Input: "blue car 123!"
// Output: true (if not counting spaces as a character) ; false(if space is a character)

//-----------------------CODE

//------Way #1: (using additional data structures ex. object)
/*
0. check if length of string, if length is > 128 then return false because there are only 128 unique ASCII characters
1. Iterate over each character in a string and create properties in an object:
    * Create an object where the keys are each individual character
    * Ex str = "apple" {"a": true, "p": true}
2. Before add a letter key to the object check if the letter already exists in the object
    * if letter exists return false (string does not have all unique characters)
3. If get to end of string and have not returned false then know that all characters are unique

Assumption space is considered a character and using standard ASCII characters

Time: O(N)
Space: O(N)
*/

// O(n)
function isUnique(str) {
  if (str.length > 128) {
    return false;
  }
  var charObj = {};
  for (var i = 0; i < str.length; i++) {
    // if(str[i] !== " "){ // if not counting spaces as characters this should be included
    if (str[i] in charObj) {
      return false;
    } else {
      charObj[str[i]] = true;
    }

    // }
  }
  return true;
}

//------Way #2: (not using additional data structure)

/*
Compare every character of the string to every other character of the string. This will take 0(n^2) time and 0(1) space.
*/

function isUnique2(str) {
  var stringTwo = '';
  for (var i = 0; i < str.length; i++) {
    for (var j = 0; j < stringTwo.length; j++) {
      if (str[i] == stringTwo[j]) {
        return false;
      }
    }
    stringTwo += str[i];
  }
  return true;
}

//------Way #3: (not using additional data structure using JS functions: sort the string in O(n log(n)) time and then linearly check the string for neighboring characters that are identical.)

function isUnique3(str) {
  var arr = str.split('');
  arr = arr.sort();
  var newStr = arr.join('');

  for (var i = 0; i < newStr.length - 1; i++) {
    if (newStr[i] === newStr[i + 1]) {
      return false;
    }
  }

  return true;
}

//-----------------------Tests

console.log(isUnique('car') == true);
console.log(isUnique('car ') == true);
console.log(isUnique(' car ') == false);
console.log(isUnique('apple') == false);

console.log(isUnique2('car') == true);
console.log(isUnique2('car ') == true);
console.log(isUnique2(' car ') == false);
console.log(isUnique2('apple') == false);

console.log(isUnique3('car')) == true;
console.log(isUnique3('car ') == true);
console.log(isUnique3(' car ') == false);
console.log(isUnique3('apple') == false);
