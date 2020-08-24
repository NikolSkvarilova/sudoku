import React from 'react';
import PropTypes from 'prop-types';

import './Categories.scss';

import Category from './../../Elements/Category/Category.jsx';

const Categories = (props) => {
  let categories = [];

  // If there should be only one category in one row, it will wrap others to be at least two categories in a row
  let atLeastTwo = false;
  let i = 0;
  let breakDiv = <div class="break"></div> 
  let numOfCategories = props.categories.length

  if (numOfCategories % 4 === 1) {
    atLeastTwo = true;
  }

  props.categories.forEach(category => {
    { !! atLeastTwo && i++}

    categories.push([
      <Category
        img={ category.img }
        style={{ ...props.style, ...category.style }}>
        
        { category.content }
      </Category>,

      i / 3 === 1 ? breakDiv : ""
    ])
  })

  return (
    <div className="categories-container">
      { categories }
    </div>
  )
}

Categories.propTypes = {
  categories:     PropTypes.array.isRequired,
  style:          PropTypes.object
}

export default Categories;