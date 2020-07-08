
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

from getter import Getter
from solver import Solver

app = Flask("__name__")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_sudoku.db'
db = SQLAlchemy(app)

getter = Getter()
getter.generateDailySudoku()

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
  return {"sudoku": getter.getDailySudoku()}


if __name__ == "__main__": 
  app.run(debug=True, port=5000)