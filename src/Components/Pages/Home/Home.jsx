import React from 'react';
import './Home.scss';

// My components
import Section from '../../Sections/Section/Section.jsx';
import LandingPage from '../../Sections/LandingPage/LandingPage.jsx';
import Quote from '../../Sections/Quote/Quote.jsx';
import TextSection from '../../Sections/TextSection/TextSection.jsx';
import ChooseLvlSection from '../../Sections/ChooseLvlSection/ChooseLvlSection.jsx';
import Categories from '../../Sections/Categories/Categories.jsx'

// Icons
import {  ReactComponent as ExploreIcon  } from '../../../images/explore.svg';

// Color palette
import colorPalette from '../../../color_palette.json'

const Home = () => { 

  return (
    <div className="home">

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
            arrow_color="white"
            link="quote"
            shadow="0px 0px 55px -2px rgba(0,0,0,0.63)">

            <h1 style={{ color: colorPalette.txtPrimaryLight }}>It's not just <br /> sudoku.</h1>
            <h2 style={{ color: colorPalette.txtPrimaryLight }}>Lorem Ipsum Dolor sit amet.</h2>
            <p style={{ color: colorPalette.txtPrimaryLight }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis sagittis nisi. Donec vitae blandit quam, et rhoncus nulla. Nulla vitae urna at ex maximus rutrum.</p>
          </LandingPage>
        </Section>

        <Section
          sectionLink="quote">

          <Quote 
            text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
            author="Erno Rubik"
            text_styles={{ color: colorPalette.txtPrimaryLight }}
            author_styles={{ color: colorPalette.txtSecondary }}
          />
        </Section>

        <Section>
          <Categories 
            categories={[
              {
                img: require('./../../../images/small1 (1).png'),
                content: [<h1>About Us</h1>, <p>Learn more about our team and our work.</p>]
              },
              {
                img: require('./../../../images/small2 (1).png'),
                content: [<h1>Code</h1>, <p>View source code and check out used technologies.</p>]
              },
              {
                img: require('./../../../images/small3 (1).png'),
                content: [<h1>Documentation</h1>, <p>Read the documentation and join the development process!</p>]
              },
            ]}
            style={{ color: 'white' }}
          />
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

        <Section
          sectionLink="rules">

          <TextSection 
            title="Rules"
            sub_title="Learn the rules for solving sudoku!"
            title_color={ colorPalette.txtPrimaryLight }
            sub_title_color={ colorPalette.txtSecondary }
            txt_color={ colorPalette.txtPrimaryLight }
            img={ require('../../../images/sudoku_light.png') }
            alt="Designer Image"
            img_align="right"
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
        padding="0"
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
          sectionStyle={{ background: `linear-gradient(135deg, ${ colorPalette.fancy1 }, ${ colorPalette.fancy2 }`, color: 'white' }}
          btnStyle={{ color: "white" }}
        />
      </Section> 
    </div>
  )
}

export default Home;
