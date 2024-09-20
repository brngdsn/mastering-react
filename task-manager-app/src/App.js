import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';

function App() {
  const title = 'My Task Manager';
  const [showAddTask, setShowAddTask] = useState(false);
  
  return (
    <div className="App">
      <Header
        title={title}
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTaskForm />}
      <Tasks />
    </div>
  );
}

export default App;
