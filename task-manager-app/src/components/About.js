import React from 'react';

const About = () => {
  return (
    <div>
      <h2>Task Manager App</h2>

      <p>A <strong>Personal Task Manager</strong>—a to-do list application that allows users to:</p>

      <ul>
        <li>Add New Tasks: Input task names and descriptions.</li>
        <li>View Task List: Display all tasks in a clean, organized manner.</li>
        <li>Mark Tasks as Complete or Incomplete: Toggle the status of each task.</li>
        <li>Delete Tasks: Remove tasks that are no longer needed.</li>
        <li>Navigate Between Pages: Use React Router to switch between different views within the app.</li>
      </ul>
      <p>Version 1.0.0</p>
      <img className="mini" src="task-man-v223.gif" alt="UI Gif"/>
    </div>
  );
};

export default About;
