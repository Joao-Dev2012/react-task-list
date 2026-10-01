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
      <h1 className="text-6xl text-black font-serif">Task List</h1>
      <input className='border-2 border-black rounded-md'
       type="text" onChange={(e)=> setTask(e.target.value)} value={task} />
      <button className='border-2 bg-gray-400 rounded-md' onClick={add}>Add</button>
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