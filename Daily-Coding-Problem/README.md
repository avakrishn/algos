# Daily Coding Problem

### Solutions to <a href= "https://www.dailycodingproblem.com">Daily Coding Problems</a>

## List:
* [Problem 1: Two Sum Target In Array (Google)](solutions/problem-001-two-sum-target-in-array.js)

* [Problem 2: Product of Array Elements except current Index (Uber)](solutions/problem-002-product-array-except-self.js)

* [Problem 3: Serialize and Deserialize a Binary Tree (Google)](solutions/problem-003-serialize-deserialize-binary-tree.js)

* [Problem 4: First Missing Positive Number (Stripe)](solutions/problem-004-first-missing-positive.js)

* [Problem 5: Implement Functional Programming Functions car and cdr (Jane Street)](solutions/problem-005-functional-car-cdr.js)


## All Problems:

---

### Problem 1:
> This problem was recently asked by Google.



Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?

> Level: Easy


[Problem 1 Solution](solutions/problem-001-two-sum-target-in-array.js)

---

### Problem 2:


> This problem was asked by Uber.

Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.

For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].

Follow-up: what if you can't use division?

> Level: Hard


[Problem 2 Solution](solutions/problem-002-product-array-except-self.js)

---

### Problem 3:


> This problem was asked by Google.

Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'

> Level: Medium


[Problem 3 Solution](solutions/problem-003-serialize-deserialize-binary-tree.js)

---

### Problem 4:


> This problem was asked by Stripe.

Given an array of integers, find the first missing positive integer in linear time and constant space. In other words, find the lowest positive integer that does not exist in the array. The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.

> Level: Hard


[Problem 4 Solution](solutions/problem-004-first-missing-positive.js)

---

### Problem 5:

> This problem was asked by Jane Street.

cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first and last element of that pair. For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.

Given this implementation of cons:

    ```
        function cons (a,b){
            function pair(f){
                return f(a,b);
            }
            return pair;
        }
    ```

Implement car and cdr.

> Level: Medium



[Problem 5 Solution)](solutions/problem-005-functional-car-cdr.js)

---