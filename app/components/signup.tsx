'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signUp } from '@/services/auth'

const signupErrorMessages: Record<string, string> = {
  weak_password: 'Choose a stronger password. Try a longer mix of uppercase and lowercase letters, numbers, and symbols.',
  email_address_invalid: 'Please use a valid email address that can receive confirmation emails.',
  email_exists: 'An account with this email already exists. Try logging in instead.',
  user_already_exists: 'An account with this email already exists. Try logging in instead.',
  over_email_send_rate_limit: 'Too many confirmation emails have been requested. Please wait a few minutes and try again.',
  over_request_rate_limit: 'Too many attempts. Please wait a few minutes before trying again.',
  signup_disabled: 'Sign up is temporarily unavailable. Please try again later.',
}

export default function Signup() {
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupError, setSignupError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignUp() {
    if (isLoading) return

    setSignupError('')
    setSignupSuccess('')
    setIsLoading(true)

    try {
      const { data, error } = await signUp(signupEmail, signupPassword)

      if (error) {
        setSignupError(
          signupErrorMessages[error.code ?? ''] ??
          'We couldn’t create your account. Check your details and try again in a moment.'
        )
        return
      }

      if (!data.user) {
        setSignupError('We couldn’t complete your sign up. Please try again in a moment.')
        return
      }

      setSignupSuccess(
        data.session
          ? 'Your account is ready. You can now return to log in.'
          : 'Request received! Check your inbox and spam folder for a confirmation link before logging in. If you already have an account, you can log in.'
      )
      setSignupPassword('')
    } catch {
      setSignupError('We couldn’t connect right now. Check your connection and try again.')
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
          <h1 className="font-serif text-6xl leading-none tracking-[-0.055em] sm:text-8xl">Sign up<span className="text-neutral-400">.</span></h1>
          <p className="mt-5 text-sm leading-6 text-neutral-600 sm:text-base">A fresh start. A little more space for what matters.</p>
        </div>

        <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); void handleSignUp() }} aria-busy={isLoading}>
          <div>
            <label htmlFor="signup-email" className="mb-3 block text-xs font-medium text-neutral-700">Email</label>
            <input
              id="signup-email"
              className="task-input w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              onChange={(e) => setSignupEmail(e.target.value)}
              value={signupEmail}
              placeholder="you@example.com"
              aria-describedby={signupError ? 'signup-error' : undefined}
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="mb-3 block text-xs font-medium text-neutral-700">Password</label>
            <input
              id="signup-password"
              className="task-input w-full rounded-lg border border-neutral-300 bg-white px-4 py-4 text-base placeholder:text-neutral-400"
              type="password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              onChange={(e) => setSignupPassword(e.target.value)}
              value={signupPassword}
              placeholder="Create your password"
              aria-describedby={signupError ? 'signup-error' : undefined}
            />
          </div>

          {signupError && (
            <p id="signup-error" role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
              {signupError}
            </p>
          )}

          {signupSuccess && (
            <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
              {signupSuccess}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="add-button flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Creating account…' : 'Create account'}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </form>

        <div className="mt-8 border-t border-neutral-200 pt-6 text-center">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 motion-reduce:transition-none">
            <span aria-hidden="true">&larr;</span>
            Back to log in
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-300 py-6 text-xs text-neutral-500">
        A fresh page. A clearer day.
      </footer>
    </div>
  )
}
