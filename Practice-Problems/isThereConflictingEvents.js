'use strict';

//----- Problem 1 (EASY)
/*
Given unsorted appointment time frames (start,end)
return true if there is a conflict/ overlap
return false if no conflict
LeadData
Input: [(1,2), (12,17), (8,13)] -> true
Output: Boolean true if conflicts in ranges

- first < second

     *
I [[1,2], [12,17], [8,13]]
  
                  *
[[1,2], [8,13], [12,17]] --> true

[[1,2], [8,12], [12,17]] --> false

Time: O(NlogN)--> think sorting (native sort)
Space: O(N)


sort the input array -> .sort()

loop through the array 
  - check to see that current[1] < current+1[0] 
        if not return true (there is conflict)

return false




*/
//                 i 
// a = [[1, 2], [8, 12], [12, 17]]


/*
    Time: O(NlogN)
    Space: O(N)

*/
function findConflicts(arr){
    let a = arr.sort(function (a,b){
        if(a[0] < b[0]) return -1;
        else return 1;
    });
  
    for(let i = 0; i < a.length-1; i++){
      let current = a[i]; // [8,12]
      if(current[1] > a[i+1][0]){ 
        return true;
      }
    }
  
    return false;
  
  }
  
  console.log("Test 1: ", findConflicts([[1,2], [8,13], [12,17]]) === true); // true
  
  console.log("Test 2: ", findConflicts([[1,2], [8,12], [12,17]]) === false); // false

  console.log("Test 3: ", findConflicts([]) === false);
  
  console.log("Test 4: ", findConflicts([3,4]) === false);

  
  
  //----------Problem 2 (Medium Followup)
  /*
  Given a sorted list of times and a potential time return true if there is a conflict and false if there is not a conflict
  
                    e   s
                    m        potential
  [[1,2], [3,7], [12,13]], [8, 12] -> false
  
  
                    se
                    m       potential
  [[1,2], [3,7], [12,13]], [8, 14] -> true
  
                     e     s
                     m
    [[1,2], [3,7],[12,15]]   [13,18] --> true
  
  if potential[0] < mid[0] && potential[1] > mid[1] --> true
  if potential[0] > mid [0] && potential [1] < mid[1] 
  if potential [0] > mid[0] && potential[0] < mid[1]
  if potential [1] > mid[0] && potential[1] < mid[1]
  
  
  input array is sorted and no conflicts
  
  Time: O(logN)
  
                 s e
                  m
  [[1,2], [3,7],[12,15]]   [7,13]
  
  arr, potential
  
  initialize start = arr[0]
  initialize end = arr[arr.length-1]
  
  while start <= end
    mid = (start + end) / 2
  
    (end - start / 2) + start
    if potential[0] < mid[0] && potential[1] > mid[1] --> true
    if potential[0] > mid [0] && potential [1] < mid[1]
    if potential [0] > mid[0] && potential[0] < mid[1]
    if potential [1] > mid[0] && potential[1] < mid[1]
  
    if(mid[1] <= potential[0]){
      start = mid + 1
    }else{
      end = mid - 1
    }
  
    return false
  
  */

  /*
    Time: O(logN)
    Space: O(1)
  */
  
  function isThereAConflict(arr, potential){
    let start = 0, end = arr.length-1;
  
    while(start <= end){
      let mid = Math.floor((start + end) / 2);
      
      if (potential[0] <= arr[mid][0] && potential[1] >= arr[mid][1]) return true; // [[5,7]] , [5,7] OR [[6,7]] , [5,8]
      if (potential[0] >= arr[mid][0] && potential[1] <= arr[mid][1]) return true;  // [[5,8]] , [6,7] 
      if (potential[0] >= arr[mid][0] && potential[0] < arr[mid][1]) return true; // [[9,18]], [10,20]
      if (potential[1] > arr[mid][0] && potential[1] <= arr[mid][1]) return true; // [[9,18]], [5,18]
      // if (potential[0] === arr[mid][0]) return true;
  
      if(arr[mid][1] <= potential[0]){
        start = mid + 1;
      }else{
        end = mid - 1;
      }
    }
  
    return false;
  
  }
  
  console.log("Test 5: ", isThereAConflict([[1,2], [3,7], [12,13]], [8, 12]) === false); // false : there is not a conflict
  
  console.log("Test 6: ", isThereAConflict([[1,2], [3,7], [12,13]], [8, 14]) === true); // true:  there is a conflict

  console.log("Test 7: ", isThereAConflict([[1,2], [3,7], [12,15]], [8, 14]) === true);

  console.log("Test 8: ", isThereAConflict([[1,2], [3,7], [12,20]], [13, 24]) === true);

  console.log("Test 9: ", isThereAConflict([[1,2], [3,7], [12,20]], [13, 15]) === true);

  console.log("Test 10: ", isThereAConflict([[1,2], [3,7], [12,13]], [29, 30]) === false);

  console.log("Test 11: ", isThereAConflict([[1,2], [3,7], [12,13]], []) === false);

  console.log("Test 12: ", isThereAConflict([], [29, 30]) === false);

  console.log("Test 13: ", isThereAConflict([[1,2]], [1, 5]) === true);

  console.log("Test 14: ", isThereAConflict([[1,2]], [1, 2]) === true);

  console.log("Test 15: ", isThereAConflict([[4,7]], [1, 5]) === true);

  console.log("Test 16: ", isThereAConflict([[4,7]], [5, 7]) === true);

  console.log("Test 17: ", isThereAConflict([[4,7]], [7, 8]) === false);

  console.log("Test 18: ", isThereAConflict([[5,7]], [5,7]) === true);

  console.log("Test 19: ", isThereAConflict([[5,8]], [6,7]) === true);

  console.log("Test 20: ", isThereAConflict([[9,18]], [10,20]) === true);

  console.log("Test 21: ", isThereAConflict([[9,18]], [5,18]) === true);

  console.log("Test 22: ", isThereAConflict([[6,7]], [5,8]) === true);





  
// THINK ABOUT EDGE CASES

