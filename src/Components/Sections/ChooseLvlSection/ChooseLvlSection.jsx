import React from 'react';
import PropTypes from 'prop-types';

import './ChooseLvlSection.scss';

const ChooseLvlSection = (props) => {

  let levels = [];

  props.levels.forEach(level => {
    levels.push(
      <a href={ `${ props.goTo }/${ level.linkValue }` }>
        <div className="button" style={ props.btnStyle }>
          { level.name } 
        </div>
      </a> 
    )
  })

  return (
    <div className="container" style={ props.sectionStyle }>
      <h1>Choose your level!</h1>
      <div className="levels-container">
        { levels }
      </div>
    </div>
  )
}

ChooseLvlSection.propTypes = {
  levels:         PropTypes.array.isRequired,
  goTo:           PropTypes.string,
  sectionStyle:   PropTypes.object,
  btnStyle:       PropTypes.object
}

export default ChooseLvlSection;