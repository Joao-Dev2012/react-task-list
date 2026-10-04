import { useState } from "react"
import { SignUp } from "@/services/tasks"
import { supabase } from "@/lib/supabase"

export default function Signup(){
    const [signupEmail,setSignupEmail] = useState('')
    const [signupPassword,setSignupPassword] = useState('')
    async function handleSignUp(){
        console.log(signupEmail,signupPassword)
        const signupResult = await SignUp(signupEmail,signupPassword)
        console.log(signupResult)
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