/*

101. Symmetric Tree (Easy)

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3
 

Note:
Bonus points if you could solve it both recursively and iteratively.




*/

//--------------------CODE

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

// Iterative (BFS)
/*
    Where N = total number of nodes
    Time: O(N) (traverse to each node once)
    Space: O(N) (queue)
*/


var isSymmetricIterative = function(root) {
    let queue = [];
    queue.push(root);
    queue.push(root);
    while(queue.length > 0){
        let node1 = queue.shift();
        let node2 = queue.shift();
        if(node1 === null && node2 === null){
            continue;
        }
        if(node1 === null || node2 === null){
            return false;
        }
        if(node1.val !== node2.val){
            return false;
        }
        queue.push(node1.left);
        queue.push(node2.right);
        queue.push(node2.left);
        queue.push(node1.right);        
    }
    return true;
};

// Recursive
/*
    Where N = total number of nodes
    Time: O(N) (traverse to each node once)
    Space: O(N) (height of tree worst case is linear = N)
*/

var isSymmetricRecursive = function(root) {
    function checkSymmetry(node1, node2){
        if(node1 === null && node2 === null) return true;
        if(node1 === null || node2 === null) return false;
        
        return (node1.val === node2.val) 
            && checkSymmetry(node1.left, node2.right) 
            && checkSymmetry(node1.right, node2.left);   
    }
    
    return checkSymmetry(root, root);
    
};




//--------------------TESTS

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

let root_one = deserialize([1,2,2,3,4,4,3]);
let root_two = deserialize([1,2,2,null,3,null,3]);
let root_three = deserialize([1,2,2,3,7,4,3]);

console.log(isSymmetricIterative(root_one) === true);
console.log(isSymmetricRecursive(root_one) === true);
console.log(isSymmetricIterative(root_two) === false);
console.log(isSymmetricRecursive(root_two) === false);
console.log(isSymmetricIterative(root_three) === false);
console.log(isSymmetricRecursive(root_three) === false);

