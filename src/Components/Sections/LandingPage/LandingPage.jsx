import React from 'react';
import PropTypes from 'prop-types';
import './LandingPage.scss';

import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';

const LandingPage = (props) => {
  let bgStyles = {
    backgroundColor: !! props.bg_color ? props.bg_color : 'white',
    background: !! props.bg_img ? `url(${props.bg_img})` : 'white'
  }

  let subTextStyles = {
    color: !! props.sub_text_color ? props.sub_text_color : 'gray'
  }

  let iconStyles = {
    backgroundColor: !! props.btn_bg_color && props.btn_bg_color, 
    boxShadow: !! props.btn_shadow ? props.btn_shadow : "0px 0px 55px -2px rgba(0,0,0,0.63)"
  }

  let icon;

  if (props.icon) {
    icon = <IconButton style={ iconStyles } href={ `#${ props.link }` }>
      <KeyboardArrowDown fontSize="large" style={{ color: !! props.arrow_color ? props.arrow_color : "black" }} />
    </IconButton>
  }

  let scrollDown_container;

  if (props.icon || props.sub_text) {
    scrollDown_container = 
    <div className="scroll-down_container">
      { !! props.sub_text && <p className="sub_text" style={subTextStyles}>{props.sub_text}</p> }
      { icon }
    </div>
  }

  return (
    <div className="landing_page_container" style={bgStyles}>
      <div className="text-section">
        { props.children }
      </div>
      
      { scrollDown_container }
    </div>
  )
}

LandingPage.propTypes = {
  bg_img:             PropTypes.node,
  bg_color:           PropTypes.string,
  sub_text:           PropTypes.string,
  sub_text_color:     PropTypes.string,
  icon:               PropTypes.bool,
  btn_bg_color:       PropTypes.string,
  arrow_color:        PropTypes.string,
  link:               PropTypes.string
}

export default LandingPage;