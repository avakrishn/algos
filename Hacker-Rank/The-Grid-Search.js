/*

(Medium)

Given a 2D array of digits or grid, try to find the occurrence of a given 2D pattern of digits. For example, consider the following grid:

1234567890  
0987654321  
1111111111  
1111111111  
2222222222  
Assume we need to look for the following 2D pattern array:

876543  
111111  
111111
The 2D pattern begins at the second row and the third column of the grid. The pattern is said to be present in the grid.

Function Description

Complete the gridSearch function in the editor below. It should return YES if the pattern exists in the grid, or NO otherwise.

gridSearch has the following parameter(s):

G: the grid to search, an array of strings
P: the pattern to search for, an array of strings

Input Format

The first line contains an integer t, the number of test cases.

Each of the t test cases is represented as follows: 


The first line contains two space-separated integers R and C, indicating the number of rows and columns in the grid G. 
This is followed by R lines, each with a string of C digits representing the grid G. 
The following line contains two space-separated integers,  and , indicating the number of rows and columns in the pattern grid P. 
This is followed by r lines, each with a string of c digits representing the pattern P.


Constraints

1 <= t <= 5
1 <= R,r,C,c <= 1000
1 <= r <= R
1 <= c <= C

Output Format

Display YES or NO, depending on whether P is present in G.


Sample Input

2
10 10
7283455864
6731158619
8988242643
3830589324
2229505813
5633845374
6473530293
7053106601
0834282956
4607924137
3 4
9505
3845
3530
15 15
400453592126560
114213133098692
474386082879648
522356951189169
887109450487496
252802633388782
502771484966748
075975207693780
511799789562806
404007454272504
549043809916080
962410809534811
445893523733475
768705303214174
650629270887160
2 2
99
99
Sample Output

YES
NO
Explanation

The first test in the input file is:

10 10
7283455864
6731158619
8988242643
3830589324
2229505813
5633845374
6473530293
7053106601
0834282956
4607924137
3 4
9505
3845
3530
As one may see, the given pattern is present in the larger grid, as marked in bold below.

7283455864  
6731158619  
8988242643  
3830589324  
2229505813  
5633845374  
6473530293  
7053106601  
0834282956  
4607924137  
The second test in the input file is:

15 15
400453592126560
114213133098692
474386082879648
522356951189169
887109450487496
252802633388782
502771484966748
075975207693780
511799789562806
404007454272504
549043809916080
962410809534811
445893523733475
768705303214174
650629270887160
2 2
99
99
The search pattern is:

99
99
This cannot be found in the larger grid.



*/

//--------------CODE

/*

    Approach:
        first store dimensions of G and P
        search for index of first row of P in all rows of G - height of P
            if exists
                for all remaning rows of P check if is present in G below the P string
    Variables:
        // dimensions of G
            total_G_rows = R = number of rows in G
            total_G_columns = C = number of cols in G
        let total_G_rows = G.length, total_G_columns = G[0].length;
    

        // dimensions of P
            total_P_rows = r = number of rows in P
            total_P_columns = c = number of cols in P
        let total_P_rows = P.length, total_P_columns = P[0].length;



        // col_pattern_starts: the column index and row index where P[0] starts
        let col_pattern_starts, row_pattern_starts;


        // for each Row in G
        for (let i = 0; i < total_G_rows ; i++) 


            // index to start indexOf search 
            let start_index = 0;

       
            // col_pattern_starts: the column start index of where the P[0] string is found in G[i]
            col_pattern_starts = G[i].indexOf(P[0], start_index);


            //  row_pattern_starts: the row start index of where the P[0] string is found in G[i]
            row_pattern_starts = i;

            // while there is an index of the P substring in G
            // while the P[0] string is found in G[i]
            while (col_pattern_starts >= 0)

                // which row and col to end searching in G which was calculated using number 
                // of remaning rows(r - 1) and columns(c - 1) in P
                let last_row_to_search_in_G = row_pattern_starts + ( total_P_rows - 1);
                let last_col_to_seach_in_G = col_pattern_starts + ( total_P_columns - 1);

                // current_row_in_G = row in G and current_row_in_P = row in P to start comparing the strings
                let current_row_in_G = row_pattern_starts + 1;
                let current_row_in_P = 1;

                    // while current_row_in_G is less than or equal to the number of rows in P and within
                    // bounds of G(current_row_in_G < total_G_rows)and (NOT NEEDED: current_row_in_P is within bounds of P(current_row_in_P < r))
                    while (current_row_in_G <= last_row_to_search_in_G && current_row_in_G < total_G_rows && (NOT NEEDED: current_row_in_P < total_P_rows))







*/

