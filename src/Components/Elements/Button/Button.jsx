import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

class Button extends React.Component { 
  constructor(props) {
    super(props);
  }

  buildButton(styles) {
    let className = "button"

    if ( this.props.class ) {
      className += " " + this.props.class
    }

    let button = <div 
      className={ className }
      style={ styles } 
      {... !! this.props.onClick && { onClick: this.props.onClick } }>
        
        { this.props.children }
    </div>

    if ( this.props.link ) {
      return (
        <a href={ this.props.link }>
          { button }
        </a>
      );
    } else {
      return button;
    }
  }
  
  render() {
    let btnStyles = {
      borderColor:  !! this.props.borderColor  ? this.props.borderColor : "black",
      color:        !! this.props.txtColor     ? this.props.txtColor    : "black",
      margin:       !! this.props.margin       && this.props.margin      
    }

    return(
      this.buildButton(btnStyles)
    );
  }
}

export default Button;
