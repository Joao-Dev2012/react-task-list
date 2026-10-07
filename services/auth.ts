import { supabase } from '../lib/supabase'

export async function signUp(email:string,password:string) {
    const { data,error } = await supabase.auth.signUp({
        email:email,
        password:password,
        options:{
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`
        }        
    })

    return { data , error }
    
}
export async function logIn(email:string,password:string) {
    const { data,error } = await supabase.auth.signInWithPassword({
        email:email,
        password:password,

    })
        return { data , error }
    
    
}