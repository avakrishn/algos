'use strict';

//------------------------Problem 14:

/*

  This problem was asked by Google.

  The area of a circle is defined as πr^2. Estimate π to 3 decimal places using a Monte Carlo method.

  Hint: The basic equation of a circle is x2 + y2 = r2.

  Level: Medium


*/

//------------------------Constraints and Edge Cases:

/*
    - Monte Carlo Method: use repeated random sampling to obtain a numerical result
    - Formulas
      - Area of circle =  πr^2
      - Circle equation = x2 + y2 = r2

*/

//------------------------Inputs and Outputs:

/*
    Input: number of random tests = 1000000000

    Output: 3.141

*/

//------------------------Approach:

/*
  Equation of Cirlce: x^2 + y^2 = r^2
  Area of Circle = πr^2
  Area of Square = (2r)^2 = 4r^2

  Area of Circle    πr^2      π
  -------------- = ------ = -----
  Area of Square    4r^2      4

  If pick N points at random in square then N * π will fall in circle (M)
                                            -----
                                              4
  A point falls in the circle is x^2 + y^2 < r^2

  N * π                 4 * M
  ----- = M       SO    ----- = π 
    4                     N
  
  N = the number of random points picked inside of square so far
  M = how many of those points fail inside the circle

*/

//------------------------CODE:

/*
    Time: O(N)
    Space: O(1)
*/

function findPiValue(n, radius) {
  let m = 0;
  for (let i = 0; i < n; i++) {
    let x = Math.random() * radius;
    let y = Math.random() * radius;

    if (x ** 2 + y ** 2 < radius ** 2) {
      m++;
    }
  }
  return ((4 * m) / n).toFixed(3);
}

//------------------------TESTS:

console.log(findPiValue(1000, 2));
console.log(findPiValue(1000, 5));
