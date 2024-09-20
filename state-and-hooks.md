**Title:** State Management and Hooks in React

---

**[Opening Scene]**

*Welcome back to the "Mastering React" series! In this third video, we'll explore the crucial concepts of state management and hooks in React. By the end of this lesson, you'll be able to make your Task Manager App interactive by adding, deleting, and toggling tasks using state and hooks.*

---

### **1. Understanding State in React**

**- Difference Between Props and State**

- **Props:**
  - Short for "properties."
  - Read-only data passed from parent to child components.
  - Immutable within the child component.
- **State:**
  - Data managed within a component.
  - Mutable and can change over time.
  - Triggers re-rendering of the component when updated.

**- Why State is Important**

- **Interactivity:** Allows components to respond to user input and events.
- **Dynamic UI:** Enables the UI to update dynamically based on state changes.
- **Data Flow:** Facilitates the flow of data within the app.

---

### **2. Introduction to React Hooks**

**- What Are Hooks?**

- **Definition:** Hooks are special functions introduced in React 16.8 that let you "hook into" React features like state and lifecycle methods from functional components.
- **Benefits:**
  - **Simplification:** Allows the use of state and other React features without writing class components.
  - **Code Reusability:** Makes it easier to share logic between components.
  - **Better Organization:** Keeps related logic closely bundled.

**- Commonly Used Hooks**

- **useState:** Manages state in functional components.
- **useEffect:** Performs side effects in functional components.
- **useContext:** Consumes context in functional components.

---

### **3. Using the `useState` Hook**

**- Syntax and Usage**

```jsx
const [stateVariable, setStateFunction] = useState(initialValue);
```

- **stateVariable:** The current state value.
- **setStateFunction:** Function to update the state.
- **initialValue:** The initial state value.

**- Adding State to the App Component**

1. **Import `useState`:**

   ```jsx
   import React, { useState } from 'react';
   ```

2. **Initialize State for Tasks:**

   ```jsx
   const [tasks, setTasks] = useState([
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
   ```

**- Updating State**

- **Adding a Task:**

  ```jsx
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };
  ```

- **Deleting a Task:**

  ```jsx
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  ```

- **Toggling a Reminder:**

  ```jsx
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  ```

---

### **4. Using the `useEffect` Hook**

**- What is `useEffect`?**

- **Definition:** The `useEffect` hook lets you perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
- **Lifecycle Equivalence:**
  - `componentDidMount`
  - `componentDidUpdate`
  - `componentWillUnmount`

**- Syntax**

```jsx
useEffect(() => {
  // Side effect logic here
}, [dependencies]);
```

- **Dependencies Array:**
  - Determines when the effect runs.
  - If empty `[]`, runs once after the initial render.
  - If omitted, runs after every render.

**- Fetching Data with `useEffect` (Optional Advanced Topic)**

- **Example:**

  ```jsx
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);
  ```

---

### **5. Implementing State and Hooks in the Task Manager App**

**- Updating the App Component**

1. **Add State and Functions:**

   ```jsx
   // src/App.js
   import React, { useState } from 'react';
   import Header from './components/Header';
   import Tasks from './components/Tasks';
   import AddTaskForm from './components/AddTaskForm';

   function App() {
     // Existing state and functions here...

     // Show/Hide Add Task Form
     const [showAddTask, setShowAddTask] = useState(false);

     return (
       <div className="container">
         <Header
           onAdd={() => setShowAddTask(!showAddTask)}
           showAdd={showAddTask}
         />
         {showAddTask && <AddTaskForm onAdd={addTask} />}
         {tasks.length > 0 ? (
           <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
         ) : (
           'No Tasks To Show'
         )}
       </div>
     );
   }

   export default App;
   ```

2. **Create the `AddTaskForm` Component**

   - **AddTaskForm.js**

     ```jsx
     // src/components/AddTaskForm.js
     import React, { useState } from 'react';

     const AddTaskForm = ({ onAdd }) => {
       const [text, setText] = useState('');
       const [day, setDay] = useState('');
       const [reminder, setReminder] = useState(false);

       const onSubmit = (e) => {
         e.preventDefault();

         if (!text) {
           alert('Please add a task');
           return;
         }

         onAdd({ text, day, reminder });

         setText('');
         setDay('');
         setReminder(false);
       };

       return (
         <form className="add-form" onSubmit={onSubmit}>
           <div className="form-control">
             <label>Task</label>
             <input
               type="text"
               placeholder="Add Task"
               value={text}
               onChange={(e) => setText(e.target.value)}
             />
           </div>
           <div className="form-control">
             <label>Day & Time</label>
             <input
               type="text"
               placeholder="Add Day & Time"
               value={day}
               onChange={(e) => setDay(e.target.value)}
             />
           </div>
           <div className="form-control form-control-check">
             <label>Set Reminder</label>
             <input
               type="checkbox"
               checked={reminder}
               value={reminder}
               onChange={(e) => setReminder(e.currentTarget.checked)}
             />
           </div>

           <input type="submit" value="Save Task" className="btn btn-block" />
         </form>
       );
     };

     export default AddTaskForm;
     ```

