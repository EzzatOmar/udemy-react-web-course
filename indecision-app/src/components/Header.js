import React from "react";

// stateless functional component
const Header = (props) => (
    <div className='header'>
      <div className='container'>
        <h1 className='header__title'>{props.title}</h1>
        <h2 className='header__subtitle'>{props.subTitle}</h2>
      </div>
      </div>
);

Header.defaultProps = {
 title: "Title"
}

export default Header;