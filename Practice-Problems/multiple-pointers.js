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
