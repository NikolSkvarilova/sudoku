import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LandingPage.scss';

export class LandingPage extends Component {
  render() {
    return (
      <div className="landing_page_container">
        <h1 className="main_title">{this.props.main_title}</h1>
        
        <div className="scroll-down_container">
          <p className="sub_text">{this.props.sub_text}</p>
          {/* Scroll Button */}
        </div>
      </div>
    )
  }
}

LandingPage.propTypes = {
  main_title: PropTypes.string.isRequired,
  sub_text: PropTypes.string
}

export default LandingPage;