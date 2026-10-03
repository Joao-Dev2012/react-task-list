import { supabase } from '../lib/supabase'

export async function getTasks() {

    const {data,error} = await supabase.from('tasks').select()
    if(error){
        throw new Error(`Error, couldn't find any tasks`)
    }
    return data
}
export async function createTask(task:string) {
    const {data,error} = await supabase.from('tasks').insert({
        task: task,
        completed: false
    }).select().single()
    if(error){
        throw new Error(`Error, couldn't create task`)
    }
    return data
}