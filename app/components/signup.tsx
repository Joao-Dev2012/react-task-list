import { useState } from "react"

export default function Signup(){
    const [signupEmail,setSignupEmail] = useState('')
    const [signupPassword,setSignupPassword] = useState('')
    function handleSignUp(){
        console.log(signupEmail,signupPassword)
        setSignupEmail('')
        setSignupPassword('')
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