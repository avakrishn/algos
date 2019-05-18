/*
    Deserialize an array into a binary tree:

    I: Array

    O: root of binary tree

*/

//-----------------CODE
class TreeNode{
    constructor(val){
        this.val = val;
        this.right = this.left = null;
    }
}


function deserialize (arr){
    if(arr.length == 0) return null;
    let root = new TreeNode(arr[0]);
    let queue = [root];
    // [1,2,3,4]

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


//---------------TESTS

console.log(JSON.stringify(deserialize([1,2,3,4,5,6, 7, 8])));
console.log(deserialize([1,2,3,4,5,6, 7, 8]));
console.log(JSON.stringify(deserialize([1,2,2,null,3,null,3])));
