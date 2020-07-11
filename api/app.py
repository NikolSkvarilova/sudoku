
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

from datetime import datetime
from datetime import timedelta
import copy

from ast import literal_eval

import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

from getter import Getter
from solver import Solver

app = Flask("__name__")
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db_sudoku.db'
db = SQLAlchemy(app)

getter = Getter()

# Database models
class DailySudoku(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  board = db.Column(db.Text)
  # Text because I need to store only date, not time and it was storing time as 00:00:00
  date = db.Column(db.Text, default=str(datetime.now().date()))

class DailySudokuSolver(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Text)
  sudokuID = db.Column(db.Integer)
  # Text because I do not know how to store timedelta as Datetime object
  time = db.Column(db.Text)


@app.route('/play/get_sudoku/<int:lvl>')
def get_sudoku(lvl):
  return {"sudoku": getter.generateFromSeed("level" + str(lvl))}


@app.route('/play/check_sudoku', methods=['GET', 'POST'])
def check_sudoku():
  if request.method == 'POST':

    # Extract data from request
    name            =     request.json["name"]
    sudoku          =     request.json["solvedSudoku"]
    originalSudoku  =     request.json["originalSudoku"]
    minutes         =     request.json["time"]["minutes"]
    seconds         =     request.json["time"]["seconds"]

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
        amountOfTime = timedelta(seconds=seconds, minutes=minutes)

        solver = DailySudokuSolver(
          sudokuID=getSudokuID(originalSudoku), 
          name=name, 
          time=str(amountOfTime))

        db.session.add(solver)
        db.session.commit()

      return{"solved_correctly": True}

    else:
      return {"solved_correctly": False}


@app.route('/play/getDailySudoku')
def get_daily_sudoku():
  return {"sudoku": getter.getDailySudoku()}


@app.route('/play/getDailySudokuSolvers')
def get_daily_sudoku_solvers():
  data = DailySudokuSolver.query.filter_by(sudokuID=getSudokuID(getter.dailySudoku))
  data = solversToArrOfObjects(data)
  # Sort the data by time
  data.sort(key = lambda i: i['time'])
  return {"solvers": data}


def solversToArrOfObjects(solvers):
  data = []

  for solver in solvers:
    data.append(
      {
        "name": solver.name,
        "time": solver.time
      }
    )

  return data


def getSudokuID(board):
  return DailySudoku.query.filter_by(board=str(board)).first().id


def addDailySudokuToDatabase():
  sudoku = DailySudoku(board=str(getter.dailySudoku), date=datetime.now().date())
  db.session.add(sudoku)
  db.session.commit()


def generateDailySudoku():
  # Is there a sudoku in the database for this day?
  lastSudoku = DailySudoku.query.filter_by(date=str(datetime.now().date())).first()

  if lastSudoku:
    # Converting '["element1", "element2"]' string into ["element1", "element2"] array
    # Setting the last daily sudoku as the current sudoku
    getter.dailySudoku = literal_eval(lastSudoku.board)

  else:
    # Generate new sudoku
    getter.generateDailySudoku()
    addDailySudokuToDatabase()


generateDailySudoku()
 
# Generate new daily sudoku every 24 hours
scheduler = BackgroundScheduler()
scheduler.add_job(func=generateDailySudoku, trigger="interval", hours=24)
scheduler.start()
# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

if __name__ == "__main__": 
  app.run(debug=True, port=5000)