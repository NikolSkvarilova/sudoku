import React from 'react';
import './Play.scss';

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalSudoku: null, // The fetched one (won't change)
      currentSudoku: null, // The one which can user change
      selectedValue: "", // Value the user wants to see highlighted or which the user wants to insert into the sudoku.
      noting: false
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
      .catch(err => {
        this.setState({ currentSudoku: null })
      });
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
          notes:      [],
          prefilled:  prefilled,
          row:        i,
          col:        j
        }

        sudoku[i].push(cell);
      }
    }

    this.setState({ currentSudoku: sudoku });
  }


  checkIfElementInArray(arr, element) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === element) {
        return true;
      }
    }
  }


  handleClickOnCell(row, col) {
    // Click handling
    if (! this.state.currentSudoku[row][col].prefilled) {
      let currentSudoku = this.state.currentSudoku;
      let cell = this.state.currentSudoku[row][col];
      let selectedValue = this.state.selectedValue;

      if (this.state.noting) { 
        if (this.checkIfElementInArray(cell.notes, selectedValue)) {
          let index = cell.notes.indexOf(selectedValue);

          if (index > -1) {
            cell.notes.splice(index, 1);
          }
        } else {
          cell.notes.push(selectedValue);
        }
        
      } else {
        if (!! cell.value) {
          // Delete value
          cell.value = null;
        } else {
          cell.value = selectedValue; 
        }
      }
      currentSudoku[row][col] = cell;
      this.setState({ currentSudoku: currentSudoku });
    }
  }


  getClassesForCell(cell) {
    // Just some ui classes for each cell
    // Why? Because prefilled cells will have different color and so on

    let classes = "";
    let regionSize = this.state.originalSudoku.length ** (1 / 2);
 
    if (cell.prefilled) {
      classes += " prefilled";
    } else {
      classes += " notFilled";
    }

    // This highlightes every cell with specific value (selected value)
    if (cell.value === this.state.selectedValue) {
      classes += " selected"
    } 

    // Col
    if (! this.wholeNumTest(cell.col / regionSize) && (cell.col / regionSize) !== 0) {
      classes += " edge-horizontal"
    } 

    // Row
    if (! this.wholeNumTest(cell.row / regionSize) && (cell.row / regionSize) !== 0) {
      classes += " edge-vertical"
    } 

    return classes;
  }


  wholeNumTest(n) {
    return (n - Math.floor(n)) !== 0; 
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
            <div className="cell-value">
              { cell.value }  
            </div>
            { ! cell.value ? <div className="cell-note">{ cell.notes.sort() }</div> : "" }
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
          if (this.state.selectedValue != i + 1) {
            this.setState({ selectedValue: i + 1 });
          } else {
            this.setState({ selectedValue: "" });
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


  changeMode() {
    let neg = !this.state.noting;
    this.setState({ noting: neg })
  }


  renderSudokuPage() {
    // Renders the whole page w/ sudoku board, buttons
    return([
      <table className="sudoku-table">
        <tbody>
          { this.renderSudoku() } 
        </tbody>
      </table>,

      <div className="value-buttons">
      { this.state.currentSudoku !== null ? this.getPossibleValuesElements() : "" }
      </div>,

      <div className="btn-section">
        <div className="button" onClick={ () => { this.createSudokuFromOriginal() } }>Reset Sudoku</div>
        <div className="button" onClick={ () => { this.checkSudoku() } }>Check the Sudoku</div>
        <div className="button" onClick={ () => { this.fetchSudoku() } }>Get New Sudoku</div>
        <div 
          className={ `button ${ this.state.noting ? ' noting' : ''}` } 
          onClick={ () => { this.changeMode() } }>
            
            Change Mode
        </div>
      </div>
    ])
  }


  renderErrPage() {

    // Renders an error msg and button to go back to main page
    return([
      <h1 className="err-msg">Oops! Looks like there is an error with our server <span style={{ whiteSpace: "nowrap" }}>:(</span></h1>,

      <a href="/"><div className="button">Go back to main page</div></a>
    ])
  }


  render () {
    return (
      <div className={ `play-container ${ this.state.currentSudoku !== null && "no-err" }` }>
        { this.state.currentSudoku !== null ? this.renderSudokuPage() : this.renderErrPage() }
      </div>
    );
  }
}


export default Play;
