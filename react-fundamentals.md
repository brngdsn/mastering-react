**Title:** React Fundamentals – Components, Props, and JSX

---

**[Opening Scene]**

*Welcome back to the "Mastering React" series! In this second video, we'll delve into the fundamentals of React by exploring components, props, and JSX. By the end of this lesson, you'll start building the core parts of your Personal Task Manager App.*

---

### **1. Understanding Components**

**- What Are Components?**

- **Definition:** Components are the building blocks of any React application. They encapsulate reusable code that represents a part of the user interface.
- **Types of Components:**
  - **Functional Components:** JavaScript functions that return JSX.
  - **Class Components:** ES6 classes that extend `React.Component` (less common in modern React due to hooks).

**- Creating Your First Functional Component**

1. **Create a New File:**

   - Inside the `src` folder, create a new directory called `components`.
   - Create a file named `Header.js` inside the `components` folder.

2. **Write the Component Code:**

   ```jsx
   // Header.js
   import React from 'react';

   const Header = () => {
     return (
       <header>
         <h1>Personal Task Manager</h1>
       </header>
     );
   };

   export default Header;
   ```

3. **Import and Use the Component:**

   - Open `App.js` in the `src` folder.
   - Import the `Header` component and include it in your JSX.

   ```jsx
   // App.js
   import React from 'react';
   import Header from './components/Header';

   function App() {
     return (
       <div className="App">
         <Header />
       </div>
     );
   }

   export default App;
   ```

---

### **2. Working with JSX**

**- What is JSX?**

- **Definition:** JSX stands for JavaScript XML. It allows you to write HTML-like syntax within JavaScript, which React then transforms into actual DOM elements.
- **Why Use JSX?**
  - **Readability:** Makes the code easier to understand.
  - **Integration:** Allows you to write HTML and JavaScript together.

**- Embedding Expressions in JSX**

- **Example:**

  ```jsx
  const userName = 'John Doe';

  const Greeting = () => {
    return <p>Hello, {userName}!</p>;
  };
  ```

- **Notes:**
  - Use curly braces `{}` to embed JavaScript expressions within JSX.
  - You can perform calculations, call functions, and access object properties.

**- JSX Rules to Remember**

- **Return a Single Parent Element:**

  - Wrapping elements inside a single parent, like a `div` or `React.Fragment`.

- **Class vs. className:**

  - Use `className` instead of `class` for assigning CSS classes.

- **Self-Closing Tags:**

  - Elements without children should be self-closed, e.g., `<img />`, `<br />`.

---

### **3. Props in React**

**- What Are Props?**

- **Definition:** "Props" is short for properties. They are read-only inputs that are passed into components, similar to function arguments.
- **Purpose:**
  - To pass data from a parent component to a child component.
  - To make components dynamic and reusable.

**- Passing Props to Components**

1. **Modify Parent Component:**

   - In `App.js`, pass a prop to the `Header` component.

   ```jsx
   // App.js
   function App() {
     const title = 'My Task Manager';

     return (
       <div className="App">
         <Header title={title} />
       </div>
     );
   }
   ```

2. **Access Props in Child Component:**

   - In `Header.js`, access the `title` prop.

   ```jsx
   // Header.js
   import React from 'react';

   const Header = (props) => {
     return (
       <header>
         <h1>{props.title}</h1>
       </header>
     );
   };

   export default Header;
   ```

**- Destructuring Props**

- **Simplify Access:**

  ```jsx
  const Header = ({ title }) => {
    return (
      <header>
        <h1>{title}</h1>
      </header>
    );
  };
  ```

**- Default Props and PropTypes**

1. **Set Default Props:**

   ```jsx
   // Header.js
   Header.defaultProps = {
     title: 'Default Task Manager',
   };
   ```

2. **Typechecking with PropTypes:**

   - Install PropTypes:

     ```bash
     npm install prop-types
     ```

   - Import and Define PropTypes:

     ```jsx
     import PropTypes from 'prop-types';

     Header.propTypes = {
       title: PropTypes.string.isRequired,
     };
     ```

