

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

if __name__ == "__main__":
  app = App()