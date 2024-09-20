import React, { useContext, useCallback } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import TaskContext from '../context/TaskContext';

const Task = ({ task }) => {
  const { deleteTask, toggleReminder } = useContext(TaskContext);

  const onToggle = useCallback((id) => {
    return toggleReminder(id);
  }, [toggleReminder]);

  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{' '}
        <FaRegTrashAlt
          style={{ color: 'red', cursor: 'pointer', fontSize: '0.5em' }}
          onClick={() => deleteTask(task.id)}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
