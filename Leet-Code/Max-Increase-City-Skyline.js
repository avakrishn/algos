/*
    807. Max Increase to Keep City Skyline (Medium)

    In a 2 dimensional array grid, each value grid[i][j] represents the height of a building located there. We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). Height 0 is considered to be a building as well. 

    At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. A city's skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

    What is the maximum total sum that the height of the buildings can be increased?

    Example:
    Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
    Output: 35
    Explanation: 
    The grid is:
    [ [3, 0, 8, 4], 
    [2, 4, 5, 7],
    [9, 2, 6, 3],
    [0, 3, 1, 0] ]

    The skyline viewed from top or bottom is: [9, 4, 8, 7]
    The skyline viewed from left or right is: [8, 7, 9, 3]

    The grid after increasing the height of buildings without affecting skylines is:

    gridNew = [ [8, 4, 8, 7],
                [7, 4, 7, 7],
                [9, 4, 8, 7],
                [3, 3, 3, 3] ]

    Notes:

    1 < grid.length = grid[0].length <= 50.
    All heights grid[i][j] are in the range [0, 100].
    All buildings in grid[i][j] occupy the entire grid cell: that is, they are a 1 x 1 x grid[i][j] rectangular prism.

*/

//----------------------------Code:

/*
    Time Complexity: O(n^2)
    Space Complexity: O(n)

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxIncreaseKeepingSkyline = function(grid) {
    
    /*
        1. For each building to find what  the max height in its row or column is
        2. If the current building is the max height in either the row or column you cannot alter the height of the building
        3. else find which is smaller the max height of the row or the max height of the column 
        4. can add to the current building height till it reaches the smaller of the max heights (row vs column)
        
        5. To check within a row [i = 0] for the max height have to check grid[0][0] to grid[0][j] where j is the last element in the row
        6. To check within a column [j = 0] for the max height have to check grid[0][0] to grid[i][0] for all the max heights in column 0
        7. Assumption: matrix grid with same amount of columns as rows
        8. grid.length = number of rows
        9. grid[0].lenght = number of columns
        10. number of rows = number of columns
    */

    let gridLength = grid.length;
    let maxRowValueArr = [];
    let maxColumnValueArr = [];
    let maxRowValue = 0;
    let maxColumnValue = 0;
    let counter = 0;

    
    for(let r = 0; r<gridLength; r++){
        for(let c = 0; c<gridLength; c++){
            if(grid[r][c] > maxRowValue){
                maxRowValue = grid[r][c];
            }
            if(grid[c][r] > maxColumnValue){
                maxColumnValue = grid[c][r];
            }
        }
        maxRowValueArr.push(maxRowValue);
        maxColumnValueArr.push(maxColumnValue);
        maxRowValue = 0;
        maxColumnValue = 0;
    }
    
    for(let r = 0; r<gridLength; r++){
        for(let c = 0; c<gridLength; c++){
            if(maxRowValueArr[r] > maxColumnValueArr[c]){
                counter = counter + (maxColumnValueArr[c] - grid[r][c])
            }else{
                counter = counter + (maxRowValueArr[r] - grid[r][c])
            }
        }

    }
    
    return counter;
    
};

//--------------------------------Tests

console.log(maxIncreaseKeepingSkyline([[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]) === 35);
console.log(maxIncreaseKeepingSkyline([[3,0,4],[2,5,7],[9,6,3]]) === 15);
