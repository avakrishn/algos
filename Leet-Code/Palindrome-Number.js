/*
  9. Palindrome Number (Easy)

  Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

  Example 1:

  Input: 121
  Output: true
  Example 2:

  Input: -121
  Output: false
  Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
  Example 3:

  Input: 10
  Output: false
  Explanation: Reads 01 from right to left. Therefore it is not a palindrome.


*/

//---------------------CODE
/*
  Time:  O(log N to base 10) - divide input by 10 each iteration
  Space: O(1)

  Approach: Compare Number and Reverse of Number to itself
    If number is negative return false
    While the number is not 0
      Get last digit of number by moding the number by 10
        set the reverse number to the reverse number * 10 + the last digit of number
        set the numebr equal to the floor of the number divided by 10
    If the reverse number and the initial number are eqaul return true
    Else return false
*/

const isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  let num = x;
  let newNum = 0;
  while (num !== 0) {
    newNum = newNum * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  if (x == newNum) {
    return true;
  } else {
    return false;
  }
};

//---------------------TESTS
console.log(isPalindrome(121) === true);
console.log(isPalindrome(-121) === false);
console.log(isPalindrome(10) === false);
