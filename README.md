# Sudoku
[![LoC](https://tokei.rs/b1/github/NikolSkvarilova/sudoku?category=code)](https://github.com/NikolSkvarilova/sudoku)
![GitHub last commit](https://img.shields.io/github/last-commit/NikolSkvarilova/sudoku?color=%23ff006e&logo=git&logoColor=%20%20%23ffffff)
![GitHub repo size](https://img.shields.io/github/repo-size/NikolSkvarilova/sudoku?color=%23741FFF&label=repo%20size&logo=Github)

[Check out the development process on Trello!](https://trello.com/b/PfZc7t8b)

## Project is on Heroku!
[Heroku Link](https://not-just-sudoku.herokuapp.com/)

## How to run
* Run `npm install` before trying to run live react server just to check (update, install) dependencies.
* `npm run` will run the react (frontend) server.
* `yarn start-api` will run the backend server (see more in `package.json`).
  * Or just `cd api` and `python app.py`. 

## App
![app design image](app_design.png)

## Sudoku Solving Strategies
> Values in []: first value is cost for first use, second is cost for subsequent uses.

* **Single Candidate** [100, 100] - Checks for cell **with only one possible value** and fills them with it.

* **Single Position** [100, 100] - Choose a row, column or box, and then go through each of the numbers that hasn’t already been placed.
  * [useful link](https://www.sudokuoftheday.com/techniques/single-position/#:~:text=Solving%20Sudoku%20%3A%20Single%20Position,hasn't%20already%20been%20placed)

### Naked Pairs/Triples
This technique is known as “Naked Subset” or “Disjoint Subset” in general, and works by **looking for candidates that can be removed from other cells**. Naked Pairs are when there are just two candidates being looked for, Naked Triple when there are three, and Naked Quads when there are four.

#### Algorithm
1. Pick a row
2. Search for cells which have the same possible values (the number of same values should be the same as the number of found duplicates). 
3. Remove the found duplicates from other cells in that row, except those who has the same possible Values. --> Some values will be canceled, then try to run some easier algorithms again and see if it helped.
4. Rotate it and do the same for columns - in the end, rotate it back.


## Universal Methods
* `rotateSudoku(lvl)` - rotates sudoku by 90°, 180°, or 270° clockwise(`Getter` class).
  * `lvl`: 1 - 90°, 2 - 180°, 3 - 270°

* `iterateBoxes()` - iterates over each box and yield their **box-position** (in 9x9 sudoku, it may be either 0, 1, or 2 - position of the whole box) as `[row, col]`.

* `iterateOverRowsInBox(row, col)` - iterates over each row in the box and yields real position of the row (0-9 for example).
  * `row`, `col` - **box-position**

* `cellValuesFromRowBox(specific_row, col)` - return an array of cell-values
  * `specific_row` - number of the row (0-8)
  * `col` - **box-position**

* `possibleValuesFromRowBox(specific_row, col, joined = False)` 
  * If `joined = True` - return list of possible values from a row (only 1D list). Else returns 2D list of possible values from a row in a box (`[[2, 3, 4], [5]]`).
  * `row`, `col` - **box-position**

* `dictWithPossibleValuesSquare(row, col)` - generates a dict like this:
  ```python
  dictionary = {
    0: [all possible values from row 0],
    1: [all possible values from row 1],
    2: [all possible values from row 2]
  }
  ```
  or 
  ```python
  dictionary = {
    6: [all possible values from row 6],
    7: [all possible values from row 7],
    8: [all possible values from row 8]
  }
  ```
  The numbers as keys represents the actual row.
  * `row`, `col` - **box-position**

* `checkIfNumbersInSquare(possibleValuesSquare, checkValues)` - it checks if the numbers in `checkValues` are somewhere else in the square (`possibleValuesSquare`) and if so, it removes them from `checkValues`. It returns `checkValue` dictionary with values unique for that row 

* `removeValuesFromOtherBox'sRows(checkValues, col)` - removes values from the box's other rows defined by `col` and keys in `checkValues` (the keys are the actual number of rows) 

* `possibleValuesMap()` - Returns a list of lists where each number is another list with numbers representing other possible numbers for the position.
  ```python
  [
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []], 
    [[], [], [], [], [], [], [], [], []]
  ]
  ```

* `fillPosibleValuesMap()` - Fill the possible-values-map with all the possible values for each cell.

* `getUnusedValuesRow(row)` - Returns a list of unused values from a row.

* `removePossibleValuesRow(values, row, notSquare)` - Removes a cpesific possible values from a row, but can handle exceptions (you can pass `notSquare` param which indicates the `col` (**box-position**) where the values should stay).
  * `values` - list of values you want to remove
  * `row` - specific value of the row.

* `removeValuesFromDict(dict, value)` - Checks all key-value pairs and remove the value from every pair.

* `printBoard()` - Prints `self.board`

* `getDuplicates` - Returns a list of duplicates from an 1D array.

* `printPossibleValues()` - Prints possible values for each cell.

----
  ui class