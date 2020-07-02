

from solver import Solver
from leveler import Leveler

import random
import json
import copy

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
    

  # Removes some numbers from the board 
  def removeCharacters(self, percentage_chance=0.4):
    for i in range(self.size):
      for j in range(self.size):
        if random.random() < percentage_chance:
          self.board[i][j] = self.emptySpace


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


  def generateSeed(self, lvl=1, howMany=2):
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
  creator.setupJSONfile(5)
  for i in range(5):
    creator.generateSeed(i+1, 10)