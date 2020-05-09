import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Quote.scss'

export class Quote extends Component {
  render() {
    return (
      <div className="quote-container">
        <figure className="figure-container">
          <blockquote className="quote-text">
            "{this.props.text}"
          </blockquote>

          <figcaption className="quote-author">
            –⁠ {this.props.author ? this.props.author : "N/A"}
          </figcaption>
        </figure>
        <div className="rectangle"></div>
      </div>
    )
  }
}

Quote.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string
}

export default Quote
