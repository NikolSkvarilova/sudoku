import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Card.scss'

const Card = (props) => {
  return (
    <div className="card-container">
      <div className="card-img-section"></div>

      <div className="card-text-section">
        <h2 className="card-heading">{props.heading}</h2>
        <p className="card-text">{props.sub_text}</p>
      </div>
      <button className="card-btn">{props.btn_text ? props.btn_text : "Take me there!"}</button>
    </div>
  )
}

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  sub_text: PropTypes.string.isRequired,
  btn_text: PropTypes.string
}

export default Card
