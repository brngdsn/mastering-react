**Title:** Advanced Concepts – Context API and Routing in React

---

**[Opening Scene]**

*Welcome back to the "Mastering React" series! In this fourth video, we'll delve into advanced concepts by exploring the Context API and React Router. By the end of this lesson, you'll enhance your Task Manager App with global state management and multi-page navigation.*

---

### **1. Understanding the Context API**

**- When and Why to Use Context**

- **Problem with Prop Drilling:**
  - Passing props through multiple layers of components to reach a deeply nested child can become cumbersome.
  - This is known as "prop drilling" and can make code hard to maintain.

- **Solution: Context API**
  - Allows you to share state globally without passing props through every level.
  - Ideal for global data like themes, user authentication, or language settings.

**- How the Context API Works**

- **Components:**
  - **Context Object:** Created using `React.createContext()`.
  - **Provider:** Wraps components that need access to the context and provides the data.
  - **Consumer:** Components that consume the context data.

---

### **2. Implementing Context in the Task Manager App**

**- Creating a Context for Tasks**

1. **Create a Context File**

   - Create a new folder called `context` inside `src`.
   - Inside the `context` folder, create `TaskContext.js`.

     ```jsx
     // src/context/TaskContext.js
     import { createContext } from 'react';

     const TaskContext = createContext();

     export default TaskContext;
     ```

2. **Create a Context Provider Component**

   - Inside the `context` folder, create `TaskProvider.js`.

     ```jsx
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
     ```

3. **Wrap Your App with the Provider**

   - In `index.js`, wrap the `App` component with `TaskProvider`.

     ```jsx
     // src/index.js
     import React from 'react';
     import ReactDOM from 'react-dom';
     import App from './App';
     import TaskProvider from './context/TaskProvider';

     ReactDOM.render(
       <React.StrictMode>
         <TaskProvider>
           <App />
         </TaskProvider>
       </React.StrictMode>,
       document.getElementById('root')
     );
     ```

**- Consuming Context in Components**

1. **Using `useContext` Hook**

   - **Import `useContext` and `TaskContext`:**

     ```jsx
     import React, { useContext } from 'react';
     import TaskContext from '../context/TaskContext';
     ```

   - **Modify Components to Use Context:**

     - **Tasks.js**

       ```jsx
       // src/components/Tasks.js
       import React, { useContext } from 'react';
       import TaskContext from '../context/TaskContext';
       import Task from './Task';

       const Tasks = () => {
         const { tasks } = useContext(TaskContext);

         return (
           <>
             {tasks.map((task) => (
               <Task key={task.id} task={task} />
             ))}
           </>
         );
       };

       export default Tasks;
       ```

     - **Task.js**

       ```jsx
       // src/components/Task.js
       import React, { useContext } from 'react';
       import { FaTimes } from 'react-icons/fa';
       import TaskContext from '../context/TaskContext';

       const Task = ({ task }) => {
         const { deleteTask, toggleReminder } = useContext(TaskContext);

         return (
           <div
             className={`task ${task.reminder ? 'reminder' : ''}`}
             onDoubleClick={() => toggleReminder(task.id)}
           >
             <h3>
               {task.text}{' '}
               <FaTimes
                 style={{ color: 'red', cursor: 'pointer' }}
                 onClick={() => deleteTask(task.id)}
               />
             </h3>
             <p>{task.day}</p>
           </div>
         );
       };

       export default Task;
       ```

     - **AddTaskForm.js**

       ```jsx
       // src/components/AddTaskForm.js
       import React, { useState, useContext } from 'react';
       import TaskContext from '../context/TaskContext';

       const AddTaskForm = () => {
         const { addTask } = useContext(TaskContext);
         const [text, setText] = useState('');
         const [day, setDay] = useState('');
         const [reminder, setReminder] = useState(false);

         const onSubmit = (e) => {
           e.preventDefault();
           if (!text) {
             alert('Please add a task');
             return;
           }
           addTask({ text, day, reminder });
           setText('');
           setDay('');
           setReminder(false);
         };

         return (
           // Form JSX as before
         );
       };

       export default AddTaskForm;
       ```

2. **Simplifying the App Component**

   - Since state and functions are now in the context, the `App` component can be simplified.

     ```jsx
     // src/App.js
     import React, { useState } from 'react';
     import Header from './components/Header';
     import Tasks from './components/Tasks';
     import AddTaskForm from './components/AddTaskForm';

     function App() {
       const [showAddTask, setShowAddTask] = useState(false);

       return (
         <div className="container">
           <Header
             onAdd={() => setShowAddTask(!showAddTask)}
             showAdd={showAddTask}
           />
           {showAddTask && <AddTaskForm />}
           <Tasks />
         </div>
       );
     }

     export default App;
     ```

---

### **3. Introducing React Router**

**- What is React Router?**

- **Definition:** A standard library for routing in React applications.
- **Purpose:**
  - Enables navigation between different components (pages) without reloading the page.
  - Keeps the UI in sync with the URL.

**- Setting Up React Router**

1. **Install React Router**

   ```bash
   npm install react-router-dom
   ```

2. **Import BrowserRouter**

   - Wrap your app with `BrowserRouter` in `index.js`.

     ```jsx
     // src/index.js
     import { BrowserRouter as Router } from 'react-router-dom';

     ReactDOM.render(
       <React.StrictMode>
         <TaskProvider>
           <Router>
             <App />
           </Router>
         </TaskProvider>
       </React.StrictMode>,
       document.getElementById('root')
     );
     ```

