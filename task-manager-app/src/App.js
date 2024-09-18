import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
  const title = 'My Task Manager';
  const tasks = [
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
    },
  ];
  return (
    <div className="App">
      <Header title={title} />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
