//--------------Frequency Counting------------------------
'use strict';

/**
 *  Two Sum
 *  Given an array of integers, and a target value determine if there are two integers that add to the sum.
 * 
 * 
 *  Input: [4,2,6,5,7,9,10], 13
 *  Output: true
 * 
 * 
 *  Parameters
 *  Input: arr {Array}, target {int}
 *  Output: {boolean}
 *
 *  Constraints
 *  Time: O(N)
 *  Auxiliary Space: O(N)
 *  However future lookups can be performed in O(1) time as a result.
 */

 function twoSum(arr, target){
     if(arr.length < 1){
         return false;
     }

     let count_set = new Set();

     for (let i = 0; i < arr.length; i++){
        if(count_set.has(arr[i])){
            return true;
        }else{
            count_set.add(parseInt(target - arr[i]));
        }
     }

     return false;

 }

 // ANOTHER WAY

//  function twoSum(numbers, target){
//     let hash = {};
//     let current;
//     for(let i = 0; i < numbers.length; i++) {
//       current = numbers[i];
//       if(hash[current]) { return true; }
//       hash[target - current] = true;
//     }
//     return false;
//   }


 //----------------TESTS

//  let arr = [4,2,6,5,7,9,10];
//  let target = 13;
//  let target2 = 35;

//  console.log(twoSum(arr,target));
//  console.log(twoSum(arr,target2));




/**
 * Sort a Bit Array
 * 
 * Given a bit array, return it sorted in-place (a bit array is simply an array that contains only bits, either 0 or 1).
 * See if you can solve this in O(N) time and O(1) auxiliary space.
 * Try to solve this using a frequency count rather than using multiple pointers, or using a comparison sort function.
 * 
 * 
 * Input : [0, 1, 1, 0, 1, 1, 1, 0]
 * Output : [0, 0, 0, 1, 1, 1, 1, 1]
 * 
 * 
 *  Parameters
 *  Input: arr {Array}
 *  Output: {Array}
 *
 *  Constraints
 *  Time: O(N)
 *  Auxiliary Space: O(1)
 * 
 */

 function bitArray(arr){

    if(arr.length < 2){
        return arr;
    }
    let count = new Array(2).fill(0); // [count of 0's, count of 1's]

    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 0){
            count[0]++;
        }else{
            count[1]++;
        }
    }
    let index = 0;
    while(count[0] > 0 || count[1]> 0){
        if(count[0] > 0){
            arr[index] = 0;
            index++;
            count[0]--;
        }else{
            arr[index] = 1;
            index++;
            count[1]--; 
        } 
    }

    return arr;
    
 }

//--------TESTS
let arr = [0, 1, 1, 0, 1, 1, 1, 0];
console.log(bitArray(arr));



//--------------------------------------HINTS

//-----------Two Sum

/**
 * Brute Force
    This problem looks quite similar to the sorted two sum problem, but the input array is not sorted. If we use a brute force approach we could try every single unique pair in the array. This would solve the problem in O(N^2) time.

    Try to solve this problem without using hints first. If you get stuck then use the minimum hints to get yourself unstuck. Goodluck!

    * Hint 1
        Try using a hash table (or a set) to store values we have come across to speed up lookup time.

    * Hint 2
        As we look through each value in the array, what do we need to check in the hash to know whether there is a sum that matches the target?
        If the hash does not contain a matching value, then what should we add to the hash table?
        If the hash does contains a matching value, what should we do?
        If we finish the loop but have not found a match, what should we return?
 */

//-----------Sort a Bit Array

/**
 * Hint 1:
    Since there are only two values we could use a two item array to keep a count of zeros and ones.

 * Hint 2:
    After creating and populating a frequency count, how do we use the number of zeros and number of ones to populate the original input array.
 */