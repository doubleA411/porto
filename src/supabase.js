import { createClient } from "@supabase/supabase-js";

const sb_url = process.env.REACT_APP_SB_URL;
const sb_key = process.env.REACT_APP_SB_KEY;

export const supabase = createClient(sb_url, sb_key);



