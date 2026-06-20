import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqwtechimqreaqkhsyjk.supabase.co'
const supabaseKey = 'sb_publishable_M3LfVwUFnEkbhzRG74J0tA_CQxnOKfl'

export const supabase = createClient(supabaseUrl, supabaseKey)
