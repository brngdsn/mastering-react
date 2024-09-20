// src/context/TaskProvider.js
import React, { useState, useEffect } from 'react';
import TaskContext from './TaskContext';

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks (optional, or use initial state)
  useEffect(() => {
    const fetchTasks = async () => {
      // Fetch tasks from an API or local storage
      setTasks([
        {
          id: 1,
          text: 'Doctor Appointment',
          day: 'Feb 5th at 2:30pm',
          reminder: true,
        },
        {
          id: 2,
          text: 'Meeting at School',
          day: 'Feb 6th at 1:30pm',
          reminder: true,
        },
        {
          id: 3,
          text: 'Grocery Shopping',
          day: 'Feb 7th at 12:00pm',
          reminder: false,
        },
      ]);
    };

    fetchTasks();
  }, []);

  // Define the context value
  const value = {
    tasks,
    addTask: (task) => {
      const id = Math.floor(Math.random() * 10000) + 1;
      const newTask = { id, ...task };
      setTasks([...tasks, newTask]);
    },
    deleteTask: (id) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    toggleReminder: (id) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: !task.reminder } : task
        )
      );
    },
  };

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
