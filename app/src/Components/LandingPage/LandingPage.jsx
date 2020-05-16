import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LandingPage.scss';

const LandingPage = (props) => {
  let styles = {
    backgroundImage: `url(${props.bg_img})`
  }

  return (
    <div className="landing_page_container" style={styles}>
      <h1 className="main_title">{props.main_title}</h1>
      <div className="scroll-down_container">
        <p className="sub_text">{props.sub_text}</p>
        {/* Scroll Button */}
      </div>
    </div>
  )
}

LandingPage.propTypes = {
  main_title: PropTypes.string.isRequired,
  sub_text: PropTypes.string,
  bg_img: PropTypes.node
}

export default LandingPage;