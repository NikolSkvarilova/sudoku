

import json
import random

import leveler

class App:
  def __init__(self):
    self.sudokuFile = App.readJSON()

  @staticmethod
  def readJSON():
    with open('data.json') as JSONdata:
      return json.load(JSONdata)

if __name__ == "__main__":
  app = App()