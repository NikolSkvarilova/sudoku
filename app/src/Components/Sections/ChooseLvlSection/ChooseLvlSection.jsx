import React from 'react';
import PropTypes from 'prop-types';

const ChooseLvlSection = (props) => {

  let levels = [];

  props.levels.forEach(level => {
    levels.push(
      <button title={!! level.description ? level.description : ""} onClick={level.onClick}>
        <a href={`${props.goTo}/${level.linkValue}`}>
          {level.name} 
        </a> 
      </button>
    )
  })

  return (
    <div>
      {levels}
    </div>
  )
}

ChooseLvlSection.propTypes = {}

export default ChooseLvlSection;