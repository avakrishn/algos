/*
    997. Find the Town Judge (Easy)

    In a town, there are N people labelled from 1 to N.  There is a rumor that one of these people is secretly the town judge.

    If the town judge exists, then:

    The town judge trusts nobody.
    Everybody (except for the town judge) trusts the town judge.
    There is exactly one person that satisfies properties 1 and 2.
    You are given trust, an array of pairs trust[i] = [a, b] representing that the person labelled a trusts the person labelled b.

    If the town judge exists and can be identified, return the label of the town judge.  Otherwise, return -1.

    

    Example 1:

    Input: N = 2, trust = [[1,2]]
    Output: 2
    Example 2:

    Input: N = 3, trust = [[1,3],[2,3]]
    Output: 3
    Example 3:

    Input: N = 3, trust = [[1,3],[2,3],[3,1]]
    Output: -1
    Example 4:

    Input: N = 3, trust = [[1,2],[2,3]]
    Output: -1
    Example 5:

    Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
    Output: 3
    

    Note:

    1 <= N <= 1000
    trust.length <= 10000
    trust[i] are all different
    trust[i][0] != trust[i][1]
    1 <= trust[i][0], trust[i][1] <= N

*/

//----------------------CODE


/*
    Time: O(N)
    Space: O(N)

*/


//-----ONE WAY


/*
    Convert list of edges into an adjacency list then find if there is one person who trusts no one and everyone else trusts that person

    Edge Case: Input: N = 1, [] Output: 1

*/

var findJudge = function(N, trust) {
    /*
        given a list of edges convert into an adjacency matrix and then if there are is a key with a value of [] then that key is the judge else return -1
    */
    
    if(trust.length === 0){
        return 1;
    }
    
    let judge = -1;
    let adjList = {};
    
    //form adjacency list
    for (let i = 0; i < trust.length; i++){
        let person = trust[i][0];
        let trusted = trust[i][1];
        
        if(adjList[person]){
            adjList[person].add(trusted);
        }else{
            adjList[person] = new Set();
            adjList[person].add(trusted);
        }
        
        if(!adjList[trusted]){
            adjList[trusted] = new Set();
        }
    }
    
    // find judge if exists
    for(let person in adjList){
        if(adjList[person].size === 0){
            judge = person;
        }
    }
    
    // if judge exists make sure that all other people trust the judge
    if(judge !== -1){
        let proposedJudge = parseInt(judge);
        for(let person in adjList){
            if(person !== judge && !adjList[person].has(proposedJudge)){
                judge = -1;
                break;
            }
        }
    }
    
    
    return parseInt(judge);
};


//-----------Optimized solution

/*
    Optimize adjacency list into 2 arrays: one with who each person trusts and one with who trusts each person.

    The town judge will trust no one and everyone will trust the town judge

*/


var findJudgeOptimized = function (N, trust){
    let person = new Array(N+1).fill(0);
    let trusted = new Array(N+1).fill(0);
    
    for(let i = 0; i < trust.length; i++){
        let p = trust[i][0];
        let t = trust[i][1];
        
        person[p]++;
        trusted[t]++;
    }
   
    for(let i = 1; i <= N; i++){
        if(person[i] === 0 && trusted[i] === N-1){
            return i;
        }
    }
    
    return -1;
    
}



//---------------------TESTS

console.log(findJudge(2, [[1,2]]) === 2);
console.log(findJudgeOptimized(2, [[1,2]]) === 2);

console.log(findJudge(3, [[1,3], [2,3]]) === 3);
console.log(findJudgeOptimized(3, [[1,3], [2,3]]) === 3);

console.log(findJudge(3, [[1,3], [2,3], [3,1]]) === -1);
console.log(findJudgeOptimized(3, [[1,3], [2,3], [3,1]]) === -1);

console.log(findJudge(3, [[1,2], [2,3]]) === -1);
console.log(findJudgeOptimized(3, [[1,2], [2,3]]) === -1);

console.log(findJudge(4, [[1,3],[1,4],[2,3],[2,4],[4,3]]) === 3);
console.log(findJudgeOptimized(4, [[1,3],[1,4],[2,3],[2,4],[4,3]]) === 3);

console.log(findJudge(1, []) === 1);
console.log(findJudgeOptimized(1, []) === 1);