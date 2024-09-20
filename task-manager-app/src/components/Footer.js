import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <p>© 2024 Task Manager App</p>
      <Link to="/">Home</Link>&nbsp;|&nbsp;
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;