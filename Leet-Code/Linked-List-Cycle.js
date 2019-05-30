'use strict';

/*
    141. Linked List Cycle (Easy)
    
    Given a linked list, determine if it has a cycle in it.

    To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) 
    in the linked list where tail connects to. 
    If pos is -1, then there is no cycle in the linked list.

    

    Example 1:

    Input: head = [3,2,0,-4], pos = 1
    Output: true
    Explanation: There is a cycle in the linked list, where tail connects to the second node.


    Example 2:

    Input: head = [1,2], pos = 0
    Output: true
    Explanation: There is a cycle in the linked list, where tail connects to the first node.


    Example 3:

    Input: head = [1], pos = -1
    Output: false
    Explanation: There is no cycle in the linked list.
    

    Follow up:

    Can you solve it using O(1) (i.e. constant) memory?

*/

//---------------------CODE


/* 
    Using a Seen Set 
    Time: O(N)  
    Space: O(N)
*/
var hasCycleSet = function(head) {
    let seen = new Set();
    let current = head;
  
    while(current !== null){
        
        if(seen.has(current)){
            return true;
        }else{
            seen.add(current);
        }
        
        current = current.next;
    }
    
    return false;
    
};

/* 
    Using Two pointers
    Time: O(N) 
    Space: O(1)
*/
var hasCyclePointers = function(head) {
    if(head === null || head.next === null){
        return false;
    }
    
    let slow = head;
    let fast = head.next;
  
    while(slow !== fast){
        if(fast === null || fast.next === null){
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return true;
    
};




//---------------------Code Creating a Linked List For Tests

class ListNode {
    constructor(val = null){
        this.val = val;
        this.next = null;
    }
}

class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add(val, cyclePosition){
        let newNode = new ListNode(val);
        if(this.head === null){
           
            this.head = newNode;
        
        }else{
            let current = this.head;

            while(current.next !== null){
                current = current.next;
            }

            current.next = newNode;
        }
        
        this.size++;

        if((cyclePosition !== undefined || cyclePosition !== null) && cyclePosition >= 0 && cyclePosition <= this.size){
            let nextNode = this.findLinkedListAt(cyclePosition);
            newNode.next = nextNode;
        }
    }

    findLinkedListAt(position){ // 0 indexed

        if(position < 0 || position >= this.size) throw new Error("No such position exists");

        let index = 0;
        let current = this.head;

        while(index < position){ // 4 < 4
            current = current.next;
            index++;
        }

        return current;

    }

    
}

const createLinkedListFromArray = (arr, cyclePosition) =>{

    let linkedList = new LinkedList();


    for(let i = 0; i < arr.length-1; i++){
        linkedList.add(arr[i]);
    }

    linkedList.add(arr[arr.length-1], cyclePosition);
        

    return linkedList.head; // return head

}

//---------------------Tests

let testOneLL = createLinkedListFromArray([3,2,0,-4], 1);
console.log("Test 1 Set: ", hasCycleSet(testOneLL) === true);
console.log("Test 1 Pointers: ", hasCyclePointers(testOneLL) === true);

let testTwoLL = createLinkedListFromArray([1,2], 0);
console.log("Test 2 Set: ", hasCycleSet(testTwoLL) === true);
console.log("Test 2 Pointers: ", hasCyclePointers(testTwoLL) === true);

let testThreeLL = createLinkedListFromArray([1], -1);
console.log("Test 3 Set: ", hasCycleSet(testThreeLL) === false);
console.log("Test 3 Pointers: ", hasCyclePointers(testThreeLL) === false);

let testFourLL = createLinkedListFromArray([1,4,2,5,7], 10);
console.log("Test 4 Set: ", hasCycleSet(testFourLL) === false);
console.log("Test 4 Pointers: ", hasCyclePointers(testFourLL) === false);

let testFiveLL = createLinkedListFromArray([], -1);
console.log("Test 5 Set: ", hasCycleSet(testFiveLL) === false);
console.log("Test 5 Pointers: ", hasCyclePointers(testFiveLL) === false);

let testSixLL = createLinkedListFromArray([1,4,5,6,2,3], 3);
console.log("Test 6 Set: ", hasCycleSet(testSixLL) === true);
console.log("Test 6 Pointers: ", hasCyclePointers(testSixLL) === true);

let testSevenLL = createLinkedListFromArray([1], 0);
console.log("Test 7 Set: ", hasCycleSet(testSevenLL) === true);
console.log("Test 7 Pointers: ", hasCyclePointers(testSevenLL) === true);
