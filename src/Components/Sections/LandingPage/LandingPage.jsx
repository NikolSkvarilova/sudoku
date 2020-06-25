import React from 'react';
import PropTypes from 'prop-types';
import './LandingPage.scss';

import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';

const LandingPage = (props) => {
  let bgStyles = {
    'backgroundColor': !! props.bg_color ? props.bg_color : 'white',
    'background': !! props.bg_img ? `url(${props.bg_img})` : 'white'
  }

  let titleStyles = {
    'color': !! props.title_color ? props.title_color : 'black'
  }

  let subTextStyles = {
    'color': !! props.sub_text_color ? props.sub_text_color : 'gray'
  }

  return (
    <div className="landing_page_container" style={bgStyles}>
      <div className="text-section">
        { props.children }
      </div>
      {/* <h1 className="main_title" style={titleStyles}>{props.main_title}</h1> */}
      <div className="scroll-down_container">
        <p className="sub_text" style={subTextStyles}>{props.sub_text}</p>
        <IconButton 
          className="icon-tittle" 
          style={
            {
              backgroundColor: props.btn_bg_color, 
              boxShadow: "0px 0px 55px -2px rgba(0,0,0,0.63)"
            }
          } 
          href={`#${props.link}`}>
          <KeyboardArrowDown fontSize="large" style={{color: !! props.arrow_color ? props.arrow_color : "black" }} href={`#${props.link}`} />
        </IconButton>
      </div>
    </div>
  )
}

LandingPage.propTypes = {
  main_title:     PropTypes.string.isRequired,
  sub_text:       PropTypes.string,
  bg_img:         PropTypes.node,
  title_color:    PropTypes.string,
  sub_text_color: PropTypes.string,
  bg_color:       PropTypes.string,
}

export default LandingPage;