/*
    Problem:
    https://www.hackerrank.com/challenges/strange-code/problem

*/

//--- CODE:

function strangeCounter(t) {
  // if t falls in i = 0 batch return the fixed value
  if (t <= 3) {
    if (t == 1) {
      return 3;
    } else if (t == 2) {
      return 2;
    } else {
      return 1;
    }
  }

  let i = 1;
  // ith batch's starting time is (3 * (2 ** i) - 2)
  // ith batch's ending time is (3 * (2 ** i) - 2) + (3 * (2 ** i)) - 1
  // while loop checks to see at which i does t fall in
  while (3 * 2 ** i - 2 < t) {
    let finalT = 3 * 2 ** i - 2 + 3 * 2 ** i - 1;
    if (t <= finalT) {
      break;
    }
    i++;
  }

  // pattern for the ith batch
  let starting_value = 3 * 2 ** i;
  let starting_time = 3 * 2 ** i - 2;

  // the answer value is the starting value minus the difference or t and the starting time
  return starting_value - (t - starting_time);
}

//-----Tests

console.log(strangeCounter(4) === 6);
console.log(strangeCounter(1) === 3);
console.log(strangeCounter(3) === 1);
console.log(strangeCounter(9) === 1);
console.log(strangeCounter(10) === 12);
console.log(strangeCounter(14) === 8);
console.log(strangeCounter(21) === 1);
console.log(strangeCounter(80) === 14);
