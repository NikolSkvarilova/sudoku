import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {
  
  // Styles of the main title
  let titleStyles = {
    'color': !! props.title_color ? props.title_color : 'black'
  };

  // Styles of the subtitle
  let subTitleStyles = {
    'color': !! props.sub_title_color ? props.sub_title_color : 'gray'
  };

  // Styles of the actual text
  let textStyles = {
    'color': !! props.txt_color ? props.txt_color : 'black',
  };
  
  // Styles of the line next to apragraph
  let lineStyles = {
    'background': !! props.line_color ? props.line_color : ""
  };

  let imgAlignMobileClass = props.img_align_mobile ? props.img_align_mobile : "top";

  if (props.img_align === "left" && props.img_align_mobile === "top") {
    imgAlignMobileClass = "bot";
  } else if (props.img_align === "left" && props.img_align_mobile === "bot") {
    imgAlignMobileClass = "top";
  }

  return (
    <div className="text_section_container">
      <div className={`text_section_wrapper ${imgAlignMobileClass}`}>
        {/* Image on the left */}
        {props.img_align == "left" ? <img className="img_half left" src={props.img} alt={props.alt}></img> : ""}

        <div className="text_half_wrapper">
          {/* Rectangle thingy */}
          {!! props.line_color ? <div className="rectangle" style={lineStyles}></div> : ""}

          <div className="text_half">
            {!! props.title ? <h1 className="text_section_title" style={titleStyles}>{props.title}</h1> : ""}
            {!! props.sub_title ? <h2 className="text_section_subtitle" style={subTitleStyles}>{props.sub_title}</h2> : ""}
            <article className="text" style={textStyles}>
              {props.text}
            </article>
          </div>
        </div>

        {/* Image on the right (also right is the default value) */}
        {props.img_align != "left" ? <img className="img_half right" src={props.img} alt={props.alt}></img> : ""}
      </div>
    </div>
  );
}

TextSection.propTypes = {
  title:            PropTypes.string,
  sub_title:        PropTypes.string,
  text:             PropTypes.string.isRequired,
  title_color:      PropTypes.string,
  sub_title_color:  PropTypes.string,
  txt_color:        PropTypes.string,
  img:              PropTypes.node.isRequired,
  alt:              PropTypes.string,
  line_color:       PropTypes.string, // If the color is not entered, the line is not rendered!
  img_align:        PropTypes.string, // The image is on the left/right from the text; values: 'left', 'right'; default: 'right'
  img_align_mobile: PropTypes.string, // The image is on above/below the text; values: 'top', 'bot'; default: 'top'
}

export default TextSection;