import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSection.scss';

const ButtonSection = (props) => {
  let bgStyles = {
    'background': !! props.bg ? props.bg : 'pink'
  };
  let btnStyles = {
    'color': !! props.btn_txt_color ? props.btn_txt_color : 'gray',
    'background': !! props.btn_bg_color ? props.btn_bg_color : 'black'  
  };
  return (
    <div className="button_section_container" style={bgStyles}>
      <button style={btnStyles} className="btn">{props.btn_txt}</button>
    </div>
  )
}

ButtonSection.propTypes = {
  // main_title:     PropTypes.string.isRequired,
  // sub_text:       PropTypes.string,
  // bg_img:         PropTypes.node,
  // title_color:    PropTypes.string,
  // sub_text_color: PropTypes.string,
  // bg_color:       PropTypes.string,
}

export default ButtonSection;