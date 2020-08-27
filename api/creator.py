

from solver import Solver
from leveler import Leveler

import random
import json
import copy

from random import randrange

class Creator(Solver):
  def __init__(self, size=9):
    self.size = size
    self.base = int(self.size ** (1 / 2))
    self.emptySpace = 0
    self.leveler = Leveler()
    

  def generateBlankArr(self):
    self.board = [[self.emptySpace for i in range(self.size)] for j in range(self.size)]


  # Shifts elements of an array (parram: arr) by specific value (param: n)
  def shift(self, arr, n):
    temp = arr.copy()
    for i in range(len(arr)):
      arr[i] = temp[i - n]

    return arr


  # Checks if all numbers in the sudoku are valid
  def checkIfValid(self):
    for i in range(self.size):
      for j in range(self.size):
        if not self.checkValid(self.board[i][j], (i, j)):
          return False
                
    return True


  # Generates 2D array with numbers
  # Randomly fills the 1. row and solver fills the rest.
  def generate(self):
    self.generateBlankArr()

    nums = list(range(1, self.size + 1))
    random.shuffle(nums)
    
    for i in range(self.size):
      self.board[0][i] = nums[i]

    self.solve()
    self.originalBoard = copy.deepcopy(self.board)
    
 
  def removeCharacters(self):
    # Removes some numbers from the board
    for i in range(randrange(15, 20)):
      self.removeCounterPart()

    # 50% chance to remove the very center cell's value (set it to 0)
    if random.random() < 0.5:
      self.removeCenter()

    # Create a deep copy of the unsolved board
    unSolvedSeed = copy.deepcopy(self.board)

    # Check if it is solvable
    solvable = Solver.solve(self)

    # If it is not solvable, start again
    if not solvable:
      self.resetBoard()
      self.removeCharacters()
    

  def resetBoard(self):
    # Fills back the missing values
    self.board = copy.deepcopy(self.originalBoard)

  def removeCounterPart(self):
    # Removes pair of values based on their counterpart position.
    # We pick position of the first one
    # Then count the position of the next one: row = size of the sudoku - 1 (because we count from 0) - row; col size of the sudoku - 1 (because we count from 0) - col
    # So for position [0; 2] counterpart position is [8; 6]
    col = randrange(0, len(self.board))
    row = randrange(0, len(self.board))
    
    # Check if the row or col value is not the middle
    while (row == len(self.board) // 2) or (col == len(self.board) // 2):
      col = randrange(0, len(self.board))
      row = randrange(0, len(self.board))

    # If it has been already removev (set to 0)
    if self.board[row][col] == 0:
      self.removeCounterPart()

    # Else remove the values and set it to 0
    else:
      self.board[row][col] = 0
      self.board[len(self.board) - 1 - row][len(self.board) - 1 - col] = 0


  def removeCenter(self):
    # Removed the very center cell's value and set it to 0
    self.board[len(self.board) // 2][len(self.board) // 2] = 0

  @staticmethod
  def setupJSONfile(numberOfLevels=1):
    data = {}
    for i in range(1, numberOfLevels + 1):
      data["level" + str(i)] = []

    Creator.writeToJSONFile(data=data)


  @staticmethod
  def writeToJSONFile(path="./", fileName="data", data={}):
    filePathNameWExt = './' + path + fileName + '.json'
    with open(filePathNameWExt, 'w') as f:
      json.dump(data, f)


  @staticmethod
  def readJSONFile(path="./", fileName="data"):
    filePathNameWExt = './' + path + fileName + '.json'
    with open(filePathNameWExt, 'r') as f:
      return json.load(f)


  def generateSeed(self, lvl=1, howMany=1):
    data = Creator.readJSONFile()

    for _ in range(howMany):
      level = None
            
      while level != lvl:
        self.generate()
        self.removeCharacters(percentage_chance=(lvl * 12) / 100)
        self.leveler.setBoard(self.board)
        level = self.leveler.getLevel()

      else:
        data["level" + str(lvl)].append(copy.deepcopy(self.board))
                
      Creator.writeToJSONFile(data=data)
      print("Done!")
 
    
if __name__ == "__main__":
  creator = Creator()
  creator.generate()
  creator.removeCharacters()
