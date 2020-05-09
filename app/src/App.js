import React from 'react'
// import PropTypes from 'prop-types'

// my components
import LandingPage from './Components/LandingPage/LandingPage.jsx'

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
      <LandingPage />
    </div>
  )
}

export default App

