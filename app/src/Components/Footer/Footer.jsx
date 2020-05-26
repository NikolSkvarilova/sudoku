import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = (props) => {

  let bgStyles = {
    'background': props.bg ? props.bg : "#222"
  }

  let categoryStyles = {
    'color': props.category_txt_color ? props.category_txt_color : 'white'
  }

  let noteStyles = {
    'color': props.note_txt_color ? props.note_txt_color : 'white'
  }

  let subcategoryStyles = {
    'color': props.subcategory_txt_color ? props.subcategory_txt_color : 'white'
  }

  let categories = [];

  props.categories.forEach(category => {
    categories.push(
      // One section
      <section className="section">
        {/* Icon of the section */}
        {category.icon ? category.icon : ""}
        {/* Heading of the section */}
        <h2 className="section_title" style={categoryStyles}>{category.text}</h2>
        {/* Note for the section */}
        {category.note ? <p className="section_note" style={noteStyles}>{category.note}</p> : ""}
        
        {/* Sub-sections */}
        <ul className="list_of_subcategories">
          {category.sub_categories.map(sub_category => 
            <li><a className="subcategory" style={subcategoryStyles} href={sub_category.link}>{sub_category.text}</a></li>
          )}
        </ul>
      </section>
    )
  })

  return (
    <div className="footer_container" style={bgStyles}>
      {categories}
    </div>
  );
}

Footer.propTypes = {}

export default Footer;