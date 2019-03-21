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