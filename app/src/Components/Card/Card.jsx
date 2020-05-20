import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Card.scss'

const Card = (props) => {
  let cardStyles = {
    'background': !! props.bg_color ? props.bg_color : '#3D3D3D'
  };
  let imgStyles = {
    'background': !! props.img ? props.img : 'linear-gradient(to right bottom, #24FFFF, #ED1DFF)'
  };
  let textStyles = {
    'color': !! props.txt_color ? props.txt_color : 'white'
  };
  let btnStyles = {
    'background': !! props.btn_bg_color ? props.btn_bg_color : '#EB4034',
    'color': !! props.btn_txt_color ? props.btn_txt_color : 'black'
  };

  return (
    <div className="card-container" style={cardStyles}>
      <div className="card-img-section" style={imgStyles}></div>

      <div className="card-text-section" style={textStyles}>
        <h2 className="card-heading">{props.heading}</h2>
        <p className="card-text">{props.sub_text}</p>
      </div>
      <button className="card-btn" style={btnStyles}>{props.btn_text ? props.btn_text : "Take me there!"}</button>
    </div>
  )
}

Card.propTypes = {
  heading:        PropTypes.string.isRequired,
  sub_text:       PropTypes.string.isRequired,
  btn_text:       PropTypes.string,
  bg_color:       PropTypes.string,
  txt_color:      PropTypes.string,
  img:            PropTypes.string,
  btn_bg_color:   PropTypes.string,
  btn_txt_color:  PropTypes.string,
}

export default Card
