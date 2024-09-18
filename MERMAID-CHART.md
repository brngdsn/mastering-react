graph TD
    %% Components
    A[App Component]
    B[Header Component]
    C[Tasks Component]
    D[Task Component]
    E[AddTaskForm Component]
    F[Button Component]

    %% State and Functions in App
    subgraph App State & Methods
        state((State: tasks))
        addTask[Function: addTask]
        deleteTask[Function: deleteTask_id]
        toggleReminder[Function: toggleReminder_id]
    end

    %% Component Hierarchy
    A --> B
    A --> C
    B --> F
    A --> E
    C --> D

    %% Data Flow
    A <-->|tasks, addTask| B
    B <-->|onClick: Show AddTaskForm| F
    F -- Click --> E
    E -- Submit --> addTask
    addTask -- Updates --> state
    state -->|Updated tasks| A
    A -->|tasks| C
    C -->|task| D

    D -- onDelete(id) --> deleteTask
    deleteTask -- Updates --> state
    D -- onDoubleClick(id) --> toggleReminder
    toggleReminder -- Updates --> state

    %% User Interactions
    click F "Add Button Clicked"
    click D "Task Item Clicked or Deleted"
