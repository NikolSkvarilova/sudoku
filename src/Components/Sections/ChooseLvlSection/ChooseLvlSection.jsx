import React from 'react';
import PropTypes from 'prop-types';

import './ChooseLvlSection.scss'

const ChooseLvlSection = (props) => {

  let bgStyles = {
    'background': !! props.bg ? props.bg : 'pink'
  };

  // let btnStyles = {
  //   'background': !! props.btn_bg ? props.btn_bg : "white"  
  // }

  let levels = [];

  props.levels.forEach(level => {
    levels.push(
      <a href={`${props.goTo}/${level.linkValue}`}>
        <div className="button">
          {level.name} 
        </div>
      </a> 
    )
  })

  return (
    <div className="container" style={ bgStyles }>
      {levels}
    </div>
  )
}

ChooseLvlSection.propTypes = {}

export default ChooseLvlSection;