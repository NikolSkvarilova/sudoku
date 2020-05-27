

import json
import random

class App:
  def __init__(self):
    self.sudokuFile = App.readJSON()

  @staticmethod
  def readJSON():
    with open('data.json') as JSONdata:
      return json.load(JSONdata)

  def generateMap(self, numOfTotems):
    # numOfTotems represents the number of possible values 
    # (in 9x9 sudoku, numOfTotems=9, because you have numbers from 1-9)
    
    posssibleNums = list(range(1, numOfTotems+1))
    totemMap = {}

    for i in range(numOfTotems):
      # Pick a random number and remove it from the list
      value = posssibleNums.pop(random.randrange(len(posssibleNums)))
      totemMap[i+1] = value

    return totemMap

  def mapNumbers(self, sudoku, totemMap):
    for i in range(len(sudoku)):
      for j in range(len(sudoku[0])):
        if sudoku[i][j] in totemMap.keys():
          sudoku[i][j] = totemMap[sudoku[i][j]]

    return sudoku

  def reverseVertically(self, sudoku):
    for row in sudoku:
      row.reverse()

    return sudoku

  def reverseHorizontally(self, sudoku):
    for i in range(len(sudoku)):
      col = []
      for j in range(len(sudoku)):
        col.append(sudoku[j][i])

      col.reverse()

      for q in range(len(sudoku)):
        sudoku[q][i] = col[q]

    return sudoku 

  def rotateSudoku(self, sudoku, lvl):
    # lvl represents level of rotating the sudoku:
    # lvl 1 = 90°
    # lvl 2 = 180°
    # lvl 3 = 270°

    for _ in range(lvl):
      # Zip return tuples - we want lists
      sudoku = [list(x) for x in zip(*sudoku)]

    return sudoku

  def generateFromSeed(self):
    sudoku = random.choice(self.sudokuFile["level1"])
    totemMap = self.generateMap(len(sudoku))
    sudoku = self.mapNumbers(sudoku, totemMap)

    if random.random() < 0.5:
      sudoku = self.reverseHorizontally(sudoku)
    
    if random.random() < 0.5:
      sudoku = self.reverseVertically(sudoku)

    if random.random() < 0.5:
      sudoku = self.rotateSudoku(sudoku, random.randrange(0, 4))   

    return sudoku 


if __name__ == "__main__":
  app = App()
  app.generateFromSeed()