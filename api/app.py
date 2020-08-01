
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

app = Flask(__name__, static_folder='../build', static_url_path='')
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


# Serving index.html when going to /.
@app.route('/', methods=["GET"])
def index():
  return app.send_static_file('index.html')


# Serving index.html when going to /play/some_level.
@app.route('/play/<int:lvl>', methods=["GET"])
def play_page(lvl):
  return app.send_static_file('index.html')


# Returns a sudoku based on the level from url.
@app.route('/play/get_sudoku/<int:lvl>', methods=["GET"])
def get_sudoku(lvl):
  return {"sudoku": getter.generateFromSeed("level" + str(lvl))}


# Accepts a POST request with this data:
#     name            :string   - Name of the solver
#     sudoku          :array    - Solver sudoku
#     originalSudoku  :array    - Original unsolved sudoku
#     minutes         :int      - Number of minutes it took the solver to solve it
#     seconds         :int      - Number of seconds it took the solver to solve it
# Name, minutes and seconds are useless when the sudoku is not Daily Sudoku. 
# We check the originalSudoku to see if it is the Daily Sudoku.
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
    # We use deepcopy module to copy the originalSudoku so we do not modify it.
    solver = Solver(copy.deepcopy(originalSudoku))
    solver.solve()

    # Comparing sudokus
    if solver.board == sudoku:
      # Solver correctly

      # If the sudoku is daily sudoku
      if dailySudoku:
        # We add the user into the database of solvers.
        amountOfTime = timedelta(seconds=seconds, minutes=minutes)

        solver = DailySudokuSolver(
          sudokuID  =   getSudokuID(originalSudoku), 
          name      =   name, 
          time      =   str(amountOfTime))

        db.session.add(solver)
        db.session.commit()

      return{"solved_correctly": True}

    else:
      # Solver incorrectly
      return {"solved_correctly": False}


# Returns daily sudoku
@app.route('/play/getDailySudoku', methods=["GET"])
def get_daily_sudoku():
  return {"sudoku": getter.getDailySudoku()}


# Returns list of Daily Sudoku solvers
@app.route('/play/getDailySudokuSolvers', methods=["GET"])
def get_daily_sudoku_solvers():
  data = DailySudokuSolver.query.filter_by(sudokuID=getSudokuID(getter.dailySudoku))
  data = solversToArrOfObjects(data)

  # Sort the data by time
  data.sort(key = lambda i: i['time'])
  return {"solvers": data}


# Creates usable objects from 'flasksqlalchemy.BaseQuery'
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


# Returns sudoku ID based on its board
def getSudokuID(board):
  return DailySudoku.query.filter_by(board=str(board)).first().id


# Adds Daily Sudoku to the database of Daily Sudokus
def addDailySudokuToDatabase():
  sudoku = DailySudoku(board=str(getter.dailySudoku), date=datetime.now().date())
  db.session.add(sudoku)
  db.session.commit()


# Generate Daily Sudoku
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
  # Run app on port 5000 for local purposes
  # app.run(debug=True, port=5000)
  app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
