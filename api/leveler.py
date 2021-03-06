

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
 