import { supabase } from '../lib/supabase'

export async function getTasks() {

    const getUser = await supabase.auth.getUser()
    const user = getUser.data.user
    if(!user){
        throw new Error(`Error, couldn't find any user`)
    }  
    const { data,error } = await supabase.from('tasks').select().eq('user_id',user.id)
    if(error){
        throw new Error(`Error, couldn't find any task`)
    }
    return data


}
export async function createTask(task:string) {
    const {data,error} = await supabase.from('tasks').insert({
        task: task,
        completed: false
    }).select().single()

    if(error){
        console.log('supabase error:',error)
        throw new Error(`Error, couldn't create task`)
    }

    return data
}
