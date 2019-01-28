/*
1.2 Check Permutation: 
Given two strings, write a method to decide if one is a permutation of the other.
*/

//---------------------------Input/ Output
/*
    Input: "car" "rac"
    Output: "true"

    Input: "apple bar" "apebap lars"
    Output: false

*/

//----------------------------Way #1:
/*
    1. Take each string and split into an array and then and sort them in alphabetical order 
        using JS sort method 
    2. Then compare the two strings to each other
    3. First can check that the length of the strings are equal
    4. Case sensitive
*/

function isPermutation(str1, str2){

    if(str1.length !== str2.length){
        return false;
    }

    if(sortString(str1) === sortString(str2)){
        return true;
    }else{
        return false;
    }
}

function sortString(str){
    strArray = str.split(""); // need to include based on what ("") to split the string into an array
    strArray = strArray.sort();
    return strArray.join(""); // need to include based on what ("") to join the array into an string
}

//----------------------------Way #2:
/*
    1. Make sure that the lengths of the 2 strings are equal first, if not return false
    2. Iterate through string 1 and create an object with properties as such: 
        key is the character of the string and the value is the count of the character in the string  
        eg. str1 = "apple" str1Obj = {"a": 1, "p": 2, "l": 1, "e": 1}
        eg. str 1 = " race car" str1Obj = {"r": 2, "a": 2, "c":2, "e": 1, " ": 1};
        ": 1}
    3. Do the same for string 2
    4. Then for each key in string 1 check that there is the same key in string 2 and the values are the same

    Assuming case sensitive
*/

// O(n)

function isPermutation2(str1, str2){
    if(str1.length !== str2.length){
        return false;
    }
    var strObj1 = charCountObject(str1);
    var strObj2 = charCountObject(str2);

    for(key in strObj1){
        if(!strObj2[key] || strObj1[key] !== strObj2[key]){
            return false;
        }
    }

    return true;

}

function charCountObject(str){
    charObj = {};
    for(var i = 0; i < str.length; i++){
        if(str[i] in charObj){
            charObj[str[i]]++
        }else{
            charObj[str[i]] = 1;
        }
    }

    return charObj;
}


//--------------------------Tests

console.log("isPermutation:");
console.log(isPermutation("car", "rac") === true);
console.log(isPermutation("this old house", "house old this") === true);
console.log(isPermutation("Car", "rac") === false);
console.log(isPermutation("car ", "rac") === false);
console.log(isPermutation("car", "apple") === false);

console.log("isPermutation2:");
console.log(isPermutation2("car", "rac") === true);
console.log(isPermutation2("this old house", "house old this") === true);
console.log(isPermutation2("Car", "rac") === false);
console.log(isPermutation2("car ", "rac") === false);
console.log(isPermutation2("car", "apple") === false);
