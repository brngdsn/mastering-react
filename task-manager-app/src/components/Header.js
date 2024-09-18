// Header.js
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import './Header.css';

const userName = 'John Doe';

const Greeting = () => {
  return <p>Hello, {userName}!</p>;
};

const Header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <Greeting />
      <Button color="green" text="Add Task" />
    </header>
  );
};

Header.defaultProps = {
    title: 'Default Task Manager',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
