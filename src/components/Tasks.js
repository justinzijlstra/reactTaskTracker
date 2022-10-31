//States get passed down
//Actions get passed up (click is an action)

import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {
    
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
  )
}

export default Tasks
