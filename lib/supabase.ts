import { createClient } from '@supabase/supabase-js'

    const URL = process.env.SUPABASE_URL 
    const KEY = process.env.SUPABASE_PUBLISHABLE_KEY
    
    if (!URL || !KEY) {
      throw new Error('Nao foi possivel encontrar a chave') 
    }
    export const supabase = createClient(URL,KEY)
