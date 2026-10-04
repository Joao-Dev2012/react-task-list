'use client'
import { useState } from 'react'
import { logIn } from '@/services/auth'
export default function Login(){
    const [loginEmail,setLoginEmail] = useState('')
    const [loginPassword,setLoginPassword] = useState('')
    async function handleLogIn() {
        const { data , error } = await logIn(loginEmail,loginPassword)
        console.log('DATA:',data)
        console.log('ERROR:',error)
        
    }
    return(
        <div>
            <h1>Log-In</h1>
            <input type="email"  onChange={(e)=> setLoginEmail( e.target.value)} value={loginEmail} placeholder='please, type your email' />
            <input type="password" onChange={(e)=> setLoginPassword( e.target.value)} value={loginPassword} placeholder='please, type your password' />
            <button onClick={handleLogIn}>Log-In</button>
        </div>
    )
}