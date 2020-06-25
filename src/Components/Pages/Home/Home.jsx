import React from 'react';
import './Home.scss';

// My components
import Section from '../../Sections/Section/Section.jsx';
import LandingPage from '../../Sections/LandingPage/LandingPage.jsx';
import Quote from '../../Sections/Quote/Quote.jsx';
import Card from '../../Elements/Card/Card.jsx';
import TextSection from '../../Sections/TextSection/TextSection.jsx';
import ChooseLvlSection from '../../Sections/ChooseLvlSection/ChooseLvlSection.jsx';

// Icons
import {  ReactComponent as ExploreIcon  } from '../../../images/explore.svg';

// Color palette
import colorPalette from '../../../color_palette.json'

const Home = () => { 

  let cardStyles = { 
    bg_color: colorPalette.bgCard,
    txt_color: colorPalette.txtPrimaryLight,
    img: `linear-gradient(to right bottom, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 } `,
    btn_bg_color: `linear-gradient(to right, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 } `,
    btn_txt_color: colorPalette.txtPrimaryDark
   };

  return (
    <div className="home">
  
      <nav>
        <div className="elements">
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#rules">Rules</a>
          <a href="#levels">Play</a>
          <div id="indicator"></div>
        </div>
      </nav>

      <Section
        padding="0"
        bg={  colorPalette.bgDark  } 
        className="dark-container">

        <Section
          padding="0 0 60px 0">

          <LandingPage 
            sub_text="We have taken sudoku to a new level."
            sub_text_color={ colorPalette.txtPrimaryLight }
            bg_img={ require('../../../images/background_landing_page.png') }
            bg_color={ colorPalette.bgDark }
            icon
            btn_bg_color="rgba(219, 219, 219, 0.3)"
            arrow_color="#212121"
            link="quote">

            <h1 style={{ color: colorPalette.txtPrimaryLight }}>It's not just <br /> sudoku.</h1>
            <h2 style={{ color: colorPalette.txtPrimaryLight }}>Lorem Ipsum Dolor sit amet.</h2>
            <p style={{ color: colorPalette.txtPrimaryLight }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> Maecenas quis sagittis nisi. Donec vitae blandit quam,<br /> et rhoncus nulla. Nulla vitae urna at ex maximus rutrum.</p>
          </LandingPage>
        </Section>

        <Section
          sectionLink="quote">

          <Quote 
            text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
            author="Erno Rubik"
            line_color={ `linear-gradient(to right, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 }` }
            text_color={ colorPalette.txtPrimaryLight }
            author_color={ colorPalette.txtSecondary }
          />
        </Section>

        <Section>
          <section className="cards-container">
            <div className="cards-wrapper">
              <Card 
                heading="About"
                sub_text="Read more about the project!"
                { ...cardStyles }
                btn_link="about"
              />

              <Card 
                heading="Rules"
                sub_text="Check out how to solve sudoku!"
                { ...cardStyles }
                btn_link="rules"
              />

              <Card 
                heading="Play"
                sub_text="Do you wanna play a game?"
                { ...cardStyles }
                btn_link="levels"
              />
            </div>
            
            <p className="note">Or scroll down and see all the stuffs by yourself!</p>
          </section>
        </Section>

        <Section
          sectionLink="about">

          <TextSection 
            title="About project"
            sub_title="A few words from the author."
            title_color={ colorPalette.txtPrimaryLight }
            sub_title_color={ colorPalette.txtSecondary }
            txt_color={ colorPalette.txtPrimaryLight }
            line_color={ `linear-gradient(to top, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 }` }
            img={ require('../../../images/about_img.png') }
            alt="Designer Image"
            img_align_mobile="top"
            img_align="left">
            
            <p>Aliquam sollicitudin egestas pellentesque. Nulla porta sollicitudin lacus, ut finibus libero fermentum quis. Integer fermentum mattis ex, lacinia lobortis ex hendrerit in. Vivamus at ante imperdiet, lobortis felis vitae, efficitur massa.</p> <p>Nam ex metus, venenatis id justo nec, tempus dictum mauris. Sed non nibh lorem. Phasellus et faucibus ligula, sit amet porttitor magna. Phasellus non volutpat dolor, nec lobortis ex.</p>
          </TextSection>
        </Section>
      </Section>

      <Section
        className="light-container"
        padding="0 0 60px 0">
        
        <img 
          className="wavy-transition" 
          src={ require('../../../images/transition1.png') } 
          alt="wavy thing"
        />

        <Section
          sectionLink="rules">

          <TextSection 
            title="Rules"
            sub_title="Learn the rules for solving sudoku!"
            title_color={ colorPalette.txtPrimaryDark }
            sub_title_color={ colorPalette.txtSecondary }
            txt_color={ colorPalette.txtPrimaryDark }
            img={ require('../../../images/sudoku.png') }
            alt="Designer Image"
            img_align="left"
            img_align_mobile="bot">

            <p>Sudoku is played over a <strong>9x9 grid</strong>, divided to <strong>3x3 sub</strong> grids called "regions".</p>
            <p>Sudoku begins with some of the grid cells already filled with numbers.</p>
            <p>The object of Sudoku is to fill the other empty cells with numbers between 1 and 9 (1 number only in each cell) according the following guidelines</p>
            <ol>
              <li>Number can appear only once on each <strong>row</strong>.</li>
              <li>Number can appear only once on each <strong>column</strong>.</li>
              <li>Number can appear only once on each <strong>region</strong>.</li>
            </ol>
            <p>And that’s it, ladies and gentlemans! You are ready to start solving some sudoku puzzles!</p>
            <p><strong>Warning!</strong> Some sudokus are not solvable or have more solutions. But keep calm, our sudokus are solvable ane have only one solution!</p>

          </TextSection>
        </Section>
      </Section>

      <Section
        sectionLink="levels">
        
        <ChooseLvlSection
          levels = { 
            [
              { 
                name: "Beginner",
                linkValue: 1
              },
              { 
                name: "Normal",
                linkValue: 2
              },
              { 
                name: "Advanced",
                linkValue: 3
              },
              { 
                name: "Hard",
                linkValue: 4
              },
              { 
                name: "Extra Hard",
                linkValue: 5
              }
            ]
           }
          goTo="/play"
          bg={ `linear-gradient(to right, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 }` }
          btn_bg="white"
        />
      </Section> 
    </div>
  )
}

export default Home;
