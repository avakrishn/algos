/*
    200. Number of Islands
    Medium

    Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

        Example 1:

        Input:
        11110
        11010
        11000
        00000

        Output: 1



        Example 2:

        Input:
        11000
        11000
        00100
        00011

        Output: 3

*/


//------------------CODE:

//--ONE WAY

/**
 * @param {character[][]} grid
 * @return {number}
 
 DFS solution with recursion
 */
var numIslands = function(grid) {

    num_rows = grid.length;
    
    if(num_rows < 1){
        return 0;
    }
    
    num_columns = grid[0].length;
    
    var findNeighboringLand = function (grid, i, j){
        if(i < 0 || j < 0 || i >= num_rows || j >= num_columns || grid[i][j] != "1"){
            return;
        }
        grid[i][j] = "#"
        findNeighboringLand(grid, i+1, j);
        findNeighboringLand(grid, i-1, j);
        findNeighboringLand(grid, i, j+1);
        findNeighboringLand(grid, i, j-1);
    }
    
    var island_counter = 0;

    
    for(var i = 0; i < num_rows; i++){
        for (var j = 0; j < num_columns; j++){
            if(grid[i][j] == "1"){
                findNeighboringLand(grid, i, j);
                island_counter ++;
            }
        }
    }
    
    return island_counter;
    
};


//--ANOTHER WAY (Optimized)

/**
 * @param {character[][]} grid
 * @return {number}
 
 DFS solution with recursion
 */

var numIslandsOptimized = function(grid) {

    num_rows = grid.length;
    
    if(num_rows < 1){
        return 0;
    }
    
    num_columns = grid[0].length;
    
    
     var findNeighboringLand = function (grid, i, j){
        if(grid[i][j] != "1"){
            return;
        }
        grid[i][j] = "#"
        if(i+1 < num_rows){
            findNeighboringLand(grid, i+1, j);
        }
         
        if(i-1 >= 0){
            findNeighboringLand(grid, i-1, j);
        }
         
        if(j+1 < num_columns){
            findNeighboringLand(grid, i, j+1);
        }
        if(j-1 >= 0){
            findNeighboringLand(grid, i, j-1);
        }
        
        
    }
    
    var island_counter = 0;

    
    for(var i = 0; i < num_rows; i++){
        for (var j = 0; j < num_columns; j++){
            if(grid[i][j] == "1"){
                findNeighboringLand(grid, i, j);
                island_counter ++;
            }
        }
    }
    
    return island_counter;
    
};


//----------------------TESTS:

console.log(numIslands([])=== 0);
console.log(numIslandsOptimized([])=== 0);
console.log(numIslands(["1"])=== 1);
console.log(numIslandsOptimized(["1"])=== 1);
console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]) === 1);
console.log(numIslandsOptimized([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]) === 1);
console.log(numIslands([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","1"]]) === 2);
console.log(numIslandsOptimized([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","1"]]) === 2);

