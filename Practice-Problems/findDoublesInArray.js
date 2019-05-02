// Function should take an array of numbers and check whether its double exists in the array.
// For example:
// If the array contains the number 2 and the number 4, then it would return true. Otherwise, false.


// Time: O(N^2)
// Space: O(1)

function doesArrayContainDouble(arr){
    for(let i = 0; i < arr.length; i++){
        for(let j = i+1; j < arr.length; j++){
            if(arr[i] === arr[j] * 2 || arr[i] === arr[j] / 2){
                return true;
            }
        }
    }
    return false;
}





// Optimized
// Time: O(N)
// Space : O(N)
function doesArrayContainDoubleOptimized(arr){
    let doubles = new Set ();
    for(let i = 0; i < arr.length; i++){
        if(doubles.has(arr[i] * 2) || doubles.has(arr[i] / 2)){
            return true;
        }
        doubles.add(arr[i]);
    }

    return false;
}




//--------Tests

console.log(doesArrayContainDouble([1, 18, 3, 7, 9, 13 ]) === true);
console.log(doesArrayContainDouble([1, 9, 3, 7, 18, 13 ]) === true);
console.log(doesArrayContainDouble([1, 3, 7, 9, 13 ]) === false);
console.log(doesArrayContainDouble([1, 3, 7, 6, 13 ]) === true);
console.log(doesArrayContainDouble([1, 6, 7, 3, 13 ]) === true);
console.log(doesArrayContainDouble([1, 6, 6, 7, 13 ]) === false);
console.log(doesArrayContainDouble([0, 1, 3, 7, 9, 0]) === true);
console.log(doesArrayContainDouble([2, 5, 3, 7, 9, -4]) === false);
console.log(doesArrayContainDouble([2, 5, 3, 7, 9, 4]) === true);

// Optimized:

console.log(doesArrayContainDoubleOptimized([1, 18, 3, 7, 9, 13 ]) === true);
console.log(doesArrayContainDoubleOptimized([1, 9, 3, 7, 18, 13 ]) === true);
console.log(doesArrayContainDoubleOptimized([1, 3, 7, 9, 13 ]) === false);
console.log(doesArrayContainDoubleOptimized([1, 3, 7, 6, 13 ]) === true);
console.log(doesArrayContainDoubleOptimized([1, 6, 7, 3, 13 ]) === true);
console.log(doesArrayContainDoubleOptimized([1, 6, 6, 7, 13 ]) === false);
console.log(doesArrayContainDoubleOptimized([0, 1, 3, 7, 9, 0]) === true);
console.log(doesArrayContainDoubleOptimized([2, 5, 3, 7, 9, -4]) === false);
console.log(doesArrayContainDoubleOptimized([2, 5, 3, 7, 9, 4]) === true);

