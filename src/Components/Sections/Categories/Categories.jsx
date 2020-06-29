import React from 'react';
import PropTypes from 'prop-types';

import './Categories.scss';

import Category from './../../Elements/Category/Category.jsx';

const Categories = (props) => {
  let categories = [];

  props.categories.forEach(category => {
    categories.push(
      <Category
        img={ category.img }
        style={{ ...props.style, ...category.style }}>
        
        { category.content }
      </Category>
    )
  })

  return (
    <div className="categories-container">
      { categories }
    </div>
  )
}

Categories.propTypes = {}

export default Categories;