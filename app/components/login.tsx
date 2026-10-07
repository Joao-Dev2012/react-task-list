'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { logIn } from '@/services/auth'

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const tasksRouter = useRouter()

  useEffect(() => {
    if (!loginSuccess) return

    const timeout = window.setTimeout(() => tasksRouter.push('/tasks'), 1500)
    return () => window.clearTimeout(timeout)
  }, [loginSuccess, tasksRouter])

  async function handleLogIn() {
    if (isLoading || loginSuccess) return

    setLoginError('')
    setLoginSuccess('')
    setIsLoading(true)

    try {
      const { data, error } = await logIn(loginEmail, loginPassword)

      if (error || !data.session || !data.user) {
        setLoginError(
          error?.code === 'email_not_confirmed'
            ? 'Please confirm your email using the link in your inbox before logging in.'
            : error?.code === 'over_request_rate_limit'
              ? 'Too many attempts. Please wait a few minutes before trying again.'
              : 'We couldn’t log you in. Check your email and password, then try again.'
        )
        return
      }

      setLoginSuccess('You’re logged in. Taking you to your tasks…')
    } catch {
      setLoginError('We couldn’t connect right now. Check your connection and try again.')
    } finally {
      setIsLoading(false)
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

        <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); void handleLogIn() }} aria-busy={isLoading}>
          <div>
            <label htmlFor="login-email" className="mb-3 block text-xs font-medium text-neutral-700">Email</label>
            <input
              id="login-email"
              className="task-input w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading || Boolean(loginSuccess)}
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
              required
              disabled={isLoading || Boolean(loginSuccess)}
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
              placeholder="Enter your password"
              aria-describedby={loginError ? 'login-error' : undefined}
            />
          </div>

          {loginError && (
            <p id="login-error" role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
              {loginError}
            </p>
          )}

          {loginSuccess && (
            <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
              {loginSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || Boolean(loginSuccess)}
            className="add-button flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Logging in…' : loginSuccess ? 'Logged in' : 'Log in'}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-neutral-200 pt-6 text-sm sm:flex-row sm:justify-between">
          <p className="text-neutral-500">New to Task List?</p>
          <Link href="/signup" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-950 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 motion-reduce:transition-none">
            Sign up for free
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-300 py-6 text-xs text-neutral-500">
        A fresh page. A clearer day.
      </footer>
    </div>
  )
}

