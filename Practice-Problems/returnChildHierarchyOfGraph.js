
//--------------------------------------- Problem

/*
    Return Child Hierarchy of Graph
    
    Given an array of objects (list of vertices) as the input representing a Grpah/ Tree

    Return an nested heirarchical object/ map representation

    Asked by WeWork

*/

//--------------------------------------- Constraints
/*
    Contraints:
    * If a node has no children then we do not add a key value pair for children
    * Order of vertices in children array does not matter
    * Time -
    * Space - 
*/


//--------------------------------------- Input/ Output

/*

    Input: Array of Objects

    Output: Nested Object

    ---

            3
           / \
          2   5
         / \
        1   7

        Input: [
            {'value' : 1, 'parent': 2},
            {'value' : 7, 'parent': 2},
            {'value' : 2, 'parent': 3},
            {'value' : 5, 'parent': 3},
            {'value' : 3, 'parent': null}
        ]

        Output: {
            {
                'value': 3,
                'parent': null,
                'children': [
                    {
                        'value' : 2,
                        'parent' : 3,
                        'children' : [
                            {
                                'value' : 1,
                                'parent' : 2,
                            },
                            {
                                'value' : 7, 
                                'parent' : 2
                            }
                        ]
                    },
                    {
                        'value' : 5,
                        'parent' : 3,
                    }
                ]
            }
        }
*/

//--------------------------------------- Approach

/*

* Using DFS recursion and Adjacency List

    * Function takes in a list of vertices
        * Find the root of the vertices (parent: null) and form the adjacency list
    
        * Create a helper function which takes in the current node and parent
    
            * Pre order actions
                * Create a new object
                * set current as the 1st argument
                * set parent as the 2nd argument
                * If current has children:
                    * set children to []
                    * Loop throught the children of current 
                        * Recursively call helper function
                        * Post order action
                            * Append created object to current's children array
 
            * Return object



*/

//--------------------------------------- CODE


/*
    Time: O(N)
    Space: O(N)

*/

function createGraphHierarchy(list){

    let {root, adjList} = getRootAndCreateAdjList(list);

    function createMap(current, parent){
        let map = {};
        map.value = current;
        map.parent = parent;
        if(adjList[current]){
            map.children = [];
            for(child of adjList[current]){
                let nestedMap = createMap(child, current);
                map.children.push(nestedMap);
            }
        }
        return map;
    }

    return createMap(root.value, root.parent);
}


function getRootAndCreateAdjList(list){
    let root, adjList = {};

    for(vertex of list){
        
        let parent = vertex["parent"];
        let value = vertex["value"];

        if(parent === null){
            root = vertex;
        }else{
            if(adjList[parent]){
                adjList[parent].push(value);
            }else{
                adjList[parent] = [value]
            }
        }
        
    }
    return {root, adjList};

}

//--------------------------------------- Tests

let vertexList = [
    {'value' : 1, 'parent': 2},
    {'value' : 7, 'parent': 2},
    {'value' : 2, 'parent': 3},
    {'value' : 5, 'parent': 3},
    {'value' : 3, 'parent': null}
]
console.log(JSON.stringify(createGraphHierarchy(vertexList)));