3. **Update the Header Component**

   - **Header.js**

     ```jsx
     // src/components/Header.js
     import PropTypes from 'prop-types';
     import Button from './Button';

     const Header = ({ title, onAdd, showAdd }) => {
       return (
         <header className="header">
           <h1>{title}</h1>
           <Button
             color={showAdd ? 'red' : 'green'}
             text={showAdd ? 'Close' : 'Add'}
             onClick={onAdd}
           />
         </header>
       );
     };

     Header.defaultProps = {
       title: 'Task Manager',
     };

     Header.propTypes = {
       title: PropTypes.string.isRequired,
       onAdd: PropTypes.func.isRequired,
       showAdd: PropTypes.bool.isRequired,
     };

     export default Header;
     ```

4. **Modify the Tasks and Task Components**

   - **Tasks.js**

     ```jsx
     // src/components/Tasks.js
     import Task from './Task';

     const Tasks = ({ tasks, onDelete, onToggle }) => {
       return (
         <>
           {tasks.map((task) => (
             <Task
               key={task.id}
               task={task}
               onDelete={onDelete}
               onToggle={onToggle}
             />
           ))}
         </>
       );
     };

     export default Tasks;
     ```

   - **Task.js**

     ```jsx
     // src/components/Task.js
     import { FaTimes } from 'react-icons/fa';

     const Task = ({ task, onDelete, onToggle }) => {
       return (
         <div
           className={`task ${task.reminder ? 'reminder' : ''}`}
           onDoubleClick={() => onToggle(task.id)}
         >
           <h3>
             {task.text}{' '}
             <FaTimes
               style={{ color: 'red', cursor: 'pointer' }}
               onClick={() => onDelete(task.id)}
             />
           </h3>
           <p>{task.day}</p>
         </div>
       );
     };

     export default Task;
     ```

   - **Notes:**
     - The `FaTimes` icon is from the `react-icons` library.
     - Install it using `npm install react-icons`.

5. **Add CSS Styling**

   - **App.css**

     ```css
     /* src/App.css */
     .container {
       max-width: 500px;
       margin: auto;
       padding: 20px;
     }

     .header {
       display: flex;
       justify-content: space-between;
       align-items: center;
     }

     .btn {
       background-color: steelblue;
       color: #fff;
       border: none;
       padding: 10px;
       cursor: pointer;
     }

     .btn-block {
       display: block;
       width: 100%;
     }

     .task {
       background: #f4f4f4;
       margin: 10px 0;
       padding: 10px;
       border-left: 5px solid #ccc;
       cursor: pointer;
     }

     .task.reminder {
       border-left: 5px solid green;
     }

     .add-form {
       margin-bottom: 40px;
     }

     .form-control {
       margin-bottom: 10px;
     }

     .form-control-check {
       display: flex;
       align-items: center;
     }
     ```

---

### **6. Lifecycle of Components**

**- Component Lifecycle Phases**

- **Mounting:**
  - When the component is being inserted into the DOM.
  - Corresponds to the initial render.
- **Updating:**
  - When the component's state or props change.
  - Causes a re-render to update the UI.
- **Unmounting:**
  - When the component is being removed from the DOM.
  - Cleanup operations can be performed here.

**- Using `useEffect` for Lifecycle Methods**

- **Component Did Mount Equivalent:**

  ```jsx
  useEffect(() => {
    // Code to run on component mount
  }, []);
  ```

- **Component Did Update Equivalent:**

  ```jsx
  useEffect(() => {
    // Code to run on state or prop change
  }, [dependencies]);
  ```

- **Component Will Unmount Equivalent:**

  ```jsx
  useEffect(() => {
    // Setup code

    return () => {
      // Cleanup code
    };
  }, []);
  ```

---

### **7. Testing the Application**

**- Running the App**

- Start the development server:

  ```bash
  npm start
  ```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

**- Interacting with the App**

- **Add Tasks:**
  - Click the "Add" button to show the add task form.
  - Fill in the task details and click "Save Task."
- **Delete Tasks:**
  - Click the red "X" icon next to a task to delete it.
- **Toggle Reminder:**
  - Double-click on a task to toggle the reminder.

**- Verifying State Changes**

- Use React Developer Tools to inspect state changes.
- Ensure that the UI updates correspond to the state.

---

### **8. Recap and What's Next**

**- What We Covered Today**

- **State Management:**
  - Used `useState` to manage tasks and show/hide form.
- **React Hooks:**
  - Leveraged `useState` and `useEffect` hooks.
- **Component Lifecycle:**
  - Understood how `useEffect` relates to lifecycle methods.
- **Interactivity:**
  - Implemented adding, deleting, and toggling tasks.

**- Sneak Peek into the Next Video**

- **Advanced Concepts:**
  - We'll delve into the Context API for global state management.
  - Introduce React Router for navigation between different pages.
- **Enhancing the App:**
  - Implement global themes or user authentication (if applicable).
  - Add multiple pages like About or Settings.

---

**[Closing Scene]**

*Congratulations! You've transformed your static Task Manager App into an interactive application using state and hooks. In the next video, we'll explore advanced concepts like the Context API and routing to take your app to the next level. Don't forget to like, share, and subscribe to stay updated. See you soon!*

---

### **Additional Resources**

- **React Hooks Documentation:** [Using the State Hook](https://reactjs.org/docs/hooks-state.html)
- **Understanding `useEffect`:** [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html)
- **React Component Lifecycle:** [Component Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

---

### **Call to Action**

- **Subscribe:** Stay tuned for more insightful tutorials.
- **Comments:** Have questions or feedback? Drop them below!
- **Share:** If this video helped you, please share it with others.

---

**End Screen:**

*Thanks for watching! Up next: "Advanced Concepts – Context API and Routing".*