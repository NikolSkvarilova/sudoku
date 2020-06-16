import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// my components
import Home from './Components/Pages/Home/Home.jsx'
import Play from './Components/Pages/Play/Play.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/play/:level" component={Play} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
