/*
    Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

    A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
    
    Input: "23"
    Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

    Note:

    Although the above answer is in lexicographical order, your answer could be in any order you want.

 */



 //---------------CODE

 /*
    O(2^n) Time
 
 */

 var letterCombinations = function(str) {
    
    if(!str){
        return [];
    }
    // all possible letters corresponsing to each number on keypad
  let letters = {"0": "0", "1": "1", "2": ["a", "b", "c"], "3": ["d","e", "f"], "4":["g", "h", "i"], "5":["j", "k", "l"], "6": ["m", "n", "o"],"7":["p", "q", "r", "s"], "8":["t", "u", "v"], "9":["w", "x", "y", "z"]};

  let permutations = [];  // the output - all word permutations
  // word = each word permutation 
  // strIndex = index in str
  // letterIndex = index in the values of the letter properties
  function recurse (word, strIndex, letterIndex) {
      // letterOptions = the different latin letter possibilities for a specific letter character in str (ex. for "2" letterOptions = ["A", "B", "C"])
      let letter = str[strIndex];
      // console.log(letter);
      let letterOptions = letters[letter]; 
        // reached the end of the string
        if(strIndex === str.length){
          return permutations.push(word);
        } else if (letterOptions && letterIndex < letterOptions.length){
          let currentPerm = word;
          word += letterOptions[letterIndex];
          recurse(word, strIndex+1, 0);
          recurse(currentPerm, strIndex, letterIndex+1);
        } else if(letterOptions && letterIndex === letterOptions.length-1){
          word += letterOptions[letterIndex];
          recurse(word, strIndex+1, 0);
        }
      }

  recurse("",0,0);
  return permutations;
};

