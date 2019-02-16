/*


*/


//------------------------------------CODE------------------------------

// O(n) Time

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
    /*
        1. for every character in J add it as a property to a jewels object
        2. for every character in S check to see if it exists within the jewels object
        3. if it does exist increment counter by one
        4. return counter
    */
    let counter = 0;
    let jewelsObj = {}
    
    for(let i = 0; i< J.length; i++){
        jewelsObj[J[i]] = true;
    }
    
    for(let k = 0; k< S.length; k++){
        if(S[k] in jewelsObj){
            counter++;
        }
    }
    
    return counter;
    
};