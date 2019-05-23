'use strict';
const assert = require('assert');

//------------------------Problem:

/*

This problem was asked by Google.

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

Level: Medium

*/


//------------------------Constraints and Edge Cases:

/*
    - Cannot ONLY use JSON.stringify for serialize and JSON.parse for deserialize
    - Can use BFS, iterative DFS, or recursive DFS to solve
    - You are given a Node class
    - The following test should pass 
                  'root'
                /       \
            'left'        'right'
            /
          'left.left '


*/


//------------------------Inputs and Outputs:

/*
    Input: root of the following tree:
                  'root'
                /       \
            'left'        'right'
            /
          'left.left '


    Output: the root of the above tree


*/


//------------------------Approach:

/*
    Serialize and Deserialize array using BFS

    Serialize should take in a root node of a binary tree and return an string of an array of all node values taken from tree in Breadth First Search Order

    Deserialize should take in a string of an array of all node values taken from tree in Breadth First Search Order and return the tree node of  a binary tree

    // TO DO: Implement DFS Iterative and DFS Recursive approaches
*/


//------------------------CODE:


/*
    For each function 
    Time: O(N)
    Space: O(N)
*/

class Node {
    constructor(val){
        this.val = val;
        this.left = this.right = null;
    }
}

const serialize = function(root) {
    let queue = [];
    let result = [];
    queue.push(root);
    
    while(queue.length > 0){
        let node = queue.shift();
        
        if(node){
            result.push(node.val); 
            queue.push(node.left);
            queue.push(node.right);
             
        }else{
            result.push(null);
        }
    }

    return JSON.stringify(result);
    
};

var deserialize = function(data) {
    let arr = JSON.parse(data);
    if(arr.length == 0 || arr[0] == null) return null;
    let root = new Node(arr[0]);
    let queue = [root];

    for(let i = 1; i < arr.length; i=i+2){
        let current = queue.shift();
        if(arr[i] !== null){
            let newLeft = new Node(arr[i]);
            current.left = newLeft;
            queue.push(newLeft);
        }
        if(i+1 < arr.length && arr[i+1] !== null){
            let newRight = new Node(arr[i+1]);
            current.right = newRight;
            queue.push(newRight);
        }
    }
    return root;
};





//------------------------TESTS:

const runTest = (test, index) => {
    const error = assert(test, `Test ${index}: Incorrect Result`);
    if(!error) return `Test ${index}: ${true}`;
    return error;
}

const root = new Node ('root');
root.left = new Node ('left');
root.right = new Node ('right');
root.left.left = new Node ('left.left');

const result = deserialize(serialize(root));
console.log("result: ", result);

const assertion = (result.val === 'root') && (result.left.val === 'left') && (result.right.val === 'right') && (result.left.left.val = 'left.left');

const testOne = runTest(assertion, 1);

const testArray = [testOne];

for(let test of testArray){
    console.log(test);
}




