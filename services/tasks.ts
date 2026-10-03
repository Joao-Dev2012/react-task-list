import { supabase } from '../lib/supabase'

export async function getTasks() {

    const {data,error} = await supabase.from('tasks').select()
    if(error){
        throw new Error(`Error, couldn't find any tasks`)
    }
    return data
}