'use strict';
/*
    
    563. Binary Tree Tilt (Easy)

    Given a binary tree, return the tilt of the whole tree.

    The tilt of a tree node is defined as the absolute difference between the sum of all left subtree node values and the sum of all right subtree node values. Null node has tilt 0.

    The tilt of the whole tree is defined as the sum of all nodes' tilt.

    Example:
    Input: 
            1
        /   \
        2     3
    Output: 1
    Explanation: 
    Tilt of node 2 : 0
    Tilt of node 3 : 0
    Tilt of node 1 : |2-3| = 1
    Tilt of binary tree : 0 + 0 + 1 = 1
    Note:

    The sum of node values in any subtree won't exceed the range of 32-bit integer.
    All the tilt values won't exceed the range of 32-bit integer.

*/

//----------------CODE


/* Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */



function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var findTilt = function(root) {
    let tilt = 0;
    function subtreeTilt(node){
        if(node === null){
            return 0;
        }
        let right = subtreeTilt(node.right);
        let left = subtreeTilt(node.left);

        tilt += Math.abs(right - left);
        return node.val + right + left;

    }    
    
    subtreeTilt(root);
    return tilt;
    
};



//----------------TESTS


// HELPER FUNCTION: (Deserialize array into binary tree)

function deserialize (arr){
    if(arr.length == 0) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];

    for(let i = 1; i < arr.length; i=i+2){
        let current = queue.shift();
        if(arr[i] !== null){
            let newLeft = new TreeNode(arr[i]);
            current.left = newLeft;
            queue.push(newLeft);
        }
        if(i+1 < arr.length && arr[i+1] !== null){
            let newRight = new TreeNode(arr[i+1]);
            current.right = newRight;
            queue.push(newRight);
        }
    }
    return root;
}

let root_one = deserialize([1,2,3]);
let root_two = deserialize([3,2,4,3,1,6,5]);
let root_three = deserialize([1,2,2,3,4,4,3]);
let root_four = deserialize([1,2,2,null,3,null,3]);
let root_five = deserialize([1,2,2,3,7,4,3]);

console.log(findTilt(root_one) === 1);
console.log(findTilt(root_two) === 12);
console.log(findTilt(root_three) === 2);
console.log(findTilt(root_four) === 6);
console.log(findTilt(root_five) === 8);
