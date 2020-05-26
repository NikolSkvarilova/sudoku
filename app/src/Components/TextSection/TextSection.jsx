import React from 'react';
import PropTypes from 'prop-types';
import './TextSection.scss';

const TextSection = (props) => {

  const checkImgMobileAlignment = (img_align, img_align_mobile) => {
    // If the image is aligned to the left and the user wants it 
    // to be above the text on a mobile resolution, you must apply
    // the "bot" class, because the image is before the text so when 
    // 'flex-direction: column' is used, the img is automatically above the text.

    // Same for the image on the left and on mobile resolution aligned 
    // to the bottom, you must use 'flex-direction: column-reverse' - which is .top.

    // If you switch the definitions in the .top and .bot class, you must 
    // optimize it for the case where the picture is on the right from the text.

    if (!img_align_mobile) {
      return "top";
    }

    if (img_align === "left" && img_align_mobile === "top") {
      return "bot";

    } else if (img_align === "left" && img_align_mobile === "bot") {
      return "top";
    };

    return img_align_mobile;
  };


  const checkImgPositionStyle = (img_align, img_position) => {
    if (img_position == "to_edge" && img_align == "left") {
      return {
        'justifyContent': 'flex-start'
      };
    } else if (img_position == "to_edge" && img_align == "right") {
      return {
        'justifyContent': 'flex-end'
      };
    }
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

  // ---------------------------

  // Styles for the main wrapper
  let imgPositionStyle = checkImgPositionStyle(props.img_align, props.img_position);

  // Class for aligning the image on the mobile screen
  let imgAlignMobileClass = checkImgMobileAlignment(props.img_align, props.img_align_mobile);

  return (
    <div className={`text_section_container ${imgAlignMobileClass}`}>  
      {/* Image on the left */}
      {props.img_align == "left" ? 
        <div className={`img_half_container ${!! props.img_mobile_whole_size ? "full_page_width" : ""}`} style={imgPositionStyle} >
          <img 
            className={`img_half left ${!! props.img_mobile_whole_size ? "full_page_width" : ""}`} 
            src={props.img} alt={props.alt}>
          </img>
        </div> 
        : ""
      }
      
      <div className="text_half_container">
        <div className="text_half_wrapper">
          {/* Rectangle thingy */}
          {!! props.line_color ? <div className="rectangle" style={lineStyles}></div> : ""}

          <div className="text_half">
            {/* Main Title */}
            {!! props.title ? <h1 className="text_section_title" style={titleStyles}>{props.title}</h1> : ""}

            {/* Subtitle */}
            {!! props.sub_title ? <h2 className="text_section_subtitle" style={subTitleStyles}>{props.sub_title}</h2> : ""}

            {/* Text */}
            <article className="text" style={textStyles}>
              {props.text}
            </article>
          </div>
        </div>        
      </div>
      
      {/* Image on the right (default value) */}
      {props.img_align != "left" ? 
        <div className={`img_half_container ${!! props.img_mobile_whole_size ? "full_page_width" : ""}`} style={imgPositionStyle} >
          <img 
            className={`img_half right ${!! props.img_mobile_whole_size ? "full_page_width" : ""}`} 
            src={props.img} alt={props.alt}>
          </img>
        </div> 
        : ""
      }
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
  img_mobile_whole_size:  PropTypes.bool    // The Image is fullscrean on the mobile 
}

export default TextSection;