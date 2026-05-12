import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bwuxojmyxjqdzthvludo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_We0xpICRIvqkaJsriQiq3A_Kzppb8T0'

export const supabase = createClient(supabaseUrl.trim(), supabaseKey.trim())
