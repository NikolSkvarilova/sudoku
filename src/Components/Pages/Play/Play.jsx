import React from 'react';
import './Play.scss';


// my components
// import LandingPage from '../../Sections/LandingPage/LandingPage.jsx';
// import Quote from '../../Sections/Quote/Quote.jsx';
// import Card from '../../Elements/Card/Card.jsx';
// import TextSection from '../../Sections/TextSection/TextSection.jsx';
// import ButtonSection from '../../Sections/ButtonSection/ButtonSection.jsx';
// import Footer from '../../Sections/Footer/Footer.jsx';

// Color palette
// import colorPalette from '../../../color_palette.json'



class Play extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalSudoku: null, // The fetched one (won't change)
      currentSudoku: null // The one which can user change
    };
  }

  componentDidMount() {
    // Getting sudoku from backend
    fetch(`/play/get_sudoku/${this.props.match.params.level}`)
      .then(response => response.json())
      .then(data => this.setState({ originalSudoku: data.sudoku }))
      .then(() => this.createCellObjects())
      .catch(err => console.log(err));

  }

  generateBlankBoard(height) {
    let board = [];

    for (let i = 0; i < height; i++) {
      board.push([]);
    }

    return board;
  }

  createCellObjects() {

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
          value: value,
          notes: null,
          preffiled: preffiled,
          row: i,
          col: j
        }

        sudoku[i].push(cell);
      }
    }

    this.setState({ currentSudoku: sudoku });
  }


  myFunc(row, col) {
    // Click handling
    console.log(row, col);
  }

  renderSudoku() {

    return this.state.currentSudoku.map(row => {
      let rowList = [];
      row.forEach(cell => {
        rowList.push(
          <td 
            className={ !! cell.preffiled ? "preffiled" : "notFilled" } 
            onClick={ () => this.myFunc(cell.row, cell.col) }>{cell.value}
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

  render () {
    return (
      <div className="play-container">
        <table className="sudoku-table">
          <tbody>
            { this.state.currentSudoku !== null ? this.renderSudoku() : <tr><td>Hello</td></tr> }
          </tbody>
        </table>
      </div>
    );
  }
}


export default Play;
