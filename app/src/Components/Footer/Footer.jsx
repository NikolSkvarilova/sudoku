import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = (props) => {
  let categories = [];
  props.categories.forEach(category => {
    categories.push(
      <section className="section">
        <h2>{category.text}</h2>
        <ul>
          {category.sub_categories.map(sub_category => 
            <li className="sub_category"><a href={sub_category.link}>{sub_category.text}</a></li>
          )}
        </ul>
      </section>
    )
  })

  return (
    <div className="footer_container">
      {categories}
    </div>
  );
}

Footer.propTypes = {}

export default Footer;