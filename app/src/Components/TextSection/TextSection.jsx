import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {
  let title = <h1 className="text_section_title">{props.title}</h1>;
  if (props.sub_title) {
    title += <h2 className="text_section_subtitle">{props.sub_title}</h2>;
  }

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
        <div className="img_half">
          <img src={props.img}></img>
        </div>
      </div>
    </div>
  )

}

TextSection.propTypes = {
  title: PropTypes.string.isRequired,
  sub_title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.node,
  line: PropTypes.bool
}

export default TextSection;