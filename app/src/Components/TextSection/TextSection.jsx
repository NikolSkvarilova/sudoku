import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {
  return (
    <div className="text_section_container">
      <div className="text_section_wrapper">
        <div className="rectangle"></div>
        <div className="text_half">
          <h1 className="text_section_title">{props.title}</h1>
          <h2 className="text_section_subtitle">{props.sub_title}</h2>
          <article className="text">
            {props.text}
          </article>
        </div>
        <img className="img_half" src={props.img} alt={props.alt}></img>
      </div>
    </div>
  )

}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  sub_title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.node,
  alt: PropTypes.string
}

export default TextSection;