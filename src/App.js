import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// my components
import Home from './Components/Pages/Home/Home.jsx'
import Play from './Components/Pages/Play/Play.jsx'

// Color palette
import colorPalette from './color_palette.json'

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={ window.location.pathname === "/" ? { background: "none" } : { background: colorPalette.bgDark } }>
          <div className="elements">
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

export default App
