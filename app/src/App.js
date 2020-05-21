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

  let cardStyles = {
    bg_color: '#222',
    txt_color: 'white',
    img: 'linear-gradient(to right bottom, #24FFFF, #ED1DFF)',
    btn_bg_color: 'linear-gradient(to right, #24FFFF, #ED1DFF)',
    btn_txt_color: 'black'
  }

  return (
    <div>
      <section className="dark-container">
        <LandingPage 
          main_title={["It's not just", <br />, "sudoku."]}
          sub_text="We have taken sudoku to a new level."
          bg_img={require('./images/background_landing_page.png')}
          title_color="white"
          sub_text_color="#9E9E9E"
          bg_color="#1A1A1A"
        />

        <Quote 
          text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
          author="Erno Rubik"
          line="true"
          line_color="linear-gradient(90deg, #24FFFF 0%, #ED1DFF 100%)"
          text_color="white"
          author_color="#24FFFF"
        />

        <section className="cards-container">
          <div className="cards-wrapper">
            <Card 
              heading="About"
              sub_text="Read more about the project!"
              {...cardStyles}
            />

            <Card 
              heading="Rules"
              sub_text="Check out how to solve sudoku!"
              {...cardStyles}
            />

            <Card 
              heading="Play"
              sub_text="Do you wanna play a game?"
              {...cardStyles}
            />
          </div>
          
          <p className="note">Or scroll down and see all the stuffs by yourself!</p>
        </section>

        <TextSection 
          title="About project"
          sub_title="A few words from the author."
          text={[<p>Aliquam sollicitudin egestas pellentesque. Nulla porta sollicitudin lacus, ut finibus libero fermentum quis. Integer fermentum mattis ex, lacinia lobortis ex hendrerit in. Vivamus at ante imperdiet, lobortis felis vitae, efficitur massa.</p>, <p>Nam ex metus, venenatis id justo nec, tempus dictum mauris. Sed non nibh lorem. Phasellus et faucibus ligula, sit amet porttitor magna. Phasellus non volutpat dolor, nec lobortis ex.</p>]}
          title_color="white"
          sub_title_color="gray"
          text_color="white"
          line_color="linear-gradient(to top, #24FFFF 0%, #ED1DFF 100%)"
          img={require('./images/about_img.png')}
          alt="Designer Image"
        />
      </section>

      <section className="light-container">
        <img 
          className="wavy-transition" 
          src={require('./images/transition1.png')} 
          alt="wavy thing"
        />

        <TextSection 
          title="Rules"
          sub_title="Learn the rules for solving sudoku!"
          text={[
            <p>Sudoku is played over a <strong>9x9 grid</strong>, divided to <strong>3x3 sub</strong> grids called "regions".</p>,
            <p>Sudoku begins with some of the grid cells already filled with numbers.</p>,
            <p>The object of Sudoku is to fill the other empty cells with numbers between 1 and 9 (1 number only in each cell) according the following guidelines</p>,
            <ol>
              <li>Number can appear only once on each <strong>row</strong>.</li>
              <li>Number can appear only once on each <strong>column</strong>.</li>
              <li>Number can appear only once on each <strong>region</strong>.</li>
            </ol>,
            <p>And that’s it, ladies and gentlemans! You are ready to start solving some sudoku puzzles!</p>,
            <p><strong>Warning!</strong> Some sudokus are not solvable or have more solutions. But keep calm, our sudokus are solvable ane have only one solution!</p>
          ]}
          title_color="black"
          sub_title_color="gray"
          text_color="blacke"
          img={require('./images/sudoku.png')}
          alt="Designer Image"
        />
      </section>
    </div>
  )
}

export default App
