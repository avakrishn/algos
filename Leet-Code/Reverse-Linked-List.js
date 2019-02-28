/*
    206. Reverse Linked List

    Reverse a singly linked list.

    Example:

    Input: 1->2->3->4->5->NULL
    Output: 5->4->3->2->1->NULL
    Follow up:

    A linked list can be reversed either iteratively or recursively. Could you implement both?
*/ 

//-----------------------CODE

//------------Iterative Solution
/*
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */


function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let current = head;
    if(current === null){
        return head;
    }
    if(current.next === null){
        return head;
    }
    
    let nextNode = current.next;
    let nextNextNode = nextNode.next;
    current.next = null

    while(nextNextNode !== null){
      
        nextNode.next = current;
        current = nextNode;
        nextNode = nextNextNode;
        nextNextNode = nextNode.next;
    }
    
    nextNode.next = current;
    head = nextNode;
    return head;
};

//------------------------Recursive Solution

let reverseListRecursive = function (head) {
    let currentNode = head;
    if(currentNode === null){
        return head;
    }
    if(currentNode.next === null){
        return head;
    }
    let nextNode = currentNode.next;
    currentNode.next = null;
    
    let reverseNodes = function (previousNode, node){
        // console.log(node);
        if(node.next === null){
            node.next = previousNode;
            return head = node; // need to set head = node;
            
        }
        
        let nodeNext = node.next;
        node.next = previousNode;
        reverseNodes(node, nodeNext);
   
    }
    
    reverseNodes(currentNode, nextNode);
    return head;
    
}


//----------------------Tests

/*
 *
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
 * Output: 5 -> 4 -> 3 -> 2 -> 1 -> null
 * 
*/
let newListNode = new ListNode(1);
let current = newListNode;
current.next = new ListNode(2);
current = current.next;
current.next = new ListNode(3);
current = current.next;
current.next = new ListNode(4);
current = current.next;
current.next = new ListNode(5);

console.log("Test 1 Iterative", JSON.stringify(reverseList(newListNode))); 


let newListNodeR = new ListNode(1);
let currentR = newListNodeR;
currentR.next = new ListNode(2);
currentR = currentR.next;
currentR.next = new ListNode(3);
currentR = currentR.next;
currentR.next = new ListNode(4);
currentR = currentR.next;
currentR.next = new ListNode(5);

console.log("Test 1 Recursive", JSON.stringify(reverseListRecursive(newListNodeR)));

/*
 *
 * Input: 1 -> 2 -> null
 * Output: 2 -> 1 -> null
 * 
*/
let secondListNode = new ListNode(1);
let secondCurrent = secondListNode;
secondCurrent.next = new ListNode(2);

console.log("Test 2 Iterative", JSON.stringify(reverseList(secondListNode))); 

let secondListNodeR = new ListNode(1);
let secondCurrentR = secondListNodeR;
secondCurrentR.next = new ListNode(2);

console.log("Test 2 Recursive", JSON.stringify(reverseListRecursive(secondListNodeR))); 

/*
 *
 * Input: null
 * Output: null
 * 
*/

let emptyListNode = new ListNode();
console.log("Test 3 Iterative", JSON.stringify(reverseList(emptyListNode)));

let emptyListNodeR = new ListNode();
console.log("Test 3 Recursive", JSON.stringify(reverseListRecursive(emptyListNodeR)));



