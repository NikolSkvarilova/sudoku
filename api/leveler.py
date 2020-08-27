

from getter import Getter
import copy
import collections
from ast import literal_eval

class Leveler:
  def __init__(self):
    self.board = None

  def setBoard(self, board):
    self.board = board
    self.size = len(self.board)
    self.base = round(self.size ** (1 / 2))
    self.possibleValues = self.fillPosibleValuesMap()

  def countMissing(self):
    count = 0
    for row in self.board:
      for value in row:
        if value == 0:
          count += 1

    return count


  def checkValid(self,  num, pos):
    for i in range(self.size):

      # Check row
      if (self.board[pos[0]][i] == num and pos[1] != i):
        return False

      # Check column
      if self.board[i][pos[1]] == num and pos[0] != i:
        return False
    
    # Check box
    box_x = pos[1] // self.base # col
    box_y = pos[0] // self.base # row

    for i in range(box_y * self.base, box_y * self.base + self.base):
      for j in range(box_x * self.base, box_x * self.base + self.base):
        if self.board[i][j] == num and (i, j) != pos:
          return False

    return True


  def getLevel(self):
    numMissing = self.countMissing()

    levelLimits = [25, 35, 45, 55, 65]
    lvl = len(levelLimits)

    for i in range(1, len(levelLimits) + 1):
      if numMissing < levelLimits[i-1]:
        lvl = i
        return lvl

    else:
      return 6
    
  # ----------------------------------------------------------------
  # [IMPORTANT] The code below is not ready to use!
  # ----------------------------------------------------------------

  def possibleValuesMap(self):
    # Creates a list of lists where each number is another list with numbers representing other possible numbers for the position

    return [[[] for i in range(self.size)] for j in range(self.size)]



  def fillPosibleValuesMap(self):
    # Fill the possible-values-map with all the possible values for each cell
    # Create the "sceleton"
    possibleValues = self.possibleValuesMap()

    # Fill the sceleton
    for i in range(self.size):
      for j in range(self.size):
        # Is the cell empty?
        if self.board[i][j] == 0:
          # Find all the possible values
          for k in range(1, self.size + 1):
            if self.checkValid(k, (i, j)):
              # Append the possible value into the cell's list
              possibleValues[i][j].append(k)

    return possibleValues

  def getUnusedValuesRow(self, row):
    # Get unused values from a row
    unused = []

    for i in range(1, self.size + 1):
      if i not in self.board[row]:
        unused.append(i)

    return unused


  def removePossibleValuesRow(self, values, row, notSquare):
    # Remove specific values from possibleValues row.
    # param values: list of values you want to remove
    # param row: number of the row
    # param: notSquare: number of the square in the sense of col (for 9x9 in it 0 (the first square), 1 (the second square), 2 (the third square))

    for col in range(self.size):
      if col not in range(notSquare * self.base, notSquare * self.base + 3):
        for value in values:
          if value in self.possibleValues[row][col]:
            self.possibleValues[row][col].pop(self.possibleValues[row][col].index(value))
              
  def removeValueFromDict(self, dict, value):
    # Check all key-value pairs and remove the value from every pair 
    for key in dict:
      if value in dict[key]:
        dict[key].pop(dict[key].index(value))

    return dict

  def printBoard(self):
    for i in range(self.size):
      if i % self.base == 0 and i != 0:
        print("– – – – – – – – – – – –")

      for j in range(self.size):
        if j % self.base == 0 and j != 0:
          print(" | ", end="")

        # When it is at the end, go on new line
        if j == self.size - 1:
          print(self.board[i][j]) 
        # ... Or continue on the same row
        else:
          print(str(self.board[i][j]) + " ", end="")
          

  def getDuplicates(self, arr):
    # Returns list of duplicates from an arr
    # param arr: list of elements
    return [item for item, count in collections.Counter(arr).items() if count > 1]


  def printPossibleValues(self):
    for row in self.possibleValues: print(row)

