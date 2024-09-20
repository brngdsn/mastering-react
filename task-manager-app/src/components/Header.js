import React from 'react';
import Button from './Button';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Header = ({ title = 'Task Manager', onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAdd ? 'red' : 'lime'}
          fontColor={showAdd ? 'white' : 'black'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default React.memo(Header);
