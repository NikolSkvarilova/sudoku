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
      sudoku: null
    };
  }

  componentDidMount() {
    // Getting sudoku from backend
    fetch(`/play/get_sudoku/${this.props.match.params.level}`)
      .then(response => response.json())
      .then(data => this.setState({ sudoku: data.sudoku }))
      .catch(err => console.log(err));

  }

  render () {
    console.log(this.state)
    return (
      <div className="play-container">
        {this.state.sudoku}
      </div>
    );
  }
}


export default Play;
