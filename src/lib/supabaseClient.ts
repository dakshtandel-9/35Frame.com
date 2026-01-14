import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bwakxlgnqfeaextwibaz.supabase.co';
const supabaseAnonKey = 'sb_publishable_pFmxhnDd4hGFyL5UXrFUMA_WLyBNUi1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
