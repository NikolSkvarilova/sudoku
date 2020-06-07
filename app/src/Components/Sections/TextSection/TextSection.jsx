import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {

  const checkImgMobileAlignment = (img_align, img_align_mobile) => {
    if (img_align_mobile == null) {
      if (img_align === "left") {
        return "top";
      } else {
        return "bot";
      }
    }

    return img_align_mobile;
  };

  
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
   
  // Styles of the line next to paragraph
  let lineStyles = {
    'background': !! props.line_color ? props.line_color : ""
  };

  let imgPositionClass = "";
  if (props.img_position === "to_edge" &&  props.img_align === "left") {
    imgPositionClass = "to_edge_left_full_screen_mobile"
  } else if (props.img_position === "to_edge" &&  props.img_align != "left") {
    imgPositionClass = "to_edge_right_full_screen_mobile"
  } else {
    imgPositionClass = "img_center"
  }

  let textPadding = "";
  if (props.img_align === "left") {
    textPadding = "img_on_the_left_from_text"
  } else {
    textPadding = "img_on_the_right_from_text"
  }

  let imgSizeMobile = "";
  if (!! props.img_full_width_mobile) {
    imgSizeMobile = "img_full_width_mobile"
  } else {
    imgSizeMobile = "img_regular_width_mobile"
  }

  return (
    <div 
      id={props.section_link} 
      className={`text_section_container ${props.img_align} ${checkImgMobileAlignment(props.img_align, props.img_align_mobile)}`}>

      <div className="text_half_container">
        <div className={`text_half_wrapper ${textPadding}`}>
          {/* Rectangle thingy */}
          {!! props.line_color ? <div className="rectangle" style={lineStyles}></div> : ""}

          <div className="text_half">
            {/* Main Title */}
            {!! props.title ? <h1 className="text_section_title" style={titleStyles}>{props.title}</h1> : ""}

            {/* Subtitle */}
            {!! props.sub_title ? <h2 className="text_section_subtitle" style={subTitleStyles}>{props.sub_title}</h2> : ""}

            {/* Text */}
            <article className="text" style={textStyles}>
            {props.children}
            </article>
          </div>
        </div>        
      </div>
    
        <div className={`img_half_container ${imgPositionClass}`}>
          <img 
            className={`img_half ${imgSizeMobile}`}
            src={props.img} 
            alt={props.alt}>
          </img>
        </div> 
    </div>
  );
}

TextSection.propTypes = {
  title:                  PropTypes.string,
  sub_title:              PropTypes.string,
  text:                   PropTypes.string.isRequired,
  title_color:            PropTypes.string,
  sub_title_color:        PropTypes.string,
  txt_color:              PropTypes.string,
  img:                    PropTypes.node.isRequired,
  alt:                    PropTypes.string,
  line_color:             PropTypes.string, // If the color is not entered, the line is not rendered!
  img_align:              PropTypes.string, // The image is on the left/right from the text; values: 'left', 'right'; default: 'right'
  img_align_mobile:       PropTypes.string, // The image is on above/below the text; values: 'top', 'bot'; default: 'top'
  img_position:           PropTypes.string, // Values: 'to_edge' 
  img_full_width_mobile:  PropTypes.bool    // On the phone small-desktop screen and smaller, should the image be full-screen or not
}

export default TextSection;