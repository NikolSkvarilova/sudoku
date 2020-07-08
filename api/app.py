
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime
import copy

from getter import Getter
from solver import Solver

app = Flask("__name__")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_sudoku.db'
db = SQLAlchemy(app)

getter = Getter()
# getter.generateDailySudoku()
getter.dailySudoku = [
  [9, 1, 0, 3, 7, 8, 0, 0, 5], 
  [6, 3, 8, 9, 5, 2, 1, 0, 4], 
  [5, 2, 7, 6, 1, 4, 9, 3, 8], 
  [3, 9, 6, 5, 2, 1, 8, 4, 7], 
  [8, 0, 5, 4, 9, 6, 3, 1, 2], 
  [1, 4, 2, 8, 3, 7, 5, 9, 6], 
  [4, 5, 0, 7, 8, 3, 6, 2, 1], 
  [7, 8, 1, 2, 6, 9, 4, 5, 3], 
  [2, 0, 3, 0, 0, 5, 7, 8, 9]
]

# Database models
class DailySudoku(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  board = db.Column(db.Text)
  date = db.Column(db.DateTime, default=datetime.utcnow)

class DailySudokuSolver(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Text)
  sudokuID = db.Column(db.Integer)
  time = db.Column(db.DateTime)


@app.route('/play/get_sudoku/<int:lvl>')
def get_sudoku(lvl):
  return {"sudoku": getter.generateFromSeed("level" + str(lvl))}


@app.route('/play/check_sudoku', methods=['GET', 'POST'])
def check_sudoku():
  if request.method == 'POST':
    # Extract data from request
    sudoku = request.json[0]
    originalSudoku = request.json[1]
    time = request.json[2]
    name = request.json[3]

    date_time_obj = datetime.strptime(time, '%M:%S').date()

    # Check if the sudoku is daily sudoku
    dailySudoku = False

    if originalSudoku == getter.getDailySudoku():
      dailySudoku = True

    # Solving the original sudoku
    solver = Solver(copy.deepcopy(originalSudoku))
    solver.solve()

    # Comparing sudokus
    if solver.board == sudoku:

      # # If the sudoku is daily sudoku
      if dailySudoku:
        solver = DailySudokuSolver(sudokuID=getSudokuID(originalSudoku), name=name, time=date_time_obj)
        db.session.add(solver)
        db.session.commit()

      return{"solved_correctly": True}

    else:
      return {"solved_correctly": False}


@app.route('/play/getDailySudoku')
def get_daily_sudoku():
  # addDailySudokuToDatabase(getter.getDailySudoku())
  return {"sudoku": getter.getDailySudoku()}


def getSudokuID(board):
  return DailySudoku.query.filter_by(board=str(board)).first().id

def addDailySudokuToDatabase(board):
  sudoku = DailySudoku(board=str(board), date=datetime.now().date())
  db.session.add(sudoku)
  db.session.commit()

if __name__ == "__main__": 
  app.run(debug=True, port=5000)