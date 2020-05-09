import React from 'react'
import './App.scss'

// my components
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Quote from './Components/Quote/Quote.jsx'

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
      <section className="dark-container">
        <LandingPage 
          main_title={["It's not just", <br />, "sudoku."]}
          sub_text="We have taken sudoku to a new level."
        />

        <Quote 
          text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
          author="Erno Rubik"
        />
      </section>
    </div>
  )
}

export default App

