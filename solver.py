

class Solver:
  def __init__(self, board):
    self.board = board
    # Number of rows
    self.size = len(board)
    # Size of the little square
    self.base = int(self.size ** (1 / 2))
    self.emptySpace = 0


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


  def findEmpty(self):
    for i in range(self.size):
      for j in range(self.size):
        # Is there a blank spot in the grid?
        if self.board[i][j] == self.emptySpace:
          # Return Position
          return (i, j)

    return None


  def checkValid(self, num, pos, notNums=[]):
    for i in range(self.size):
      if i in notNums:
        continue
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


  def solve(self):
    find = self.findEmpty()
    if not find:
      return True

    row, col = find

    for num in range(1, self.size + 1):
      if self.checkValid(num, (row, col)):
        self.board[row][col] = num

        if self.solve():
          return True

        self.board[row][col] = self.emptySpace

    return False


if __name__ == "__main__":
  grid = [
    [0, 0, 4, 0, 0, 6, 0, 2, 0],
    [0, 0, 7, 8, 0, 0, 9, 1, 0],
    [0, 0, 0, 0, 0, 0, 3, 0, 8],
    [0, 1, 8, 3, 0, 0, 2, 0, 0],
    [3, 0, 0, 7, 8, 9, 0, 0, 1],
    [0, 0, 9, 0, 0, 1, 0, 6, 0],
    [8, 0, 3, 0, 0, 0, 5, 0, 0],
    [0, 4, 5, 0, 0, 3, 6, 0, 0],
    [0, 2, 6, 5, 0, 0, 1, 0, 0]
  ]

  grid2 = [
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

  grid3 = [
    [0, 0, 1, 9, 5, 7, 0, 6, 3],
    [0, 0, 0, 8, 0, 6, 0, 7, 0],
    [7, 6, 9, 1, 3, 0, 8, 0, 5],
    [0, 0, 7, 2, 6, 1, 3, 5, 0],
    [3, 1, 2, 4, 9, 5, 7, 8, 6],
    [0, 5, 6, 3, 7, 8, 0, 0, 0],
    [1, 0, 8, 6, 0, 9, 5, 0, 7],
    [0, 9, 0, 7, 1, 0, 6, 0, 8],
    [6, 7, 4, 5, 8, 3, 0, 0, 0]
  ]

  solver = Solver(grid3)
  solver.printBoard()
  solver.getLevel(solver.countMissing())
  solver.solve()
  print("________________________")
  solver.printBoard()