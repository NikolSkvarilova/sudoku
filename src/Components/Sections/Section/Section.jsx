import React from 'react';
import './Section.scss';

const Section = (props) => {
  let sectionStyles = {
    width:          !! props.width          ? props.width           : "100vw",
    justifyContent: !! props.justifyContent ? props.justifyContent  : "center",   // horizontally
    background:     !! props.bg             ? props.bg              : "none",
    padding:        !! props.padding        ? props.padding         : "60px 0",
    flexDirection:  !! props.flexDirection  ? props.flexDirection   : "column"
  }

  return (
    <div className="section-container" id={ props.sectionLink } style={ sectionStyles }>
      { props.children }
    </div>
  )
}

export default Section;
