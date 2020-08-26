

from getter import Getter

class Leveler:
  def __init__(self):
    # self.possibleValues = self.fillPosibleValuesMap()
    self.board = None

  def setBoard(self, board):
    self.board = board
    self.size = len(self.board)
    self.base = round(self.size ** (1 / 2))

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

    return counter


  def getIntersection(self, arr1, arr2):
    return list(set(arr1) & set(arr2))


  def candidateLines(self):
    self.printPossibleValues()
    
    count = 0
    # For each row of the squares
    for i in range(self.base):
      
      # For each column of the squrares
      for j in range(self.base):

        # FOR EACH ROW IN THE SQUARE
        for q in range(i * self.base, i * self.base + self.base):
          # Rows are going horizontally
          row = self.possibleValues[q][j*self.base : j*self.base+self.base] 
          # Cols are going vertically
          col = [self.possibleValues[r][q] for r in range (j*self.base, j*self.base + self.base)]

          valuesRow = []
          valuesCol = []

          for k in range(self.base):
            currentRow = row[k]
            currentCol = col[k]
            for l in range(k, self.base-1):
              valuesRow += self.getIntersection(currentRow, row[l+1])
              valuesCol += self.getIntersection(currentCol, col[l+1])

          valuesRow = self.removeDuplicates(valuesRow)
          valuesCol = self.removeDuplicates(valuesCol)

          pos = q - i * self.base

          count += self.checkSquare(i, j, "row", pos, valuesRow)
          count += self.checkSquare(j, i, "col", pos, valuesCol)
    
    
    # print("__________________")
    # self.printPossibleValues()
                  

    return count


  def removeDuplicates(self, arr):
    return list(set(arr))

    

  def deletePossibleValue(self, value, line):
    for element in line:
      if value in element:
        element.pop(element.index(value))

  def checkSquare(self, x, y, line, pos, values):
    """
    param: x = position (row) of the SQUARE (in 9 x 9 grid it can be 0, 1 or 2)
    param: y = position (col) of the SQUARE (in 9 x 9 grid it can be 0, 1 or 2)
    param: line = "row" or "col"; should we check the little square's rows or cols
    param: pos = position of the line from which we have counted the possible values (in 9 x 9 grid where the little square is 3 x 3 it can be 0, 1 or 2)
    param: num = the counetd value
    """

    squarePossible = []
    
    if line == "row":
      for i in range(self.base):
        if i != pos:
          row = self.possibleValues[x * self.base + i]
          # squarePossible = [row[j+y] for j in range(self.base)]
          for j in range(self.base):
            squarePossible.append(row[j + y])

    if line == "col":
      for i in range(self.base):
        if i != pos:
          # squarePossible = [self.possibleValues[j+x*self.base][i+self.base*y] for j in range(self.base)]
          for j in range(self.base):
            squarePossible.append(self.possibleValues[j + x * self.base][i + self.base * y])

    print(squarePossible, line)
    print("_________")
            
    

    for element in squarePossible:
      for num in values:
        if num in element:
          values.pop(values.index(num))

    if line == "row":
      arr = self.getValuesRow(x * self.base + pos, y*self.base)

    elif line == "col":
      arr = self.getValuesCol(y * self.base + pos, x)

    for value in values:
      self.deletePossibleValue(value, arr)

    return 2


  def getValuesRow(self, row, notThisSquare):
    arr = []
    for i in range(self.base):
      if i != notThisSquare:
        arr += self.possibleValues[row][i*self.base:i*self.base+self.base]
    
    return arr

  def getValuesCol(self, col, notThisSquare):
    arr = []
    for i in range(self.size):
      if i // self.base != notThisSquare:
        arr.append(self.possibleValues[i][col])

    return arr

  def printPossibleValues(self):
    for row in self.possibleValues: print(row)

if __name__ == "__main__":
  app = Leveler()
  app.setBoard(
    [
    [0, 0, 6, 0, 3, 0, 7, 0, 8],
    [0, 3, 0, 0, 0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0, 0, 6, 0, 0],
    [1, 0, 0, 3, 5, 0, 0, 0, 6],
    [0, 7, 9, 0, 4, 0, 1, 5, 0],
    [5, 0, 0, 0, 1, 7, 0, 0, 4],
    [0, 0, 2, 0, 0, 0, 0, 0, 7],
    [6, 0, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 7, 0, 6, 0, 2, 0, 0]
  ]
  )
  print(app.board)
  app.singlePosition()
  print(app.board)