/*
    297. Serialize and Deserialize Binary Tree (Hard)

    Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

    Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

    Example: 

    You may serialize the following tree:

     1
    / \
    2   3
        / \
        4   5

    as "[1,2,3,null,null,4,5]"
    Clarification: The above format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

    Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.



*/

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */

// implement queue class later

/*
    Serialize and Deserialize using BFS

*/

var serialize = function(root) {
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

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let arr = JSON.parse(data);
    if(arr.length == 0 || arr[0] == null) return null;
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
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */


//-----------TESTS

let root = new TreeNode (1);
root.left = new TreeNode (2);
root.right = new TreeNode (3);
root.right.left = new TreeNode (4);
root.right.right = new TreeNode (5);

let rootString = JSON.stringify(root);

let test = deserialize(serialize(root));

console.log(JSON.stringify(test) === rootString);

