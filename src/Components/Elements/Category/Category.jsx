import React from 'react'
import PropTypes from 'prop-types';
import './Category.scss'

const Category = (props) => { 

  return (
    <div className="category-container" style={ props.style }>
      <img src={ props.img } alt="image"/>
      { props.children }
    </div>
  )
}

Category.propTypes = { }

export default Category;
