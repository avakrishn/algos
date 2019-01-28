/*
1.3 URLify : 
    Write a method to replace all spaces in a string with '%20'.
    You may assume that the string has sufficient space at the end to hold the additional characters, 
    and that you are given the "true" length of the string. 
    (Note: If implementing in Java,please use a character array so that you can perform this operation in place.)
    EXAMPLE
        Input: "Mr John Smith ", 13 
        Output: "Mr%20John%20Smith"
*/


//---------------------------Input/ Output
    /*
        INPUT: "    Hello, Good     Morning"
        OUTPUT: "Hello,%20Good%20Morning"
    
    */


//---------------------------Way #1
    /*
        INPUT: "    Hello, Good     Morning"
        1. Trim the string --> "Hello, Good     Morning"
        2. Split the string into an array (strSplit) on " " --> ["Hello,", "Good", "", "", "", "", "", "Morning" ]
        3. Declare an empty strArray
        4. Iterate through array, strSplit and only push elements that are not "" into the strArray
        5. Join the array (strArray) back into a string where each element is joined with '%20' --> "Hello,%20Good%20Morning"
        6. return the joined string

        Issue: If multiple spaces between characters in string 
            Question: For example, if Input is "Hi   There" and there are 3 spaces between Hi and There 
                will the Output be: "Hi%20There" or "Hi%20%20%20There"
            Assuming: former ("Hi%20There") where should not be consecutive %20's
    */

    //O(n)

    function URLify(str){
        str = str.trim();
        var strSplit = str.split(" "); // [ 'Hello,', 'Good', '', '', '', '', 'Morning' ]
        var strArray = [];
        for(var i = 0; i < strSplit.length; i++){
            if(strSplit[i] !== ""){
                strArray.push(strSplit[i]);
            }
        }
        var strJoin = strArray.join("%20"); // "Hello,%20Good%20Morning"
        return strJoin;
    }

//---------------------------Way #2

/*
    1. Trim the string (str)
    2. Declare a new sring str2 and assign it to ""
    3. Itereate over str and if the character at str[i] == " " 
            check if str[i-1] (the previous character) was also not equal to " "
            then append "%20" to the string str2
        else str[i] != " " then append it to str2
    4. return str2

    This way only uses one data type (string)
*/

//O(n)

function URLify2(str){
    str = str.trim();
    var str2 = "";
    for (var i=0; i<str.length; i++){
      if (str[i] ===' '){
        if (str[i-1] !== " "){
          str2=str2+"%20";
        }
      } else {
        str2=str2+str[i];
      }
    }
    return str2;
  }


//--------------------------Tests

console.log("URLify:");
console.log(URLify("    Hello, Good     Morning") === "Hello,%20Good%20Morning");
console.log(URLify("  January  ") === "January");
console.log(URLify("  Another     Test  ") === "Another%20Test");
console.log(URLify("Mr John Smith ") === "Mr%20John%20Smith");

console.log("URLify2:");
console.log(URLify("    Hello, Good     Morning") === "Hello,%20Good%20Morning");
console.log(URLify("  January  ") === "January");
console.log(URLify("  Another     Test  ") === "Another%20Test");
console.log(URLify("Mr John Smith ") === "Mr%20John%20Smith");

