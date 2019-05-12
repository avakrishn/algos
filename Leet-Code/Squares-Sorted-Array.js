/*
    977. Squares of a Sorted Array (Easy)

    Given an array of integers A sorted in non-decreasing order, return an array of the squares of each number, also in sorted non-decreasing order.

    Example 1:

    Input: [-4,-1,0,3,10]
    Output: [0,1,9,16,100]
    Example 2:

    Input: [-7,-3,2,3,11]
    Output: [4,9,9,49,121]
    

    Note:

    1 <= A.length <= 10000
    -10000 <= A[i] <= 10000
    A is sorted in non-decreasing order.

*/

//-------Code
/*
    2 pointer approach
    Time : O(N)
    Space: O(N)
    N is length of A

    Find the midpoint (first positive element) using Binary Search
        If all positive elements then mid = 0
        If all negative elements then mid = A.length
    Set pointer one = mid-1 and pointer two = mid
    Compare the square routes and push the lower value and move the respective pointer to the edge of the array
    return result array
*/

/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    let result = [];
    
    let start = 0, end = A.length, mid;
    
    while(start <= end){
        mid = Math.floor((start+end)/2);
        // console.log(mid);
        if(A[mid] >= 0 && A[mid-1] < 0){
            break;
        }else{
            if(A[mid] >= 0){
                end = mid-1;
            }else{
               start = mid+1; 
            }
        }
    }
    
    if(A[A.length-1] < 0){
        mid = A.length;
    }
    
    let i = mid-1, j = mid;
    
    while(i>=0 || j < A.length){
        if(i>=0 && A[i]**2 <= A[j]**2 || j == A.length){
            result.push(A[i]**2);
            i--;
        }else{
            result.push(A[j]**2);
            j++;
        }
    }
    
    return result;
    
};