import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {
  let titleStyles = {
    'color': !! props.title_color ? props.title_color : 'black'
  };
  let subTitleStyles = {
    'color': !! props.sub_title_color ? props.sub_title_color : 'gray'
  };
  let textStyles = {
    'color': !! props.text_color ? props.text_color : 'black'
  };
  let lineStyles = {
    'background': !! props.line_color ? props.line_color : "gray"
  };


  return (
    <div className="text_section_container">
      <div className="text_section_wrapper">
        {props.line_color ? <div className="rectangle" style={lineStyles}></div> : ""}

        <div className="text_half">
          <h1 className="text_section_title" style={titleStyles}>{props.title}</h1>
          <h2 className="text_section_subtitle" style={subTitleStyles}>{props.sub_title}</h2>
          <article className="text" style={textStyles}>
            {props.text}
          </article>
        </div>
        <img className="img_half" src={props.img} alt={props.alt}></img>
      </div>
    </div>
  )
}

TextSection.propTypes = {
  title:            PropTypes.string.isRequired,
  sub_title:        PropTypes.string,
  text:             PropTypes.string.isRequired,
  title_color:      PropTypes.string,
  sub_title_color:  PropTypes.string,
  text_color:       PropTypes.string,
  img:              PropTypes.node,
  alt:              PropTypes.string,
  line_color:       PropTypes.string,
}

export default TextSection;