**- Defining Routes and Navigation**

1. **Create Additional Pages**

   - **About.js**

     ```jsx
     // src/components/About.js
     import React from 'react';

     const About = () => {
       return (
         <div>
           <h2>About This App</h2>
           <p>Version 1.0.0</p>
         </div>
       );
     };

     export default About;
     ```

2. **Set Up Routes in App Component**

   ```jsx
   // src/App.js
   import { Route, Routes } from 'react-router-dom';
   import About from './components/About';

   function App() {
     const [showAddTask, setShowAddTask] = useState(false);

     return (
       <div className="container">
         <Header
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
   ```

3. **Adding Navigation Links**

   - **Update Header Component**

     ```jsx
     // src/components/Header.js
     import { useLocation } from 'react-router-dom';
     import { Link } from 'react-router-dom';

     const Header = ({ title, onAdd, showAdd }) => {
       const location = useLocation();

       return (
         <header className="header">
           <h1>{title}</h1>
           {location.pathname === '/' && (
             <Button
               color={showAdd ? 'red' : 'green'}
               text={showAdd ? 'Close' : 'Add'}
               onClick={onAdd}
             />
           )}
           <nav>
             <Link to="/">Home</Link> | <Link to="/about">About</Link>
           </nav>
         </header>
       );
     };
     ```

**- Dynamic Routing and Route Parameters**

- **Example (Optional):**

  - If you want to have a detail page for each task.

    ```jsx
    // In App.js
    <Route path="/task/:id" element={<TaskDetails />} />

    // Create TaskDetails.js
    import { useParams } from 'react-router-dom';

    const TaskDetails = () => {
      const { id } = useParams();
      // Fetch task details using the id
      return (
        <div>
          <h2>Task Details</h2>
          {/* Display task details */}
        </div>
      );
    };

    export default TaskDetails;
    ```

---

### **4. Enhancing the Application with Routing**

**- Implementing a Footer with Links**

1. **Create Footer Component**

   ```jsx
   // src/components/Footer.js
   import { Link } from 'react-router-dom';

   const Footer = () => {
     return (
       <footer>
         <p>© 2023 Task Manager App</p>
         <Link to="/about">About</Link>
       </footer>
     );
   };

   export default Footer;
   ```

2. **Include Footer in App**

   ```jsx
   // src/App.js
   import Footer from './components/Footer';

   function App() {
     // ...existing code...

     return (
       <div className="container">
         {/* existing components */}
         <Footer />
       </div>
     );
   }
   ```

**- Conditional Rendering Based on Route**

- Use `useLocation` to conditionally render components based on the current route.

  ```jsx
  // In Header.js
  const location = useLocation();

  {location.pathname === '/' && (
    <Button
      color={showAdd ? 'red' : 'green'}
      text={showAdd ? 'Close' : 'Add'}
      onClick={onAdd}
    />
  )}
  ```

---

### **5. Styling the Navigation**

**- Adding CSS for Navigation**

- **Update App.css**

  ```css
  /* src/App.css */
  nav {
    margin-top: 20px;
  }

  nav a {
    margin-right: 10px;
    text-decoration: none;
    color: steelblue;
  }

  nav a:hover {
    text-decoration: underline;
  }

  footer {
    text-align: center;
    margin-top: 20px;
  }

  footer a {
    color: steelblue;
  }
  ```

---

### **6. Recap and What's Next**

**- What We Covered Today**

- **Context API:**
  - Eliminated prop drilling by using context for global state.
  - Implemented `TaskContext` and `TaskProvider`.
  - Consumed context in child components using `useContext`.

- **React Router:**
  - Set up routing using `react-router-dom`.
  - Defined routes for different pages (`Home`, `About`).
  - Implemented navigation links and dynamic routing.

- **Enhanced the App:**
  - Added an `About` page.
  - Improved user experience with multi-page navigation.

**- Sneak Peek into the Next Video**

- **Performance Optimization:**
  - We'll explore code splitting with `React.lazy` and `Suspense`.
  - Learn about memoization using `React.memo` and `useMemo`.

- **Deployment:**
  - Prepare your app for production.
  - Deploy it to a hosting service like Netlify or Vercel.

---

**[Closing Scene]**

*Awesome work! You've taken your Task Manager App to the next level by implementing global state management with the Context API and adding routing for multi-page navigation. In the next and final video of this series, we'll focus on optimizing and deploying your app. Don't forget to like, share, and subscribe to stay updated. See you in the next lesson!*

---

### **Additional Resources**

- **React Context API:** [Context Documentation](https://reactjs.org/docs/context.html)
- **React Router:** [React Router Documentation](https://reactrouter.com/)
- **useContext Hook:** [useContext Documentation](https://reactjs.org/docs/hooks-reference.html#usecontext)
- **Code Splitting:** [Code Splitting in React](https://reactjs.org/docs/code-splitting.html)

---

### **Call to Action**

- **Subscribe:** Stay tuned for the final video in the series.
- **Comments:** Have questions or feedback? Drop them below!
- **Share:** If this video helped you, please share it with others.

---

**End Screen:**

*Thanks for watching! Up next: "Optimizing and Deploying Your React App".*