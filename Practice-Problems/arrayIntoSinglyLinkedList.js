/*
    Given an array and a postition (if wanting to create linked list cycle) create a Singly LinkedList

*/

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

function createLinkedListFromArray(arr, cyclePosition){

    let linkedList = new LinkedList();


    for(let i = 0; i < arr.length-1; i++){
        linkedList.add(arr[i]);
    }

    linkedList.add(arr[arr.length-1], cyclePosition);
        

    return linkedList.head; // return head

}

//-----------------Tests:


// Create a Cycle Singly Linked List from Array:
let createdLL1 = createLinkedListFromArray([3,2,0,-4], 1);
console.log(createdLL1);
console.log(createdLL1.val);
console.log(createdLL1.next.val);
console.log(createdLL1.next.next.val);
console.log(createdLL1.next.next.next.val);
console.log(createdLL1.next.next.next.next.val);
console.log(createdLL1.next.next.next.next.next.val);


// Create a Singly Linked List from Array:
let createdLL2 = createLinkedListFromArray([1,2], 0);
console.log(createdLL2);
console.log(createdLL2.val);
console.log(createdLL2.next.val);
console.log(createdLL2.next.next.val);
console.log(createdLL2.next.next.next.val);
console.log(createdLL2.next.next.next.next.val);
console.log(createdLL2.next.next.next.next.next.val);


// Create a Singly Linked List from Array:
let createdLL3 = createLinkedListFromArray([1], -1);
console.log(createdLL3);
console.log(createdLL3.val);
console.log(createdLL3.next);

// Create a Singly Linked List from Array:
let createdLL4 = createLinkedListFromArray([3,2,0,-4]);
console.log(createdLL4);
console.log(createdLL4.val);
console.log(createdLL4.next.val);
console.log(createdLL4.next.next.val);
console.log(createdLL4.next.next.next.val);
console.log(createdLL4.next.next.next.next);


