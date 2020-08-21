import React from 'react';
import PropTypes from 'prop-types';

import './ChooseLvlSection.scss';

import Button from './../../Elements/Button/Button.jsx'

const ChooseLvlSection = (props) => {

  let levels = [];

  props.levels.forEach(level => {
    levels.push(
      <Button 
        link={ `${ props.goTo }/${ level.linkValue }` } 
        borderColor={ props.borderColor }
        txtColor={ props.txtColor }
        margin="5px">

        { level.name }
      </Button>
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