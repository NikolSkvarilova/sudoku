import React from 'react';
import './Home.scss';


// my components
import LandingPage from '../../Sections/LandingPage/LandingPage.jsx';
import Quote from '../../Sections/Quote/Quote.jsx';
import Card from '../../Elements/Card/Card.jsx';
import TextSection from '../../Sections/TextSection/TextSection.jsx';
import Footer from '../../Sections/Footer/Footer.jsx';
import ChooseLvlSection from '../../Sections/ChooseLvlSection/ChooseLvlSection.jsx';

// Icons
import { ReactComponent as ExploreIcon } from '../../../images/explore.svg';

// Color palette
import colorPalette from '../../../color_palette.json'

function Home() {

  let cardStyles = {
    bg_color: colorPalette.bgCard,
    txt_color: colorPalette.txtPrimaryLight,
    img: `linear-gradient(to right bottom, ${colorPalette.fancy1}, ${colorPalette.fancy2}`,
    btn_bg_color: `linear-gradient(to right, ${colorPalette.fancy1}, ${colorPalette.fancy2}`,
    btn_txt_color: colorPalette.txtPrimaryDark
  };


  return (
    <div>
      <section className="dark-container"style={{'backgroundColor': colorPalette.bgDark}}>
        <LandingPage 
          main_title={["It's not just", <br />, "sudoku."]}
          sub_text="We have taken sudoku to a new level."
          bg_img={require('../../../images/background_landing_page.png')}
          title_color={colorPalette.txtPrimaryLight}
          sub_text_color={colorPalette.txtSecondary}
          bg_color={colorPalette.bgDark}
          btn_bg_color="#212121"
          link="quote"
        />

        <Quote 
          text="If you are curious, you'll find the puzzles around you. If you are determined, you will solve them."
          author="Erno Rubik"
          line="true"
          section_link="quote"
          line_color={`linear-gradient(to right, ${colorPalette.fancy1}, ${colorPalette.fancy2}`}
          text_color={colorPalette.txtPrimaryLight}
          author_color={colorPalette.fancy1}
        />

        <section className="cards-container">
          <div className="cards-wrapper">
            <Card 
              heading="About"
              sub_text="Read more about the project!"
              {...cardStyles}
              btn_link="about"
            />

            <Card 
              heading="Rules"
              sub_text="Check out how to solve sudoku!"
              {...cardStyles}
              btn_link="rules"
            />

            <Card 
              heading="Play"
              sub_text="Do you wanna play a game?"
              {...cardStyles}
              btn_link="play"
            />
          </div>
          
          <p className="note">Or scroll down and see all the stuffs by yourself!</p>
        </section>

        <TextSection 
          title="About project"
          section_link="about"
          sub_title="A few words from the author."
          title_color={colorPalette.txtPrimaryLight}
          sub_title_color={colorPalette.txtSecondary}
          txt_color={colorPalette.txtPrimaryLight}
          line_color={`linear-gradient(to top, ${colorPalette.fancy1}, ${colorPalette.fancy2}`}
          img={require('../../../images/about_img.png')}
          alt="Designer Image"
          img_align_mobile="top"
          img_align="left"
          // img_position="to_edge"
          // img_full_width_mobile
          >
          
          <p>Aliquam sollicitudin egestas pellentesque. Nulla porta sollicitudin lacus, ut finibus libero fermentum quis. Integer fermentum mattis ex, lacinia lobortis ex hendrerit in. Vivamus at ante imperdiet, lobortis felis vitae, efficitur massa.</p> <p>Nam ex metus, venenatis id justo nec, tempus dictum mauris. Sed non nibh lorem. Phasellus et faucibus ligula, sit amet porttitor magna. Phasellus non volutpat dolor, nec lobortis ex.</p>
        </TextSection>
      </section>

      <section className="light-container">
        <img 
          className="wavy-transition" 
          src={require('../../../images/transition1.png')} 
          alt="wavy thing"
        />

        <TextSection 
          title="Rules"
          sub_title="Learn the rules for solving sudoku!"
          section_link="rules"
          title_color={colorPalette.txtPrimaryDark}
          sub_title_color={colorPalette.txtSecondary}
          txt_color={colorPalette.txtPrimaryDark}
          img={require('../../../images/sudoku.png')}
          alt="Designer Image"
          img_align="left"
          img_align_mobile="bot">

          <p>Sudoku is played over a <strong>9x9 grid</strong>, divided to <strong>3x3 sub</strong> grids called "regions".</p>
          <p>Sudoku begins with some of the grid cells already filled with numbers.</p>
          <p>The object of Sudoku is to fill the other empty cells with numbers between 1 and 9 (1 number only in each cell) according the following guidelines</p>
          <ol>
            <li>Number can Homeear only once on each <strong>row</strong>.</li>
            <li>Number can Homeear only once on each <strong>column</strong>.</li>
            <li>Number can Homeear only once on each <strong>region</strong>.</li>
          </ol>
          <p>And that’s it, ladies and gentlemans! You are ready to start solving some sudoku puzzles!</p>
          <p><strong>Warning!</strong> Some sudokus are not solvable or have more solutions. But keep calm, our sudokus are solvable ane have only one solution!</p>

        </TextSection>
          
      </section>

      <ChooseLvlSection
        levels = {
          [
            {
              name: "Level 1",
              description: "This is level for begginers.",
              linkValue: 1
            },
            {
              name: "Level 2",
              description: "This is level for advanced players.",
              linkValue: 2
            },
            {
              name: "Level 3",
              description: "This is level for masters.",
              linkValue: 3
            },
            {
              name: "Level 4",
              description: "This is level for masters.",
              linkValue: 4
            },
            {
              name: "Level 5",
              description: "This is level for masters.",
              linkValue: 5
            }
          ]
        }
        goTo="/play"
        bg={`linear-gradient(to right, ${colorPalette.fancy1}, ${colorPalette.fancy2}`}
        btn_bg="white"
      />

      {/* <Footer 
        categories={
          [
            {text: "Explore", 
            icon: <ExploreIcon fill={colorPalette.txtSecondary}/>,
            sub_categories: [
              {text: "About project", link: "about"}, 
              {text: "Rules", link: "rules"},
              {text: "Play game", link: "play"}
            ]}, 
            {text: "Visit", 
            sub_categories: [
              {text: "Web1", link: "www.google.com"}, 
              {text: "Web2", link: "www.facebook.com"}
            ]},
            {text: "Contact", 
            note: "Lorem Ipsum dolor sit amet.",
            sub_categories: [
              {text: "E-mail", link: "www.google.com"}, 
              {text: "GitHub", link: "www.facebook.com"}
            ]}
          ]}
        bg="#222"
        category_txt_color={colorPalette.txtSecondary}
        note_txt_color={colorPalette.txtSecondary}
        subcategory_txt_color={colorPalette.txtSecondary}
      /> */}
    </div>
  )
}

export default Home