# ====== methods ======

  def singleCandidate(self):
    # Single Candidate is a technique which looks at every empty cell, finds all possible values and if there is a cell with only one possible solution (value), it fills it and add +1 to counter.
    counter = 0

    for i in range(self.size):
      for j in range(self.size):

        if self.board[i][j] == 0 and len(self.possibleValues[i][j]) == 1:
          counter += 1
          self.board[i][j] = self.possibleValues[i][j][0]
          self.possibleValues[i][j] = []
          
    return counter


  def singlePosition(self):
    # Choose a row, column or box, and then go through each of the numbers that hasn’t already been placed. Because of other placements, the positions where you could place that number will be limited.
    counter = 0

    # For each cell in a row
    for i in range(self.size):
      # Get the unused numbers for the row
      unused = self.getUnusedValuesRow(i)
      
      # For each unused row
      for num in unused:
        # n = total of times the num could be used in a cell
        n = 0
        # valid = position of the valid cell
        valid = []

        for q in range(self.size):
          if self.checkValid(num, (i, q)):
            # Coordinates of the valid position
            valid = q
            n += 1

        if n == 1:
          counter += 1
          self.board[i][valid] = num
          self.possibleValues[i][valid] = []

    return counter


  def rotateSudoku(self, lvl):
    # Method which rotates board and the possible values arr
    self.board = Getter.rotateSudoku(self, self.board, lvl)
    self.possibleValues = Getter.rotateSudoku(self, self.possibleValues, lvl)


  def candidateLines(self):
    # This is the first technique which doesn’t actually tell you where to place a number, but instead helps you to determine places where you can’t place a number! If you’re using pencilmarks, then this will help you to remove candidates, and from there you should be able to make placements.
    # If you look within a box, and find that all of the places where you can put a particular number lie along a single line, then you can be sure that wherever you put the number in that box, it has to be on the line.

    # Number of times using this method was useful
    counter = 0

    # This method should be applied on rows and colls. To keep the code more simple, I wrote the code for checking rows. When checking cols, I rotate the sudoku by 90° to make from colls rows and perform the same operation. In the end, I rotate the sudoku by 270° to get it back as it should be.

    for rotation in range(2):
      # When rotation is 0, it stay as it is
      # When rotation is 1, it rotates by 90°
      self.rotateSudoku(rotation)

      # For each box in the sudoku
      for [row, col] in self.iterateBoxes(): # <-------------------

        # Dictionary with duplicate values from rows - which we should check if they are in other rows, if so, we delete the key-value pair, if not, we keep it
        # After scanning, we add data from the current row
        checkValues = {}

        # Go through each row of the box
        for row_num in self.iterateOverRowsInBox(row, col):
          # It goes like this: 0-1-2, 0-1-2, 0-1-2, 3-4-5, 3-4-5, 3-4-5, ... from left to right, row by row

          # List of cell values from the row of the box
          valuesOfRow = self.cellValuesFromRowBox(row_num, col)

          # Check if there are at least 2 empty cells in the row
          if valuesOfRow.count(0) >= 2:
            # There are at least 2 empty cells

            # List of lists of possible values for that row
            # possibleValuesRow = self.possibleValuesFromRowBox(row_num, col)
            possibleValuesRow = self.possibleValuesFromRowBox(row_num, col, joined = True)

            # Are there any same values in the row?
            # Values which have occured in the row multiple times
            duplicateValues = self.getDuplicates(possibleValuesRow)

            # If there are any
            if len(duplicateValues) > 0:
              # Save the duplicateValues into the dict 
              checkValues[row_num] = duplicateValues

        # Dict containing all the possible values for the square
        possibleValuesSquare = self.dictWithPossibleValuesSquare(row, col)

        # Check if the numbers are somewhere else in the square
        checkValues = self.checkIfNumbersInSquare(possibleValuesSquare, checkValues)

        # Remove values from other boxes's row
        self.removeValuesFromOtherBoxsRows(checkValues, col)

    # Rotate the sudoku back
    self.rotateSudoku(3)

    # Run Single Candidate method and Single Position method to see if it was useful
    counter += self.singleCandidate() + self.singlePosition()
    return counter  


  # <----------------------
  def removeValuesFromRow(self, arr, values, keepPos):
    # Remove values from arr, but not from keepPos
    # arr = 2D arr
    # values = arr of values
    # keepPos = arr of positions (col num)

    for i in range(len(arr)):
      # For every keep position
      for pos in keepPos:
        # If the position is not the keepPos
        if i != pos:
          # For every value which should be deleted
          for value in values:
            # If the value is in the inner array
            if value in arr[i]:
              # Remove it
              arr[i].pop(arr[i].index(value))

    return arr
      
  # <----------------------

  def nakedPair(self):
    counter = 0

    for rotation in range(2):
      # When rotation is 0, it stay as it is
      # When rotation is 1, it rotates by 90°
      self.rotateSudoku(rotation)

      # Pick a row (iterate over each row)
      for row_num in range(self.size):
        possibleValues = self.getPossibleValuesRow(row_num)
        duplicates = self.getDuplicates2DArr(copy.deepcopy(possibleValues))

        # Check if the size of a single duplicate elements is the same as its occurrence
        for duplicate in duplicates:
          if duplicates[duplicate]["times"] == len(literal_eval(duplicate)):
            print("Haha! Naked pairs!")
            self.removeValuesFromRow(possibleValues, literal_eval(duplicate), duplicates[duplicate]["positions"])

    # Rotate the sudoku back
    self.rotateSudoku(3)

    counter += self.candidateLines()

    return counter


  # ==== universal methods ====

  def getPossibleValuesRow(self, row):
    return self.possibleValues[row][0:]

  def iterateBoxes(self):
    # iterates over each box and yield their **box-position** (in 9x9 sudoku, it may be either 0, 1, or 2 - position of the whole box) as `[row, col]`.

    for row in range(self.base):
      for col in range(self.base):
        yield [row, col]

  def iterateOverRowsInBox(self, row, col):
    # iterates over each row in the box and yields real position of the row (0-9 for example).
    # `row`, `col` - **box-position** (0-2)

    for eachRow in range(self.base):
      # Yields the real position of the row (0-8)
      yield row * self.base + eachRow


  def cellValuesFromRowBox(self, specific_row, col):
    # return an array of cell-values
    # `specific_row` - number of the row (0-8)
    # `col` - **box-position**

    return self.board[specific_row][col * self.base : col * self.base + self.base]

  def possibleValuesFromRowBox(self, specific_row, col, joined = False):
    # If `joined = True` - return list of possible values from a row (only 1D list). Else returns 2D list of possible values from a row in a box (`[[2, 3, 4], [5]]`).
    # `row`, `col` - **box-position**

    if not joined:
      return self.possibleValues[specific_row][col * self.base : col * self.base + self.base]

    possibleValues = []

    for eachCol in range(self.base):
      col_num = col * 3 + eachCol

      if self.board[specific_row][col_num] == 0:
        possibleValues += self.possibleValues[specific_row][col_num]

    return possibleValues


  def dictWithPossibleValuesSquare(self, row, col):
    # Generates a dict containing all the possible values for the square
    values = {}

    for i in range(self.base):
      values[row * self.base + i] = self.possibleValues[row * self.base + i][col * self.base : col * self.base + self.base]

    return values

  def checkIfNumbersInSquare(self, possibleValuesSquare, checkValues):
    # it checks if the numbers in `checkValues` are somewhere else in the square (`possibleValuesSquare`) and if so, it removes them from `checkValues`. It returns `checkValue` dictionary with values unique for that row

    for key in possibleValuesSquare:
      # For each row in the dict with duplicate possible values
      for key_2 in checkValues:
        # If it is not the same row
        if key != key_2:
          # Iterate over every value from the check dict
          for value in checkValues[key_2]:
            # Is the value in the other dict?
            for i in range(self.base):
              if value in possibleValuesSquare[key][i]:
                # The value is in other rows --> we have to delete the value from checkValues
                checkValues = self.removeValueFromDict(checkValues, value)

    return checkValues


  def getDuplicates2DArr(self, arr):
    duplicates = {}

    for i in range(len(arr)):
      currentOne = arr[i]
      howMany = arr.count(currentOne) 
      if currentOne != []:
        
        if howMany > 1:
          duplicates[repr(currentOne)] = {
            "times": howMany,
            "positions": []
          }

      for j in range(len(arr)):
        if arr[j] == currentOne:
          if currentOne != [] and howMany > 1:
            duplicates[repr(currentOne)]["positions"].append(j)
          arr[j] = []
      
    return duplicates


  def removeValuesFromOtherBoxsRows(self, checkValues, col):
    # removes values from the box's other rows defined by `col` and keys in `checkValues` (the keys are the actual number of rows) 

    for key in checkValues:
      self.removePossibleValuesRow(checkValues[key], key, col)


if __name__ == "__main__":
  app = Leveler()
  app.setBoard([
    [4, 0, 0, 2, 7, 0, 6, 0, 0],
    [7, 9, 8, 1, 5, 6, 2, 3, 4],
    [0, 2, 0, 8, 4, 0, 0, 0, 7],
    [2, 3, 7, 4, 6, 8, 9, 5, 1],
    [8, 4, 9, 5, 3, 1, 7, 2, 6],
    [5, 6, 1, 7, 9, 2, 8, 4, 3],
    [0, 8, 2, 0, 1, 5, 4, 7, 9],
    [0, 7, 0, 0, 2, 4, 3, 0, 0],
    [0, 0, 4, 0, 8, 7, 0, 0, 2]
  ])
  
  # app.candidateLines()
  # app.printBoard()
  app.nakedPair()