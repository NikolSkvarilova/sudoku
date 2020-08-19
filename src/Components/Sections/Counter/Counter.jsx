import React from 'react';
import PropTypes from 'prop-types';
import './Counter.scss';

const Counter = (props) => {
  let noteStyles = {
    color:    !! props.noteColor    ? props.noteColor     : "black"
  }

  let counterStyles = {
    color:    !! props.counterColor ? props.counterColor  : "black"
  }

  return (
    <div className="counter-container">
      { !! props.upperTxt && <p className="counter-note counter-upperTxt" style={ noteStyles }>{ props.upperTxt }</p>}
      <p className="counter-num" style={ counterStyles }>{ props.number.toLocaleString() }</p>
      { !! props.bottomTxt && <p className="counter-note counter-bottomTxt" style={ noteStyles }>{ props.bottomTxt }</p>}
    </div>
  );
}

Counter.propTypes = {
    number:       PropTypes.string.isRequired,
    upperTxt:     PropTypes.string,
    bottomTxt:    PropTypes.string,
    noteColor:    PropTypes.string,
    counterColor: PropTypes.string
}

export default Counter;