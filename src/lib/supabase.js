import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oqxrjftmfctmuhtqdhdg.supabase.co'
const supabaseKey = 'sb_publishable_T6M6oK2c3KUeJ4XcONGiAA_QpF7i3VQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
