import React from 'react';

const Button = ({ color, fontColor, text, onClick }) => {
  const styles = {
    backgroundColor: color,
    color: fontColor,
    fontSize: `25px`,
    borderRadius: '3px',
  };
  return <button
    style={styles}
    onClick={onClick}
    >
    {text}
  </button>;
};

export default Button;
