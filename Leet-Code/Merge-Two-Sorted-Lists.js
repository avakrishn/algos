/*
    21. Merge Two Sorted Lists

        Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

        Example:

        Input: 1->2->4, 1->3->4
        Output: 1->1->2->3->4->4

*/




//--------------------------------CODE



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 * 
 * Time: O(N) Linear
 * Space: O(1) Constant
 * 
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if(l1 == null && l2 == null){
        return l1;
    } else if(l1 == null){
        return l2;
    } else if(l2 == null){
        return l1;
    }
    var head, currentL1, currentL2;
    if(l1.val <= l2.val){
        head = l1;
        currentL1 = l1.next;
        currentL2 = l2;
    }else{
        head = l2;
        currentL1 = l1;
        currentL2 = l2.next;
        
    }
    var prev = head;

    while(currentL1 !== null && currentL2 !== null){
        var tempL;
        if(currentL1.val <= currentL2.val){
            tempL = currentL1.next;
            prev.next = currentL1;
            prev = prev.next;
            prev.next = null;
            currentL1 = tempL;
            
        }else{
            tempL = currentL2.next;
            prev.next = currentL2;
            prev = prev.next;
            prev.next = null;
            currentL2 = tempL;
        }
    }
    if(currentL1 !== null){
        prev.next = currentL1;
        
    }else{
        prev.next = currentL2;
    }
    
    return head;
    
    
};

//-----------------Tests

//---Using process.argv command line arguments
var args, l1Array, l2Array, l1, l2, mergedList;

args = process.argv.slice(2);



var createList = function(valuesArray){
    if(valuesArray.length === 0){
        return null;
    }
    var currentList = new ListNode(valuesArray[0]);
    var head = currentList;

    for(var i = 1; i < valuesArray.length; i++){
        currentList.next = new ListNode(valuesArray[i]);
        currentList = currentList.next;
    }

    return head;

}

var valuesOfList = function(list){
    if(list == null){
        return [];
    }

    let valuesArr = [];
    let current = list;
    while(current !== null){
        valuesArr.push(current.val);
        current = current.next;
    }
    return valuesArr;
}


if(args.length > 0){
    l1Array = JSON.parse(args[0]);
    l2Array = JSON.parse(args[1]);

    l1 = createList(l1Array);
    l2 = createList(l2Array)
    mergedList = mergeTwoLists(l1, l2);

    console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList));
}
 


//--- Predetermined Tests

// TEST ONE
l1Array = [];
l2Array = [];
l1 = createList(l1Array);
l2 = createList(l2Array)
mergedList = mergeTwoLists(l1, l2);
console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList)); // []

// TEST TWO
l1Array = [1,2,3];
l2Array = [1,2,3];
l1 = createList(l1Array);
l2 = createList(l2Array)
mergedList = mergeTwoLists(l1, l2);
console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList)); // [1,1,2,2,3,3]

// TEST THREE
l1Array = [];
l2Array = [1,2,3];
l1 = createList(l1Array);
l2 = createList(l2Array)
mergedList = mergeTwoLists(l1, l2);
console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList)); // [1,2,3]

//TEST FOUR
l1Array = [1,2,3];
l2Array = [1,2,3];
l1 = createList(l1Array);
l2 = createList(l2Array)
mergedList = mergeTwoLists(l1, l2);
console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList)); // [1,1,2,2,3,3]

// TEST FIVE
l1Array = [1,2,3,4,7];
l2Array = [2,4,8];
l1 = createList(l1Array);
l2 = createList(l2Array)
mergedList = mergeTwoLists(l1, l2);
console.log(`l1 = [${l1Array}] `, `l2 = [${l2Array}] `, "output =", valuesOfList(mergedList)); // [ 1, 2, 2, 3, 4, 4, 7, 8 ]

