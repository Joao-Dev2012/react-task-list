'use client'
import { useState,useEffect } from 'react'
import { getTasks } from '@/services/tasks'

export default function App() {
  const [task, setTask] = useState('')
  const [tasks,setTasks] = useState<Task[]>([])
  type Task = {
    id:number,
    task:string
    completed:boolean
  }
  function add() {

  }
  useEffect(() => {
    async function loadTasks() {
      const data = await getTasks()
      setTasks(data)
      console.log(data)
  }

  loadTasks()
}, [])  

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col px-6 sm:px-10">
      <header className="flex items-center justify-between border-b border-neutral-300 py-6 sm:py-8">
        <span className="flex items-center gap-3 text-sm font-medium tracking-tight">
          <span className="grid size-8 place-items-center rounded-full bg-neutral-950 text-white" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 4 4L19 6" />
            </svg>
          </span>
          Task List
        </span>
        <span className="text-xs text-neutral-500">Keep it simple.</span>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mb-10 sm:mb-12">
          <p className="mb-5 text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">A little space to focus</p>
          <h1 className="font-serif text-6xl leading-none tracking-[-0.055em] sm:text-8xl">Task List<span className="text-neutral-400">.</span></h1>
          <p className="mt-5 text-sm leading-6 text-neutral-600 sm:text-base">One thing at a time. Start with what matters.</p>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); add() }}>
          <label htmlFor="task" className="mb-3 block text-xs font-medium text-neutral-700">New task</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="task"
              className="task-input min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="text"
              autoComplete="off"
              placeholder="What would you like to do?"
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <button className="add-button flex min-h-14 items-center justify-center gap-3 rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white" type="submit">
              <span aria-hidden="true" className="text-xl font-light leading-none">+</span>
              Add task
            </button>
          </div>
        </form>

        <section aria-labelledby="tasks-heading" className="mt-12 sm:mt-14">
          <div className="flex items-center justify-between border-b border-neutral-950 pb-4">
            <h2 id="tasks-heading" className="text-sm font-medium">Your tasks</h2>
            <span aria-live="polite" aria-atomic="true" className="text-xs tabular-nums text-neutral-500">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="border-b border-neutral-200 py-14 text-center sm:py-16">
              <svg className="mx-auto mb-5 text-neutral-400" width="32" height="36" viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                <rect x="5" y="3" width="22" height="30" rx="3" />
                <path d="M11 12h10M11 18h10M11 24h6" />
              </svg>
              <p className="font-serif text-2xl tracking-tight">Start with one task.</p>
              <p className="mt-2 text-sm text-neutral-500">Add it above and make room for a little clarity.</p>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200 border-b border-neutral-200">
              {tasks.map((task) => (
                <li key={task.id} className="task-row flex items-baseline gap-5 py-5 sm:gap-7">
                  <span aria-hidden="true" className="shrink-0 font-mono text-xs tabular-nums text-neutral-400">
                    {String(task.id).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 text-sm leading-7 wrap-anywhere sm:text-base">{task.task}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 text-xs text-neutral-500">Tip: press Enter to add a task.</p>
        </section>
      </main>

      <footer className="border-t border-neutral-300 py-6 text-xs text-neutral-500">
        A fresh page. A clearer day.
      </footer>
    </div>
  )
}
