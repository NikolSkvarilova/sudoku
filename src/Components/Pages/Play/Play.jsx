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
    //          preffiled:  <bool: is this spot empty in the original sudoku>,
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
        let preffiled = false;

        if (value !== 0) {
          preffiled = true;
        } else {
          value = null;
        }

        let cell = {
          value:      value,
          notes:      null,
          preffiled:  preffiled,
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
    if (! this.state.currentSudoku[row][col].preffiled) {
      let currentSudoku = this.state.currentSudoku;
      currentSudoku[row][col].value = this.state.selectedValue; 
      this.setState({ currentSudoku: currentSudoku });
    }
  }


  getClassesForCell(cell) {
    // Just some ui classes for each cell
    // Why? Because preffiled cells will have different color and so on

    let classes = "";

    if (cell.preffiled) {
      classes += " preffiled";
    } else {
      classes += " notFfiled";
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


  getPossibleValuesElements() {
    // Display "buttons" with numbers (in 9x9 sudoku its 1-9) 
    // User can click on them and he will see all the cells with the value.
    // When he selects a value and click on an empty cell, the cell is filled with the selected number.
    let elements = [];

    for (let i = 0; i < this.state.currentSudoku.length; i++) {
      elements.push(
      <section 
        className="value-btn" 
        onClick={ () => {
          if (this.selectedValue != i + 1) {
            this.setState({ selectedValue: i + 1 });
          } else {
            this.setState({ selectedValue: null });
          }
          
        }}>
        { i + 1 }
      </section>
      )
    }

    return elements;
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
          <button className="reset-btn" onClick={ () => {this.createSudokuFromOriginal()} }>Reset</button>
          <button className="check-btn">Check</button>
          <button className="new-btn">New</button>
        </div>
      </div>
    );
  }
}


export default Play;
