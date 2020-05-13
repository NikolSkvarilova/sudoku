import React from 'react'
import './App.scss'

// my components
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Quote from './Components/Quote/Quote.jsx'
import Card from './Components/Card/Card.jsx'

function App() {

  // async function catchHello() {
  //   const response = await fetch('/hello');
  //   return await response.text();
  // }

  // let helloText = ''

  // catchHello()
  //   .then(text => console.log(text))
  //   .catch(error => console.log(error));

  return (
    <div>
      <LandingPage 
        main_title={["It's not just", <br />, "sudoku."]}
        sub_text="We have taken sudoku to a new level."
      />

      <Quote 
        text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
        author="Erno Rubik"
      />

      <Card
        heading="About"
        sub_text="Learn more about our team!"
      />
    </div>
  )
}

export default App

