import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import Task from './Task';

const Tasks = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <>
      {!tasks.length && 'No tasks to show.'}
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </>
  );
};

export default Tasks;
