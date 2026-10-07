'use client'
import { useState } from "react"
import { signUp } from "@/services/auth"

export default function Signup(){
    const [signupEmail,setSignupEmail] = useState('')
    const [signupPassword,setSignupPassword] = useState('')
    
    async function handleSignUp(){
        const {data , error} = await signUp(signupEmail,signupPassword)
        if (error){
            alert(`Couldn't create account.`)
        }
        else {
            alert('Account created successfully. Check your email to confirm your account.')
        }
        console.log('DATA:', data)
        console.log('ERROR:', error)    
    }
    return(
        <div>
            <h1>Sign-Up</h1>
            <input type="email" onChange={(e)=> setSignupEmail(e.target.value)} placeholder="please, type your email" value={signupEmail} />
            <input type="password" onChange={(e=> setSignupPassword(e.target.value))} placeholder="please, type the password" value={signupPassword} />
            <button onClick={handleSignUp}>Sign-Up</button>
        </div>
    )
}