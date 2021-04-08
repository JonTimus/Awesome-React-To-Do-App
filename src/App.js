import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";



const App = () => {
  // components -> functions & class

  // declares variables that are limited to the scope of a block statement, or expression on which it is used
  // let firstname = 'Jon';
  // // eclares a variable globally, or locally to an entire function regardless of block scope
  // var lastname = 'Timus';
  // const x = false;

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]); // empty array

  // loads content right after page loads
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, []) // Dependency Array -> if u have a value to run and it changes 


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    // console.log(data);
    return data
  }

  // Fetch One Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    // console.log(data);
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    //Adds to existing 'tasks' -> data, which is the NEW task created
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // console.log(id);
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };


  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT', // since it's update
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }



  return (
    <Router>
      <div className="container">
        {/* <h1 >Hello MFs !</h1>
      <h1 >Welcome {firstname} {lastname} !</h1>
      <h2>Hell {x ? 'Yes' : 'No'}!</h2> */}

        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />


        <Route path='/' exact render={(props) => (
          <>
            {/* If the showAddTask is true then show AddTask */}
            {showAddTask && <AddTask onAdd={addTask} />}

            {/* if no tasks -> show this message */}
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : (
              "No Tasks to Show."
            )}
          </>
        )} />

        <Route path='/about' component={About} />

        <Footer />
      </div>
    </Router>
  );
};

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Class Component</h1>
//       </div>
//     );
//   }
// }

export default App;
