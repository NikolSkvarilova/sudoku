# Sudoku
[![LoC](https://tokei.rs/b1/github/NikolSkvarilova/sudoku?category=code)](https://github.com/NikolSkvarilova/sudoku)
![GitHub last commit](https://img.shields.io/github/last-commit/NikolSkvarilova/sudoku?color=%23ff006e&logo=git&logoColor=%20%20%23ffffff)
![GitHub repo size](https://img.shields.io/github/repo-size/NikolSkvarilova/sudoku?color=%23741FFF&label=repo%20size&logo=Github)

## Project is online!
[Web Link](http://sudoku.infero.site/)

## API

### Get playable sudoku
`GET /api/play/get_sudoku/<int:lvl>`

Returns a sudoku based on `lvl` (1-5) as a json, where 0 represents an empty field.
```json
{
  "sudoku": [
    [5, 2, 9, 6, 0, 0, 0 ,0, 0],
    ...
  ]
}
```

### Get number of sudokus
`GET /api/numOfSudokus`

Returns the number of sudokus available from this API.

```json
{
  "numOfSudokus": 586845
}
```

### Check sudoku
`POST /api/play/check_sudoku`

Checks sent sudoku if it is correct. 

**Request**: It is required to send the following information:
  * `name : str` is your name you would like to be added as to the database if it is a daily sudoku.
  * `solvedSudoku : arr<arr<int>>` is a 2D array representing the solved sudoku.
  * `originalSudoku : arr<arr<int>>` is a 2D array representing the original sudoku with empty fields.
  * `minutes : int`, `seconds : int` is number of minutes + seconds (max value of `seconds` is 59) it took you to solve the sudoku (this is only neccesary if the original sudoku is daily sudoku).

```json
{
  "name": <your-name>,
  "solvedSudoku": <solved-sudoku>,
  "originalSudoku": <original-sudoku>,
  "time": {
    "minutes": <>,
    "seconds": <>
  }
}
```

**Response**
```json
{
  "solved_correctly": <bool>
}
```

### Get daily sudoku
`GET /api/play/getDailySudoku`

Returns a sudoku generated for this day. The format is same as for sending a regular sudoku based on level.

### Get daily sudoku solvers
`GET /api/play/getDailySudokuSolvers`

Returns a list of solvers (name + time) for the current daily sudoku. The solvers are sorted by the time it took to solve them.

```json
{
  "solvers": [
    {"name": <str:name>, "time": <str:HH:MM:SS>},
    {"name": <str:name>, "time": <str:HH:MM:SS>},
    ...
  ]
}
```