//States get passed down
//Actions get passed up (click is an action)

//1:30:31

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { isCompositeComponent } from "react-dom/test-utils";

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  //Gets tasks from server
  useEffect(() =>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () =>{
      const res = await fetch ('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }

      //Fetch Task
  const fetchTask = async (ID) =>{
    const res = await fetch (`http://localhost:5000/tasks/${ID}`)
    const data = await res.json()
    return data
  }

//Add Task
const addTask =  async (newTask) =>{

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers:{'Content-type':'application/json'}, 
    body: JSON.stringify(newTask)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  //custom id's 
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id, ...task}
  // setTasks([...tasks, newTask])
};

//Delete Task
const deleteTask = async (ID) => {
  await fetch(`http://localhost:5000/tasks/${ID}`, {method: 'DELETE',})
  setTasks(tasks.filter((element)=>element.id != ID))
}

//Toggle Reminder
const toggleReminder = async (ID) =>{

  const taskToToggle = await fetchTask(ID)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${ID}`,{
    method: 'PUT',
    headers:{'Content-type':'application/json'}, 
    body: JSON.stringify(updTask)
  })

  const data  = await res.json()



  setTasks(
    tasks.map((ele) =>
    ele.id === ID 
    ? {...ele, reminder
    : !ele.reminder}: ele
    )
  )
}

  return (
      <div className="container">
        <Header title={"ToDo"} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        {/* <Route path='/' exact render={(props)=>(
          <> */}
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 
            ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> )
            : ("No Tasks")}
          {/* </>
        )}/> */}
        {/* <Route path='/about' component={About}/> */}
        <Footer/>
      </div>
  );
}

// class App extends React.Component{
//   render(){
//     return <h1>Hello from react</h1>
//   }
// }

export default App;
