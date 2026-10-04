import { useState } from 'react'
export default function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    return(
        <div>
            <h1>Log-In</h1>
            <input type="text"  onChange={(e)=> setEmail( e.target.value)} value={email} placeholder='please, type your email' />
            <input type="text" onChange={(e)=> setPassword( e.target.value)} value={password} placeholder='please, type your password' />
        </div>
    )
}