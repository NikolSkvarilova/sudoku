import React from 'react'
import './App.scss'

// my components
import LandingPage from './Components/LandingPage/LandingPage.jsx'
import Quote from './Components/Quote/Quote.jsx'
import Card from './Components/Card/Card.jsx'
import TextSection from './Components/TextSection/TextSection.jsx'

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
          bg_img={require('./images/background_landing_page.png')}
        />

        <Quote 
          text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
          author="Erno Rubik"
        />

        <section className="cards-container">
          <Card 
            heading="About"
            sub_text="Read more about the project!"
          />

          <Card 
            heading="Rules"
            sub_text="Check out how to solve sudoku!"
          />

          <Card 
            heading="Play"
            sub_text="Do you wanna play a game?!"
          />
        </section>

        <TextSection 
          title="About project"
          sub_title="A few words from the author."
          text={[<p>Aliquam sollicitudin egestas pellentesque. Nulla porta sollicitudin lacus, ut finibus libero fermentum quis. Integer fermentum mattis ex, lacinia lobortis ex hendrerit in. Vivamus at ante imperdiet, lobortis felis vitae, efficitur massa.</p>, <p>Nam ex metus, venenatis id justo nec, tempus dictum mauris. Sed non nibh lorem. Phasellus et faucibus ligula, sit amet porttitor magna. Phasellus non volutpat dolor, nec lobortis ex.</p>]}
          img={require('./images/about_img.png')}
          alt="Designer Image"
        />
      </section>
    </div>
  )
}

export default App

