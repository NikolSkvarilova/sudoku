

from getter import Getter

import collections

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

# Creates a list of lists where each number is another list with numbers representing other possible numbers for the position
  def possibleValuesMap(self):
    return [[[] for i in range(self.size)] for j in range(self.size)]


# Fill the possible-values-map with all the possible values for each cell
  def fillPosibleValuesMap(self):
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


  def candidateLines(self):
    # This is the first technique which doesn’t actually tell you where to place a number, but instead helps you to determine places where you can’t place a number! If you’re using pencilmarks, then this will help you to remove candidates, and from there you should be able to make placements.
    # If you look within a box, and find that all of the places where you can put a particular number lie along a single line, then you can be sure that wherever you put the number in that box, it has to be on the line.

    # Number of times using this method was useful
    counter = 0

    # This method should be applied on rows and colls. To keep the code more simple, I wrote the code for checking rows. When checking cols, I rotate the sudoku by 90° to make from colls rows and perform the same operation. In the end, I rotate the sudoku by 270° to get it back as it should be.

    for rotation in range(2):
      # When rotation is 0, it stay as it is
      # When rotation is 1, it rotates by 90°
      self.board = Getter.rotateSudoku(self, self.board, rotation)
      self.possibleValues = Getter.rotateSudoku(self, self.possibleValues, rotation)

      # For each box in the sudoku
      for row in range(self.base):
        for col in range(self.base):

          # Dictionary with duplicate values from rows - which we should check if they are in other rows, if so, we delete the key-value pair, if not, we keep it
          # After scanning, we add data from the current row
          checkValues = {}

          # Go through each row of the box
          for eachRow in range(self.base):
            # It goes like this: 0-1-2, 0-1-2, 0-1-2, 3-4-5, 3-4-5, 3-4-5, ... from left to right, row by row
            row_num = row * 3 + eachRow

            # List of cell values from the row of the box
            valuesOfRow = self.board[row_num][col * 3 : col * 3 + self.base]

            # Check if there are at least 2 empty cells in the row
            if valuesOfRow.count(0) >= 2:
              # There are at least 2 empty cells

              # List of lists of possible values for that row
              possibleValuesRow = []

              # Go through each col of the box
              for eachCol in range(self.base):
                # It goes like this 0-1-2, 0-1-2, 0-1-2, 3-4-5, 3-4-5, 3-4-5, 6-7-8, 6-7-8, 6-7-8 and again 0-1-2 ... 
                col_num = col * 3 + eachCol

                # If the cell is empty
                if self.board[row_num][col_num] == 0:
                  # Save its possible values into possibleValuesRow
                  possibleValuesRow += self.possibleValues[row_num][col_num]

              # Are there any same values in the row?
              # Values which have occured in the row multiple times
              sameValues = self.getDuplicates(possibleValuesRow)

              # If there are any
              if len(sameValues) > 0:
                # Save the sameValues into the dict 
                checkValues[row_num] = sameValues


          # Dict containing all the possible values for the square
          possibleValuesSquare = {}
          
          for p in range(self.base):
            possibleValuesSquare[row * 3 + p] = self.possibleValues[row * 3 + p][col * 3 : col * 3 + 3]

          # Check if the numbers are somewhere else in the square
          # For each row in the dict with all possible values
          for key in possibleValuesSquare:
            # For each row in the dict with duplicate possible values
            for key_2 in checkValues:
              # If it is not the same row
              if key != key_2:
                # Iterate over every value from the check dict
                for value in checkValues[key_2]:
                  # Is the value in the other dict?
                  for q in range(self.base):
                    if value in possibleValuesSquare[key][q]:
                      # The value is in other rows --> we have to delete the value 
                      checkValues = self.removeValueFromDict(checkValues, value)

          # Remove values from other boxes's row
          for key in checkValues:
            self.removePossibleValuesRow(checkValues[key], key, col)

    # Rotate the sudoku back
    self.board = Getter.rotateSudoku(self, self.board, 3) 
    self.possibleValues = Getter.rotateSudoku(self, self.possibleValues, 3)

    # Run Single Candidate method and Single Position method to see if it was useful
    counter += self.singleCandidate() + self.singlePosition()
    return counter  

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

if __name__ == "__main__":
  app = Leveler()
  app.setBoard([
    [0, 0, 1, 9, 5, 7, 0, 6, 3],
    [0, 0, 0, 8, 0, 6, 0, 7, 0],
    [7, 6, 9, 1, 3, 0, 8, 0, 5],
    [0, 0, 7, 2, 6, 1, 3, 5, 0],
    [3, 1, 2, 4, 9, 5, 7, 8, 6],
    [0, 5, 6, 3, 7, 8, 0, 0, 0],
    [1, 0, 8, 6, 0, 9, 5, 0, 7],
    [0, 9, 0, 7, 1, 0, 6, 0, 8],
    [6, 7, 4, 5, 8, 3, 0, 0, 0]
  ])
  app.printPossibleValues()
  app.candidateLines()
  print("_________________")
  app.printPossibleValues()
  app.printBoard()
