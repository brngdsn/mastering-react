import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTaskForm from './components/AddTaskForm';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              {showAddTask && <AddTaskForm />}
              <Tasks />
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
