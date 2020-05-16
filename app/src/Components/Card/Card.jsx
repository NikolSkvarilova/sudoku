import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Card.scss'

export class Card extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="card-img-section"></div>

        <div className="card-text-section">
          <h2 className="card-heading">{this.props.heading}</h2>
          <p className="card-text">{this.props.sub_text}</p>
        </div>
        <button className="card-btn">{this.props.btn_text ? this.props.btn_text : "Take me there!"}</button>
      </div>
    )
  }
}

Card.propTypes = {
  heading: PropTypes.string.isRequired,
  sub_text: PropTypes.string.isRequired,
  btn_text: PropTypes.string
}

export default Card
