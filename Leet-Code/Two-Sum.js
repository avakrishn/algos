/*
Two Sum

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

*/


//------------------------------------CODE------------------------------
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/*
Input =[1,2,3,4], 4
Output = [0,2]

create an object when iterate once over nums array
storing key: value properties as target-nums[i] : index of nums[i] 
for nums[0] = 2 and target = 9; store in numsObj: 7:0
check for each element if it exists as a key in numsObj - if true then return current element's index as well as the value in numsObj

0(n) time 
*/
var twoSum = function(nums, target) { 
    let numsObj = {}; 
    for(let i = 0; i < nums.length; i++){ 
        if(nums[i] in numsObj){ 
            return [numsObj[nums[i]], i];
        }
        else{
            numsObj[target-nums[i]] = i; 
        }
    }
    
};


//------------------------------------Tests------------------------------

console.log(twoSum([2, 7, 11, 15], 9)); //[0,1]
console.log(twoSum([0,2], 2)) //[0,1]
console.log(twoSum([3, 7, 8, 9, 15, -2], 7)) //[3,5]