//--------------MULTIPLE POINTERS------------------------
'use strict';

/**
 *  Sort a Bit Array
 *  Given a bit array, return it sorted in-place (a bit array is simply an array that contains only bits, either a 1 or a 0).
 *  See if you can solve this in O(N) time and O(1) auxiliary space.
 * 
 *  Parameters
 *  Input: arr {Array}
 *  Output: {Array}
 *            p_0
 *        p_1                     
 *  [0, 1, 0, 1, 0, 1, 0, 1] --> [0, 0, 0, 1, 1, 1, 1, 1]
 *
 *  Constraints
 *  Time: O(N)
 *  Auxiliary Space: O(1)
 */


function bitArraySort(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {

        if (arr[left] === 0) {
            left++;
        }
        if (arr[right] === 1) {
            right--;
        }
        if(arr[left] === 1 && arr[right] === 0){
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    return arr;
}

//-------------TESTS
// let arr = [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1];
// let arr2 = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
// let arr3 = [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1 ];
// let arr4 = [ 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ];
// console.log(bitArraySort(arr));
// console.log(bitArraySort(arr2));
// console.log(bitArraySort(arr3));
// console.log(bitArraySort(arr4));



/**
 * Sorted Two Sum
 * 
 * Given a sorted array of integers and a target value, determine if there exists two integers in the array that sum up to the target value.
 * See if you can solve this in O(N) time and O(1) auxiliary space.
 * 
 * Parameters
 *  Input: arr {Array}
 *  Output: {boolean}
 *  
 *
 *  Constraints
 *  Time: O(N)
 *  Auxiliary Space: O(1)
 * 
 *                 r
 *  l
 * [0, 3, 5, 6, 8, 9]
 * target = 10
 * 
 */

 function sortedTwoSum(arr, target){
     if(arr.length < 1){
         return false;
     }

     let l = 0;
     let r = arr.length -1;

     while (l < r){
         if(arr[l] + arr[r] === target){
             return true;
         }else if(arr[l] + arr[r] > target){
             r--;
         }else{
             l++;
         }
     }

     return false;

 }

//----------------TESTS

let arr = [0, 3, 4, 6, 8, 9];
let target = 7;

console.log(sortedTwoSum(arr,target));







//--------------------------------------HINTS

//-----------Sort a Bit Array

/**
 * Hint 1

    Since we want to sort it in-place we should be modifying the values change changing its position rather than creating a new array. Additionally because there are only two possible values, and we know that the 0’s will have to be on the left, and the ones have to be on the right. How can we identify elements to swap?

 * Hint 2

    If we have two pointers: one that starts on the very left, and one on the very right, then we can iterate inward.
    We need to iterate the left pointer until it hits a 1
    Then decrement the right pointer to the left until it reaches a 0
    Once we find them we will do a swap.
 */

//-----------Sorted Two Sum
/**
* Hint 1

    Given that the array is sorted, we know every element right is equal or larger and every element to the left is lower. How could we approach this in a more efficiently with multiple pointers?

* Hint 2

    If we have two pointers: one that starts on the very left, and one on the very right, we can find the sum of them.
    What happens if this sum is greater? What happens if this sum is less than? And what happens if this sum is equal?
    What happens if the two pointers eventually meet and we have not found a pair that matches the target?
 
 * Brute Force

    The brute force approach would be, to try out every single possible pair combination and see if the sum matches the target. This would lead to a O(N^2) time complexity because the number of pairs is proportional to N^2.

* Frequency Hash

    We could also try to create a hashtable or map to speed up the search or lookup time to find a match. But this would lead to a O(N) amount of auxiliary space.
 */