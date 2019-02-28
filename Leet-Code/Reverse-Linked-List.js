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

console.log("Test 1", JSON.stringify(reverseList(newListNode))); 


/*
 *
 * Input: 1 -> 2 -> null
 * Output: 2 -> 1 -> null
 * 
*/
let secondListNode = new ListNode(1);
let secondCurrent = secondListNode;
secondCurrent.next = new ListNode(2);

console.log("Test 2", JSON.stringify(reverseList(secondListNode))); 

/*
 *
 * Input: null
 * Output: null
 * 
*/

let emptyListNode = new ListNode();
console.log("Test 3", JSON.stringify(reverseList(emptyListNode)));



