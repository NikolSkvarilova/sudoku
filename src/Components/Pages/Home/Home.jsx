import React from 'react';
import './Home.scss';

// My components
import Section from '../../Sections/Section/Section.jsx';
import LandingPage from '../../Sections/LandingPage/LandingPage.jsx';
import Quote from '../../Sections/Quote/Quote.jsx';
import TextSection from '../../Sections/TextSection/TextSection.jsx';
import ChooseLvlSection from '../../Sections/ChooseLvlSection/ChooseLvlSection.jsx';
import Categories from '../../Sections/Categories/Categories.jsx'
import Counter from '../../Sections/Counter/Counter.jsx'
import Button from '../../Elements/Button/Button.jsx'

// Icons
import {  ReactComponent as ExploreIcon  } from '../../../images/explore.svg';

// Color palette
import colorPalette from '../../../color_palette.json'

class Home extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      numOfSudokus:       0,    // Number of sudokus
    }
  }

  componentDidMount() {
    this.getNumOfSudokus()
  }

  getNumOfSudokus() {
    fetch('/api/numOfSudokus')
      .then(response => response.json())
      .then(data => this.setState({ numOfSudokus: data.numOfSudokus }))
      .catch(err => {
        this.setState({ numOfSudokus: 10000 })
      });
  }

  render () {
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
              <p style={{ color: colorPalette.txtPrimaryLight }}>Have you heard of sudoku? Do you play sudoku occasionally, or are you a professional player? Maybe we'll interest you.</p>
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
                  img: require('./../../../images/about_us.png'),
                  content: [<h1>About Us</h1>, <p>Learn more about <a href="https://github.com/NikolSkvarilova/sudoku">our team and our work.</a></p>]
                },
                {
                  img: require('./../../../images/code.png'),
                  content: [<h1>We love open source</h1>, <p><a href="https://github.com/NikolSkvarilova/sudoku">View source code</a> and check out used technologies.</p>]
                },
                {
                  img: require('./../../../images/documentation.png'),
                  content: [<h1>Documentation</h1>, <p>Read the <a href="https://github.com/NikolSkvarilova/sudoku">documentation</a> and <a href="https://github.com/NikolSkvarilova/sudoku">join the development process!</a></p>]
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
              line_color={ colorPalette.fancy1 }
              img={ require('../../../images/about_img.png') }
              alt="Designer Image"
              img_align_mobile="top"
              img_align="left"
              line_bg="linear-gradient(90deg, rgba(150,85,255,1) 0%, rgba(116,31,255,1) 100%);">
              
              <p><strong>Not Just Sudoku</strong> started as an <em>innocent school project</em>. There were no big prospects, no big plans - just a sudoku site. However, the opposite became true. Our development team was (and still is) so absorbed that the original ordinary project has become ... <em>this</em>.</p> 
              
              <p>We learned a lot. This is the first project in which we not only used <strong>Reast JS</strong>, but also learned it. And as they say, React JS will also teach you <strong>JavaScript</strong>, <strong>HTML and CSS (Sass)</strong>, and we can now write them down to our CV. But it wouldn't be possible without a proper backend. <strong>Python</strong> has been a guarantee for us for a long time, and in a combination with the <strong>Flask</strong> library it forms a very powerful combination. Last but not least, we got into databases. It's an <strong>SQLite</strong> database, which is solid enough for our purposes and we use <strong>SQLAlchemy</strong> for Python to communicate with it.</p>
            </TextSection>
          </Section>
  
          <Section>
            <Counter 
              number={ this.state.numOfSudokus }
              upperTxt="We have got for you over"
              bottomTxt="sudokus you can play right now! (144x more than we have actually stored in a file.)"
              noteColor="white"
              counterColor={ colorPalette.fancy1 } />
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
              borderColor="white"
              txtColor="white"
            />
          </Section> 

          <Section
            sectionLink="api">
              <TextSection
                title="API"
                title_color={ colorPalette.txtPrimaryLight }
                txt_color={ colorPalette.txtPrimaryLight }
                img={ require('../../../images/API.png') }
                alt="API img"
                img_align="left"
                img_align_mobile="bot">
                
                <p>We will not keep our sudoku and statistics to ourselves. We offer you our API, thanks to which you too can draw on our generated sudoku, use it for your own sites and applications, etc.</p>
                <p>See the documentation for more information</p>
                <Button class="home-page-btn" borderColor="white" txtColor="white" link="#">See More</Button>
              </TextSection>
          </Section>
        </Section>
      </div>
    )
  }
}

export default Home;
