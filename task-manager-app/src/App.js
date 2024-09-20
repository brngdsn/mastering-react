import React, { useState, Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

const About = lazy(() => import('./components/About'));
const Footer = lazy(() => import('./components/Footer'));
const Header = lazy(() => import('./components/Header'));
const Tasks = lazy(() => import('./components/Tasks'));
const AddTaskForm = lazy(() => import('./components/AddTaskForm'));

function App() {
  const title = 'My Task Manager';
  const [showAddTask, setShowAddTask] = useState(false);
  
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
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
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
