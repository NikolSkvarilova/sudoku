import React from 'react';
import PropTypes from 'prop-types';
import './Quote.scss';

const Quote = (props) => {

  return (
    <div className="quote-container">
      <figure className="figure-container">
        <blockquote className="quote-text" style={ props.text_styles }>
          "{ props.text }"
        </blockquote>

        { !! props.author && 
          <figcaption className="quote-author" style={ props.author_styles }>
            –⁠ { props.author }
          </figcaption> 
        }
        
      </figure>
      { props.line_styles ? <div className="rectangle" style={ props.line_styles }></div> : "" }
    </div>
  )
}

Quote.propTypes = {
  text:               PropTypes.string.isRequired,
  author:             PropTypes.string,
  text_styles:        PropTypes.object,
  author_styles:      PropTypes.object,
  line_styles:        PropTypes.object
}

export default Quote;
