'use client'
import { useState } from 'react'
export default function App(){
  const [task,setTask] = useState("")
  const [tasks,setTasks] = useState<string[]>([])
  function add(){
    setTasks([...tasks,task])
    setTask('')
  }
  return(
    <div>
      <h1 className="text-2xl text-red-500">Task List</h1>
      <input type="text" onChange={(e)=> setTask(e.target.value)} value={task} />
      <button onClick={add}>Add</button>
      <ul>
        {tasks.map((task, positioning)=> {
          return(
            <li key={positioning}>{task}</li>
          )
        })}
      </ul>
    </div>
  )
}