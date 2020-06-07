import time
from flask import Flask

from getter import Getter

app = Flask("__name__")

getter = Getter()

@app.route('/play/get_sudoku/<int:lvl>')
def get_sudoku(lvl):
  return {"sudoku": getter.generateFromSeed("level" + str(lvl))}

