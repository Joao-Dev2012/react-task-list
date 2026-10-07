'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { logIn } from '@/services/auth'

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const tasksRouter = useRouter()

  async function handleLogIn() {
    setLoginError('')

    try {
      const { data, error } = await logIn(loginEmail, loginPassword)

      if (error || !data.session || !data.user) {
        setLoginError('Unable to log in. Check your email and password and try again.')
        return
      }

      tasksRouter.push('/tasks')
    } catch {
      setLoginError('Unable to log in right now. Please try again in a moment.')
    }
  }

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

      <main className="mx-auto w-full max-w-md flex-1 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mb-10 sm:mb-12">
          <p className="mb-5 text-[11px] font-medium tracking-[0.22em] text-neutral-500 uppercase">A little space to focus</p>
          <h1 className="font-serif text-6xl leading-none tracking-[-0.055em] sm:text-8xl">Log in<span className="text-neutral-400">.</span></h1>
          <p className="mt-5 text-sm leading-6 text-neutral-600 sm:text-base">Welcome back. Make room for what matters.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="login-email" className="mb-3 block text-xs font-medium text-neutral-700">Email</label>
            <input
              id="login-email"
              className="task-input w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="email"
              autoComplete="email"
              onChange={(e) => setLoginEmail(e.target.value)}
              value={loginEmail}
              placeholder="you@example.com"
              aria-describedby={loginError ? 'login-error' : undefined}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-3 block text-xs font-medium text-neutral-700">Password</label>
            <input
              id="login-password"
              className="task-input w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
              placeholder="Enter your password"
              aria-describedby={loginError ? 'login-error' : undefined}
            />
          </div>

          {loginError && (
            <p id="login-error" role="alert" className="rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm leading-6 text-neutral-700">
              {loginError}
            </p>
          )}

          <button
            type="button"
            className="add-button flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white"
            onClick={handleLogIn}
          >
            Log in
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
        <div>
          <p className="font-serif text-2xl  leading-none tracking-[-0.055em] ">
            Don't have an account yet? <a href="/signup" className='underline text-neutral-700 hover:text-red-300'>Sign-Up for free!</a>
          </p>
        </div>
      </main>

      <footer className="border-t border-neutral-300 py-6 text-xs text-neutral-500">
        A fresh page. A clearer day.
      </footer>
    </div>
  )
}
