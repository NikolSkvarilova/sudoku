 import React from 'react';
import './Play.scss';

// My components
import Section from './../../Sections/Section/Section.jsx';
import TextSection from './../../Sections/TextSection/TextSection.jsx';
import Button from './../../Elements/Button/Button.jsx';
import Categories from './../../Sections/Categories/Categories.jsx'

// icon
import crown from './../../../images/crown.png'

// color palette
import colorPalette from './../../../color_palette.json'

class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalSudoku:           null,   // The fetched one (won't change)
      currentSudoku:            null,   // The one which can user change
      selectedValue:            "",     // Value the user wants to see highlighted or which the user wants to insert into the sudoku.
      noting:                   false,  // Are we noting right now?
      dailySudoku:              false,  // If the sudoku we are dealing with is daily or not
      minutes:                  0,
      seconds:                  0,
      intervalID:               0,
      dailySolvers:             [],
      rowsInSolversTable:       5
    };
  }


  componentDidMount() {
    this.getSudoku();
    this.getDailySudokuSolvers();
  }


  // -------------- STOPWATCH --------------


  startStopwatch() {
    // Stopwatch thingy
    // 'cause I do not know how to make it a component lol
    this.state.intervalID = setInterval(() => {
      return this.setState((state) => {
        
        return {
          seconds: state.seconds === 59 ? 0 : state.seconds++,
          minutes: state.seconds === 59 ? state.minutes++ : state.minutes
        }
      })
    }, 1000)
  }


  stopStopwatch() {
    clearInterval(this.state.intervalID);
  }


  resetStopwatch() {
    this.setState({ minutes: 0, seconds: 0 })
  }


  // -------------- SUDOKU --------------


  fetchSudoku(address) {
    // Getting sudoku from backend
    // param: address = link (example: /api/play/2)

    fetch(address)
      .then(response => response.json())
      .then(data => this.setState({ originalSudoku: data.sudoku }))
      .then(() => this.createSudokuFromOriginal())
      .catch(err => {
        this.setState({ currentSudoku: null })
      });
  }


  getSudoku() {
    // Fetch normal sudoku 
    this.fetchSudoku(`/api/play/get_sudoku/${ this.props.match.params.level }`);
    this.setState({ dailySudoku: false, selectedValue: "" });
    this.resetStopwatch()
    this.startStopwatch()
  }


  getDailySudoku() {
    // Getting the daily sudoku (same all day)
    this.fetchSudoku('/api/play/getDailySudoku');
    this.setState({ dailySudoku: true, selectedValue: "" });

    // Scroll back to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.resetStopwatch()
    this.startStopwatch()
  }


  resetSudoku() {
    this.createSudokuFromOriginal();
    this.setState({ selectedValue: "", noting: false });
  }


  checkSudoku() {
    this.stopStopwatch();
    
    let name = "N/A";

    if (this.state.dailySudoku) {
      name = prompt("Enter your name: ")
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name:             name,
        originalSudoku:   this.state.originalSudoku,
        solvedSudoku:     this.objectSudokuToArraySudoku(), 
        time:             { 
                            minutes:  this.state.minutes, 
                            seconds:  this.state.seconds 
                          }
      })
    };

    fetch('/api/play/check_sudoku', requestOptions)
      .then(response => response.json())
      .then(data => this.solved(data.solved_correctly))

    if (this.state.dailySudoku) {
      this.getDailySudokuSolvers();
    }
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


  changeMode() {
    this.setState({ noting: !this.state.noting })
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


  // -------------- GENERAL --------------


  generateBlankBoard(height) {
    // param: height = number of sublists in the parent list ([[], [], []] --> height = 3)

    let board = [];

    for (let i = 0; i < height; i++) {
      board.push([]);
    }

    return board;
  }


  checkIfElementInArray(arr, element) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === element) {
        return true;
      }
    }
  }


  wholeNumTest(n) {
    return (n - Math.floor(n)) !== 0; 
  }


  // -------------- OTHER PAGE STUFFS --------------


  getDailySudokuSolvers() {
    fetch('/api/play/getDailySudokuSolvers')
      .then(response => response.json())
      .then(data => this.setState({ dailySolvers: data.solvers }))
      .catch(err => {
        this.setState({ dailySolvers: [] })
        alert("I am sorry to inform you that there has been a problem providing top daily sudoku solvers. Try refreshing the page or wait a while and try again if necessary.")
      });
  }


  solved(correctly) {
    if (correctly) {
      alert("Congratulation! You have solved the sudoku!")
    } else {
      alert("Whoop! You did not solved it correctly. :(")
    }
  }


  renderDailySolversSolvers() {
    let howMany = this.state.rowsInSolversTable;

    if (howMany > this.state.dailySolvers.length) {
      howMany = this.state.dailySolvers.length
    } 

    let tableRows = [];

    for (let i = 0; i < howMany; i++) {
      let solver = this.state.dailySolvers[i]

      tableRows.push(
        <tr>
          <td>{ i + 1 }</td>
          <td>{ solver.name }</td>
          <td>{ solver.time }</td>
        </tr>
      )
    }

    return([
        <table className="daily-solvers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </table>
    ])
  }


  renderErrPage() {
    // Renders an error msg and button to go back to main page

    return([
      <h1 className="err-msg">Oops! We seem to be having trouble with the server <span style={{ whiteSpace: "nowrap" }}>:(</span></h1>,
      <Button class="play_btn" link="/">Go Back to Main Page</Button>
    ])
  }


  renderNoErrPage() {
    // Renders page when there is no error

    return([
      this.renderSudokuSection(),

      // Just note
      <p style={{ color: "gray" }} className="under-board-note">Scroll down and learn more.</p>,

      // Help Section
      <Section
      alignItems="center">

        <TextSection
        title="How to play"
        img={ require('../../../images/help.png') }
        img_align_mobile="top"
        img_align="left">

        <p>Curabitur ornare eros ultrices arcu blandit, at vestibulum velit pellentesque. Sed maximus dolor non sapien tristique faucibus. Duis lorem quam, vulputate vehicula lacus vel, commodo fringilla eros. </p>
          
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </TextSection>
      </Section>,

      // Levels
      <Section
      padding="0"
      bg={ colorPalette.bgLightGray }
      >

        <Categories 
          categories={[
            {
              img: require('./../../../images/beginner.png'),
              content: [<a className="lvl-link" href="/play/1"><h1>Easy</h1></a>, <p>You have never ever played sudoku?</p>]
            },
            {
              img: require('./../../../images/normal.png'),
              content: [<a className="lvl-link" href="/play/2"><h1>Normal</h1></a>, <p>You know some basic tricks, maybe played few times.</p>]
            },
            {
              img: require('./../../../images/advanced.png'),
              content: [<a className="lvl-link" href="/play/3"><h1>Advanced</h1></a>, <p>You are quite good at solving sudoku, but sometimes it takes way too long.</p>]
            },
            {
              img: require('./../../../images/master.png'),
              content: [<a className="lvl-link" href="/play/4"><h1>Master</h1></a>, <p>Dude, you know what you are doing.</p>]
            },
            {
              img: require('./../../../images/pro.png'),
              content: [
              <a className="lvl-link" href="/play/5"><h1>Pro</h1></a>, 
              <p>I think you have dropped your <span><img src={crown} alt="crown" style={{ height: "16px", display: "inline-block" }}></img></span>, king.</p>]
            }
          ]}
          style={{ color: 'black' }}
        />  
      </Section>,

      // Daily Sudoku section
      <Section
      alignItems="center">

        <TextSection
        title="Try daily sudoku!"
        img={ require('../../../images/daily.png') }
        img_align_mobile="top">

          <p>Curabitur ornare eros ultrices arcu blandit, at vestibulum velit pellentesque. Sed maximus dolor non sapien tristique faucibus. Duis lorem quam, vulputate vehicula lacus vel, commodo fringilla eros. </p>
          
          <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras volutpat, quam in condimentum finibus.</p>

          <Button onClick={ () => { this.getDailySudoku() }} margin="10px 10px 10px 0">Try Daily Sudoku</Button>

          { this.renderDailySolversSolvers() }
        </TextSection>
      </Section>
    ])
  }


  renderSudokuSection() {
    // Renders the sudoku board, buttons

    return([
      this.state.dailySudoku ? <h1>Daily Sudoku</h1> : "",

      <p className="stopwatch">{ this.state.minutes }:{ this.state.seconds }</p>,

      <table className="sudoku-table">
        <tbody>
          { this.renderSudoku() } 
        </tbody>
      </table>,

      <div className="value-buttons">
      { this.state.currentSudoku !== null ? this.getPossibleValuesElements() : "" }
      </div>,

      <div className="btn-section">
        <Button class="play_btn" margin="10px" onClick={ () => { this.resetSudoku() }}>Reset Sudoku</Button>
        <Button class="play_btn" margin="10px" onClick={ () => { this.checkSudoku() }}>Check the Sudoku</Button>
        <Button class="play_btn" margin="10px" onClick={ () => { this.getSudoku() }}>Get New Sudoku</Button>
        <Button margin="10px" onClick={ () => { this.changeMode() }} class={ !! this.state.noting ? "noting play_btn" : "play_btn" }>Change Mode</Button>
      </div>
    ])
  }


  render () {
    return (
      <div className={ `play-container ${ this.state.currentSudoku !== null ? "no-err" : "err" }` }>
        { this.state.currentSudoku !== null ? this.renderNoErrPage() : this.renderErrPage() }
      </div>
    );
  }
}


export default Play;
