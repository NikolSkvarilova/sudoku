
from flask import Flask, request

from getter import Getter
from solver import Solver

app = Flask("__name__")

getter = Getter()


@app.route('/play/get_sudoku/<int:lvl>')
def get_sudoku(lvl):
  return {"sudoku": getter.generateFromSeed("level" + str(lvl))}


@app.route('/play/check_sudoku', methods=['GET', 'POST'])
def check_sudoku():
  if request.method == 'POST':
    sudoku = request.json[0]
    originalSudoku = request.json[1]

    solver = Solver(originalSudoku)
    solver.solve()

    if solver.board == sudoku:
      return{"solved_correctly": True}

    else:
      return {"solved_correctly": False}


@app.route('/play/getDailySudoku')
def get_daily_sudoku():
  return {"daily_sudoku": getter.getDailySudoku()}


if __name__ == "__main__": 
  app.run(debug=True, port=5000)