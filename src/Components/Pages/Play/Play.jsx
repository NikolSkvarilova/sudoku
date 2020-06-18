import React from 'react';
import './Play.scss';

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalSudoku: null, // The fetched one (won't change)
      currentSudoku: null, // The one which can user change
      selectedValue: null // Value the user wants to see highlighted or which the user wants to insert into the sudoku.
    };
  }


  componentDidMount() {
    this.fetchSudoku()
  }


  fetchSudoku() {
    // Getting sudoku from backend
    fetch(`/play/get_sudoku/${this.props.match.params.level}`)
      .then(response => response.json())
      .then(data => this.setState({ originalSudoku: data.sudoku }))
      .then(() => this.createSudokuFromOriginal())
      .catch(err => console.log(err));
  }


  generateBlankBoard(height) {
    // param: height = number of sublists in the parent list ([[], [], []] --> height = 3)

    let board = [];

    for (let i = 0; i < height; i++) {
      board.push([]);
    }

    return board;
  }


  createSudokuFromOriginal() {
    // Takes the original fetched sudoku and creates 
    // a list ob objects with these information:
    // cell = { value:      <int: value of the cell in the sudoku>, 
    //          notes:      <array: list of possible values entered by user>, 
    //          prefilled:  <bool: is this spot empty in the original sudoku>,
    //          row:        <int: position>,
    //          col:        <int: posiiton>
    //        }  
    // 
    // User edits this sudoku, not the original one!

    let height = this.state.originalSudoku.length;
    let width = this.state.originalSudoku[0].length;

    let sudoku = this.generateBlankBoard(height);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let value = this.state.originalSudoku[i][j];
        let prefilled = false;

        if (value !== 0) {
          prefilled = true;
        } else {
          value = null;
        }

        let cell = {
          value:      value,
          notes:      null,
          prefilled:  prefilled,
          row:        i,
          col:        j
        }

        sudoku[i].push(cell);
      }
    }

    this.setState({ currentSudoku: sudoku });
  }


  handleClickOnCell(row, col) {
    // Click handling
    if (! this.state.currentSudoku[row][col].prefilled) {
      let currentSudoku = this.state.currentSudoku;

      if (!! this.state.currentSudoku[row][col].value) {
        // Delete value
        currentSudoku[row][col].value = null;
      } else {
        currentSudoku[row][col].value = this.state.selectedValue; 
      }
      
      this.setState({ currentSudoku: currentSudoku });
    }
  }


  getClassesForCell(cell) {
    // Just some ui classes for each cell
    // Why? Because prefilled cells will have different color and so on

    let classes = "";

    if (cell.prefilled) {
      classes += " prefilled";
    } else {
      classes += " notFilled";
    }

    // This highlightes every cell with specific value (selected value)
    if (cell.value === this.state.selectedValue) {
      classes += " selected"
    } 

    return classes;
  }


  renderSudoku() {
    // Returns list of trs and tds with specific values and classnames

    // ... for each row in the sudoku ...
    return this.state.currentSudoku.map(row => {
      let rowList = [];
      
      // ... for each cell in the row ...
      row.forEach(cell => {
        rowList.push(
          <td 
            className={ this.getClassesForCell(cell) } 
            onClick={ () => this.handleClickOnCell(cell.row, cell.col) }
          >
            { cell.value }
          </td>
        );
      });

      return (
        <tr>
          {rowList}
        </tr>
      );
    });
  }


  countHowManyLeft(value) {
    let count = 0;
    let size = this.state.currentSudoku.length;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.state.currentSudoku[i][j].value === value) {
          count++;
        }
      }
    }
    return size - count;
  }


  getPossibleValuesElements() {
    // Display "buttons" with numbers (in 9x9 sudoku its 1-9) 
    // User can click on them and he will see all the cells with the value.
    // When he selects a value and click on an empty cell, the cell is filled with the selected number.
    let elements = [];

    for (let i = 0; i < this.state.currentSudoku.length; i++) {
      elements.push(
      <section 
        className={ this.state.selectedValue === i + 1 ? "value-btn value-btn-selected" : "value-btn" } 
        onClick={ () => {
          if (this.selectedValue != i + 1) {
            this.setState({ selectedValue: i + 1 });
          } else {
            this.setState({ selectedValue: null });
          }
          
        }}>
        <section className="value">{ i + 1 }</section>
        <section className="howManyLeft">{ this.countHowManyLeft(i + 1) }</section>
      </section>
      )
    }

    return elements;
  }

  checkSudoku() {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([this.objectSudokuToArraySudoku(), this.state.originalSudoku])
    };

    fetch('/play/check_sudoku', requestOptions)
      .then(response => response.json())
      .then(data => this.solved(data.solved_correctly))
  }

  objectSudokuToArraySudoku() {
    let size = this.state.originalSudoku.length;
    let sudoku = this.generateBlankBoard(size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let value = this.state.currentSudoku[i][j].value;

        if (value === null) {
          value = 0;
        }

        sudoku[i].push(value)
      }
    }

    return sudoku
  }


  solved(correctly) {
    if (correctly) {
      alert("Congratulation! You have solved the sudoku!")
    } else {
      alert("Whoop! You did not solved it correctly. :(")
    }
  }


  render () {
    return (
      <div className="play-container">
        <table className="sudoku-table">
          <tbody>
            { this.state.currentSudoku !== null ? this.renderSudoku() : <tr><td>Hello</td></tr> }
          </tbody>
        </table>
        
        <div className="value-buttons">
          { this.state.currentSudoku !== null ? this.getPossibleValuesElements() : "" }
        </div>

        <div className="btn-section">
          <div className="button" onClick={ () => { this.createSudokuFromOriginal() } }>Reset Sudoku</div>
          <div className="button" onClick={ () => { this.checkSudoku() } }>Check the Sudoku</div>
          <div className="button" onClick={ () => { this.fetchSudoku() } }>Get New Sudoku</div>
        </div>
      </div>
    );
  }
}


export default Play;
