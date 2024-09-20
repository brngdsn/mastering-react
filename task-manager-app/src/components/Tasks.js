import React, { useContext, useMemo } from 'react';
import TaskContext from '../context/TaskContext';
import Task from './Task';

const Tasks = () => {
  const { tasks } = useContext(TaskContext);

  const sortedTasks = useMemo(() => {
    return tasks.sort((a, b) => a.day.localeCompare(b.day));
  }, [tasks]);

  return (
    <>
      {!sortedTasks.length && 'No tasks to show.'}
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </>
  );
};

export default Tasks;
