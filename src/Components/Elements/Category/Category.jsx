import React from 'react';
import PropTypes from 'prop-types';
import './Category.scss';

const Category = (props) => { 

  return (
    <div className="category-container" style={ props.style }>
      <img src={ props.img } alt="image"/>
      { props.children }
    </div>
  )
}

Category.propTypes = {
  img:        PropTypes.string,
  children:   PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.node),
                PropTypes.node
              ]).isRequired
}

export default Category;
