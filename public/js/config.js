const SUPABASE_URL = "https://lhqnxutchgawxfcehvsj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_a6_3BP6J82d_nsk-DpIe5A_WoBfbtLJ";

// Inicializamos el cliente global de Supabase de manera segura
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);