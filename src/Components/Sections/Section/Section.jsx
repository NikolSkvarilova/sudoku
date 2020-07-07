import React from 'react';
import './Section.scss';

const Section = (props) => {
  let sectionStyles = {
    width:          !! props.width          ? props.width           : "100%",
    justifyContent: !! props.justifyContent ? props.justifyContent  : "center",   // horizontally
    background:     !! props.bg             ? props.bg              : "none",
    padding:        !! props.padding        ? props.padding         : "60px 0",
    flexDirection:  !! props.flexDirection  ? props.flexDirection   : "column",
    height:         !! props.height         ? props.height          : "auto",
    alignItems:     !! props.alignItems     ? props.alignItems      : ""
  }

  return (
    <div className="section-container" id={ props.sectionLink } style={ sectionStyles }>
      { props.children }
    </div>
  )
}

export default Section;
