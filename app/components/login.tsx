import { useState } from 'react'
export default function Login(){
    const [loginEmail,setLoginEmail] = useState('')
    const [loginPassword,setLoginPassword] = useState('')
    return(
        <div>
            <h1>Log-In</h1>
            <input type="email"  onChange={(e)=> setLoginEmail( e.target.value)} value={loginEmail} placeholder='please, type your email' />
            <input type="password" onChange={(e)=> setLoginPassword( e.target.value)} value={loginPassword} placeholder='please, type your password' />
        </div>
    )
}