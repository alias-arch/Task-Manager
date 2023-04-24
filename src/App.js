//import logo from './logo.svg';
//import './App.css';
import { useState ,useEffect} from "react";
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask,setShowAddTask]=useState(false);
  const [tasks,setTasks]=useState([])
  useEffect(()=> {
    const getTasks = async ()=> {
            const tasksFromServer= await fetchTasks();
            setTasks(tasksFromServer);
        }
        getTasks();
    },[]) 

  // Fetch Tasks
    const fetchTasks=async() => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();
        return data;
    }

  // Add Task
   const addTask = async(task) =>{
     console.log(task);
     
     const res = await fetch('http://localhost:5000/tasks',{
        method:'POST',
        headers: {
            'Content-type':'application/json'
            },
        body :JSON.stringify(task),
        })
        const data = await res.json();
     setTasks([...tasks,data]);
}

  // Delete Task
   const deleteTask =async (id) => {
     console.log("delete",id);
     await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
     setTasks(tasks.filter((task)=>( task.id !== id)))
    }

  // Fetch Task
    const fetchTask=async(id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await res.json();
        return data;
    }

  // Toggle Reminder 
   const toggleReminder =async (id) => {
    console.log("toggle",id) 
    const toggletask = await fetchTask(id);
    const upTask = {...toggletask,reminder:!toggletask.reminder};
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'PUT',
        headers : {
            'Content-type':'application/json'
            },
        body:JSON.stringify(upTask)
        }
        )
    const data =await res.json();
    setTasks(tasks.map((task)=> task.id===id ? {...task,reminder:data.reminder} :task))
    }

  return (
    <div className="container">
      <Header onAdd={()=>{setShowAddTask(!showAddTask)}} showadd={showAddTask} title="Task Tracker" />
      {showAddTask && <AddTask onSave={addTask} />} 
      {tasks.length >0 ?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No Task To Show"}
   </div>
  );
}

export default App;
