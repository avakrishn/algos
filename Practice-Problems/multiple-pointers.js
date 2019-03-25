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
let arr = [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1];
let arr2 = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
let arr3 = [ 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1 ];
let arr4 = [ 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0 ];
console.log(bitArraySort(arr));
console.log(bitArraySort(arr2));
console.log(bitArraySort(arr3));
console.log(bitArraySort(arr4));










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