import Button from './Button';

const Header = ({ title = 'Task Manager', onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? 'red' : 'lime'}
        fontColor={showAdd ? 'white' : 'black'}
        text={showAdd ? 'Close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};

export default Header;
