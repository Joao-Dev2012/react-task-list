import { supabase } from '../lib/supabase'

export async function SignUp(email:string,password:string) {
    const { data,error } = await supabase.auth.signUp({
        email:email,
        password:password
    })
    console.log('DATA:', data)
    console.log('ERROR:', error)
    return data
    
}