

import json
import random

class Getter:
  def __init__(self):
    # Dictionary containing all the seeds
    self.sudokuFile = Getter.readJSON()

  @staticmethod
  def readJSON():
    with open('data.json') as JSONdata:
      return json.load(JSONdata)

  def generateMap(self, numOfTotems):
    # Creates a dictionary for swapping numbers in the sudoku
    
    # Example: {1: 5, 2: 3, 3: 8} so all the ones in the sudoku become fives,
    # all the twos become threes, all the threes becomes eights
    
    # param: numOfTotems = the number of possible values 
    # (in 9x9 sudoku, numOfTotems=9, because you have numbers from 1-9)
    
    posssibleNums = list(range(1, numOfTotems+1))
    totemMap = {}

    for i in range(numOfTotems):
      # Pick a random number and remove it from the list
      value = posssibleNums.pop(random.randrange(len(posssibleNums)))
      totemMap[i+1] = value

    return totemMap

  def mapSeed(self, sudoku, totemMap):
    # Maps given sudoku: goes one number per round, looks it in the dictionary and changes it to 
    # it's new value (original value is key, new value is value if key-value pairs dict)
    
    # param: sudoku = the sudoku you want to map
    # param: totemMap = the dictionary telling what numbers should be changed to what

    for i in range(len(sudoku)):
      for j in range(len(sudoku[0])):
        if sudoku[i][j] in totemMap.keys():
          sudoku[i][j] = totemMap[sudoku[i][j]]

    return sudoku

  def flipVertically(self, sudoku):
    # Takes a sudoku and flips it vertically 
    # The numbers on the left goes to the right and vice versa

    # param: sudoku = the sudoku you want to flip

    for row in sudoku:
      row.reverse()

    return sudoku

  def flipHorizontally(self, sudoku):
    # Takes a sudoku and flips it horizontally 
    # The numbers on the top goes to the bottom and vice versa

    # param: sudoku = the sudoku you want to flip
    for i in range(len(sudoku)):
      # You need to get the numbers from the column
      col = []
      for j in range(len(sudoku)):
        col.append(sudoku[j][i])

      # Flip the values in the col
      col.reverse()

      # And put them back
      for q in range(len(sudoku)):
        sudoku[q][i] = col[q]

    return sudoku 

  def rotateSudoku(self, sudoku, lvl):
    # Rotates sudoku clockwise

    # param: sudoku = the sudoku you want to rotate
    # param: lvl = level of rotating the sudoku (how many times)
  
    # lvl 1 = 90°
    # lvl 2 = 180°
    # lvl 3 = 270°
    # lvl 4 = 0° (stays as it is)

    for _ in range(lvl):
      # Zip return tuples - we want lists
      sudoku = [list(x) for x in zip(*sudoku)]

    return sudoku

  def shuffleRows(self, sudoku):
    # Shuffles whole rows but only in the smallew squares. That means that the first row can only stay at the position where it is (row 1), or it can move to row 2 or row 3, anywhere behind row 3.
    # There is a chance for shuffling

    # For each threesome of rows:
    # (I use square root of the total number of rows to get the little section to make it more universal)
    for i in range(round(len(sudoku) ** (1 / 2))):
      setOfRows = sudoku[i * 3:i * 3 + 3]
      random.shuffle(setOfRows)
      sudoku[i * 3:i * 3 + 3] = setOfRows

    return sudoku

  def shuffleCols(self, sudoku):
    # Same as shuffleRows(), but only with columns
    # I rotate the sudoku to get the cols as rows, in the end, I rotate it back
    rotatedSudoku = self.rotateSudoku(sudoku, 1)
    # Then I shuffle the "rows"
    shuffledSudoku = self.shuffleRows(rotatedSudoku)
    # And rotate it back
    finalSudoku = self.rotateSudoku(shuffledSudoku, 3)

    return finalSudoku

  def getSeed(self, category):
    # Returns a random choosen sudoku from a specific category

    # param: category = name of the category from the JSON file from which you want to select random sudoku

    return random.choice(self.sudokuFile[category])

  def generateFromSeed(self, category):
    # Generates a sudoku from a seed

    # param: category = from which category you want to get a sudoku
    
    # Get seed from the file
    sudoku = self.getSeed(category)
    # Generate a dict for mapping sudoku (1 -> 4, 2 -> 9, 3 -> 7 etc.)
    totemMap = self.generateMap(len(sudoku))
    # Map the sudoku
    sudoku = self.mapSeed(sudoku, totemMap)

    # Do some other stuffs with the sudoku (50% chance for every transformation)
    if random.random() < 0.5:
      sudoku = self.flipHorizontally(sudoku)
    
    if random.random() < 0.5:
      sudoku = self.flipVertically(sudoku)

    if random.random() < 0.5:
      # Here we also generate a random lvl of rotation
      sudoku = self.rotateSudoku(sudoku, random.randrange(0, 4))  

    if random.random() < 0.5:
      sudoku = self.shuffleRows(sudoku) 

    if random.random() < 0.5:
      sudoku = self.shuffleCols(sudoku) 

    return sudoku 

  def generateDailySudoku(self):
    # Generates specific sudoku considered as "daily"
    self.dailySudoku = self.generateFromSeed("level1")

  def getDailySudoku(self):
    # Returns daily sudoku
    return self.dailySudoku

  def getNumOfSudokus(self):
    # Get num of seed sudokus
    numOfSeedSudokus = 0

    for lvl in self.sudokuFile:
      numOfSeedSudokus += len(self.sudokuFile[lvl])

    # Get final num
    # * 9! = 362880 for changing the original numbers to new values
    # * 4 for rotating the puzzle by 0°, 90°, 180°, 270°
    # * 4 for mirroring the original sudoku horizontally and vertically 
    # * 144 for shuffling the rows and cols 
    finalNum = numOfSeedSudokus * 362880 * 4 * 4 * 144

    return finalNum

if __name__ == "__main__":
  app = Getter()