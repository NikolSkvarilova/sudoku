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





const Play = ({match}) => {

  // Getting sudoku from backend
  fetch(`/play/get_sudoku/${match.params.level}`)
    .then(response => response.json())
    .then(data => console.log(data.sudoku))
    .catch(err => console.log(err))

  return (
    <div>
      {match.params.level}
    </div>
  )
}

export default Play