---

### **4. Building Reusable Components**

**- Creating a Button Component**

1. **Create `Button.js` in `components` Folder:**

   ```jsx
   // Button.js
   import React from 'react';
   import PropTypes from 'prop-types';

   const Button = ({ color, text }) => {
     return <button style={{ backgroundColor: color }}>{text}</button>;
   };

   Button.defaultProps = {
     color: 'steelblue',
   };

   Button.propTypes = {
     text: PropTypes.string,
     color: PropTypes.string,
   };

   export default Button;
   ```

2. **Use Button Component in Header:**

   ```jsx
   // Header.js
   import Button from './Button';

   const Header = ({ title }) => {
     return (
       <header>
         <h1>{title}</h1>
         <Button color="green" text="Add Task" />
       </header>
     );
   };
   ```

**- Styling Components**

- **Inline Styling:**

  - Using the `style` prop with a JavaScript object.

- **CSS Stylesheets:**

  - Create a `Header.css` file and import it into `Header.js`.

    ```css
    /* Header.css */
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ```

    ```jsx
    // Header.js
    import './Header.css';
    ```

---

### **5. Hands-On Example: Building the Task List UI**

**- Creating the Task Component**

1. **Create `Task.js` in `components` Folder:**

   ```jsx
   // Task.js
   import React from 'react';
   import PropTypes from 'prop-types';

   const Task = ({ task }) => {
     return (
       <div className="task">
         <h3>{task.text}</h3>
         <p>{task.day}</p>
       </div>
     );
   };

   Task.propTypes = {
     task: PropTypes.object.isRequired,
   };

   export default Task;
   ```

2. **Create `Tasks.js` to List Multiple Tasks:**

   ```jsx
   // Tasks.js
   import React from 'react';
   import Task from './Task';

   const Tasks = ({ tasks }) => {
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

3. **Update `App.js` to Include Tasks Component:**

   ```jsx
   // App.js
   import React from 'react';
   import Header from './components/Header';
   import Tasks from './components/Tasks';

   function App() {
     const tasks = [
       {
         id: 1,
         text: 'Doctors Appointment',
         day: 'Feb 5th at 2:30pm',
       },
       {
         id: 2,
         text: 'Meeting at School',
         day: 'Feb 6th at 1:30pm',
       },
     ];

     return (
       <div className="App">
         <Header />
         <Tasks tasks={tasks} />
       </div>
     );
   }

   export default App;
   ```

---

### **6. Recap and What's Next**

**- What We Covered Today**

- **Components:**
  - Learned about functional components and how to create them.
- **JSX:**
  - Understood how JSX works and how to embed JavaScript expressions.
- **Props:**
  - Passed data between components using props.
  - Used default props and PropTypes for better code quality.
- **Building UI:**
  - Started constructing the UI for the task manager with reusable components.

**- Sneak Peek into the Next Video**

- **State Management:**
  - We'll introduce state in React and how to manage it within components.
- **Hooks:**
  - Learn about `useState` and `useEffect` hooks to add interactivity.
- **Enhancing the Task Manager:**
  - Make the task list dynamic by adding functionality to add and remove tasks.

---

**[Closing Scene]**

*Great job! You've taken your first steps into building a React application by understanding components, props, and JSX. In the next video, we'll make our app interactive by introducing state and hooks. Don't forget to like, share, and subscribe to stay updated. See you in the next lesson!*

---

**Additional Resources:**

- **React Documentation on Components:** [React Components](https://reactjs.org/docs/components-and-props.html)
- **JSX in Depth:** [JSX Docs](https://reactjs.org/docs/jsx-in-depth.html)
- **PropTypes Documentation:** [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

---

**Call to Action:**

- **Subscribe:** Stay tuned for more insightful tutorials.
- **Comments:** Have questions or feedback? Drop them below!
- **Share:** If this video helped you, please share it with others.

---

**End Screen:**

*Thanks for watching! Up next: "State Management and Hooks".*