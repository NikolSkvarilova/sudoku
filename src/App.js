import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// my components
import Home from './Components/Pages/Home/Home.jsx'
import Play from './Components/Pages/Play/Play.jsx'

// Color palette
import colorPalette from './color_palette.json'

class App extends React.Component {
  constructor(props)  {
    super(props);

    this.state = {
      navActive: false,
    }
  }
  // let mainNav = document.getElementById("js-menu");
  // let navBarToggle = document.getElementById("js-navbar-toggle");

  // navBarToggle.addEventListener("click", function() {
  //   mainNav.classList.toggle("active");
  // });

  toggleNavActive() {
    this.setState({ navActive: !this.state.navActive })
    console.log(this.state.navActive)
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav 
            className={ this.state.navActive ? 'navActive' : '' }
            onClick={ () => { this.toggleNavActive() }}>

            <span 
              class="navbar-toggle" 
              onClick={ () => { this.toggleNavActive() }}
              style={ window.location.pathname !== "/" ? { color: "#8a8a8a" } : { color: "white" } }>
                
              <i class="fa fa-bars"></i>
            </span>

            <div className={ `elements ${ this.state.navActive ? 'active' : '' }` } { ... window.location.pathname === "/" && { style: { color: "white" }}} > 
              <a href="/#">Home</a>
              <a href="/#about">About</a>
              <a href="/#rules">Rules</a>
              <a href="/#levels">Play</a>
              <div id="indicator"></div>
            </div>
          </nav>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/play/:level" component={Play} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
