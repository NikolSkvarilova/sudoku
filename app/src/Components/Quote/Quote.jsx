import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Quote.scss'

const Quote = (props) => {
  let textStyles = {
    'color': !! props.text_color ? props.text_color : 'black' 
  }

  let authorStyles = {
    'color': !! props.author_color ? props.author_color : 'gray'
  }

  let lineStyles = {
    'background': !! props.line_color ? props.line_color : 'red' 
  }

  return (
    <div className="quote-container">
      <figure className="figure-container">
        <blockquote className="quote-text" style={textStyles}>
          "{props.text}"
        </blockquote>

        <figcaption className="quote-author" style={authorStyles}>
          –⁠ {props.author ? props.author : "N/A"}
        </figcaption>
      </figure>
      {props.line ? <div className="rectangle" style={lineStyles}></div> : ""}
    </div>
  )
}

Quote.propTypes = {
  text:         PropTypes.string.isRequired,
  author:       PropTypes.string,
  line:         PropTypes.bool,
  line_color:   PropTypes.string,
  text_color:   PropTypes.string,
  author_color: PropTypes.string
}

export default Quote
