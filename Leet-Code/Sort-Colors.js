/*
    75. Sort Colors (Medium)

    Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

    Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

    Note: You are not suppose to use the library's sort function for this problem.

    Example:

    Input: [2,0,2,1,1,0]
    Output: [0,0,1,1,2,2]
    Follow up:

    A rather straight forward solution is a two-pass algorithm using counting sort.
    First, iterate the array counting number of 0's, 1's, and 2's, 
    then overwrite array with total number of 0's, then 1's and followed by 2's.
    Could you come up with a one-pass algorithm using only constant space?

*/

/*
    Assumptions: There is at least one of each color (0,1,2) so the length of array is at least 3

*/

/*
    APPROACH 1: 
        Two Pass
        Time: O(N)
        Space: O(1)

    A rather straight forward solution is a two-pass algorithm using counting sort.
    First, iterate the array counting number of 0's, 1's, and 2's, 
    then overwrite array with total number of 0's, then 1's and followed by 2's.


*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColorsTwoPass = function(nums) {
    let colors = new Array(3).fill(0);
    for(let i = 0; i < nums.length; i++){
        if(nums[i] === 0){
            colors[0]++;
        }else if(nums[i] === 1){
            colors[1]++;
        }else{
            colors[2]++;
        }
    }

    for (let k = 0; k < nums.length; k++){
        if(colors[0] > 0){
            nums[k] = 0;
            colors[0]--;
        }else if(colors[1] > 0){
            nums[k] = 1;
            colors[1]--;
        }else{
            nums[k] = 2;
            colors[2]--;
        }
    }
    return nums;
}

/*
    APPROACH 2: (Optimized) 
        One Pass
        Time: O(N)
        Space: O(1)

    Have 3 variables r, w, b where r and w start at index 0 and b starts at array.length -1
    move the w pointer while w <= b
    if array[w] === 0 and w !== r then swap array[w] and array[r] and increment r
    if array[w] === 2 and w !== b then swap array[w] and array[b] and decrement b
    if array[w] === 1 do nothing
    increment w

 
        [0,0,1,1,1,2,2]
        find a 0 flip with a 1, find a 2 flip with 1
        
        [1,1,0,2,0,1,2]
        
        [0,0,0,1,2,2]
             r          
                 w
                 b
                 
        [0,1,2]
         r
           w 
           b
        
        [0,0,1,2,2,2]
           r
               w
               b

*/

var sortColorsOnePass = function(nums) {
    let r = 0, w = 0, b = nums.length -1;
    while(w <= b){
        if(nums[w] === 0 && w !== r){
            [nums[r], nums[w]] = [nums[w], nums[r]];
            r++;
            continue;
        }
        if(nums[w] === 2 && w !== b){
           [nums[w], nums[b]] = [nums[b], nums[w]];
            b--;
            continue;
        }
        w++;
        
    }
    return nums;
    
};


//------------Tests

console.log(sortColorsOnePass([1,1,0,2,0,1,2]));
console.log(sortColorsTwoPass([1,1,0,2,0,1,2]));
console.log(sortColorsOnePass([2,0,1]));
console.log(sortColorsTwoPass([2,0,1]));
console.log(sortColorsOnePass([2,0,2,1,1,0]));
console.log(sortColorsTwoPass([2,0,2,1,1,0]));