function gridSearch(G, P) {


    let total_G_rows = G.length, total_G_columns = G[0].length;
    let total_P_rows = P.length, total_P_columns = P[0].length;

    let col_pattern_starts, row_pattern_starts;

    for (let i = 0; i < total_G_rows; i++) {

        let start_index = 0;

        col_pattern_starts = G[i].indexOf(P[0], start_index);
        
        row_pattern_starts = i;

        
        while (col_pattern_starts >= 0) {
            let last_row_to_search_in_G = row_pattern_starts + (total_P_rows - 1);
            let last_col_to_seach_in_G = col_pattern_starts + (total_P_columns - 1);

            
            let current_row_in_G = row_pattern_starts + 1;
            let current_row_in_P = 1;

            let number_matching_rows = 1;

          
            while (current_row_in_G <= last_row_to_search_in_G && current_row_in_G < total_G_rows) {

                let slicedSubstr = G[current_row_in_G].slice(col_pattern_starts, last_col_to_seach_in_G + 1);

                if (slicedSubstr === P[current_row_in_P]) {
                    number_matching_rows++;
                }

                if (current_row_in_G === last_row_to_search_in_G && slicedSubstr === P[current_row_in_P] && number_matching_rows === (total_P_rows)) {
                    return 'YES';
                }
                
                current_row_in_G++;
                current_row_in_P++;
            }

            start_index ++;

            col_pattern_starts = G[i].indexOf(P[0], start_index);
        }
    }

    return "NO";

}


//------------------TESTS

// YES
let g_one = [
    '7283455864',
    '6731158619',
    '8988242643',
    '3830589324',
    '2229505813',
    '5633845374',
    '6473530293',
    '7053106601',
    '0834282956',
    '4607924137',
];

let p_one = [
    '9505',
    '3845',
    '3530',
];

// NO
let g_two = [
    '400453592126560',
    '114213133098692',
    '474386082879648',
    '522356951189169',
    '887109450487496',
    '252802633388782',
    '502771484966748',
    '075975207693780',
    '511799789562806',
    '404007454272504',
    '549043809916080',
    '962410809534811',
    '445893523733475',
    '768705303214174',
    '650629270887160'
];

let p_two = [
    '99',
    '99'
];


// NO
let g_three =[
    '34889246430321978567',
    '58957542800420926643',
    '35502505614464308821',
    '14858224623252492823',
    '72509980920257761017',
    '22842014894387119401',
    '01112950562348692493',
    '16417403478999610594',
    '79426411112116726706',
    '65175742483779283052',
    '89078730337964397201',
    '13765228547239925167',
    '26113704444636815161',
    '25993216162800952044',
    '88796416233981756034',
    '14416627212117283516',
    '15248825304941012863',
    '88460496662793369385',
    '59727291023618867708',
    '19755940017808628326'
];


let p_three = [
    '1641',
    '7942',
    '6517',
    '8907',
    '1376',
    '2691',
    '2599'
];

// YES

let g_four = [
    '111111111111111',
    '111111111111111',
    '111111111111111',
    '111111011111111',
    '111111111111111',
    '111111111111111',
    '101010101010101'
];

let p_four = [
    '11111',
    '11111',
    '11111',
    '11110',
];

console.log(gridSearch(g_one, p_one) === "YES");
console.log(gridSearch(g_two, p_two) === "NO");
console.log(gridSearch(g_three, p_three) === "NO");
console.log(gridSearch(g_four, p_four) === "YES");
