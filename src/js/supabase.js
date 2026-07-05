// js/supabase.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'; 

const supabaseUrl = 'https://rvujguibegnhfwazsupb.supabase.co';
const supabaseKey = 'sb_publishable_11LKzH1f_TmToGoH3S4paw_L1fubACi';

export const _supabase = createClient(supabaseUrl, supabaseKey);

export let proyectosCache = [];

export async function obtenerProyectosDeBD() {
    const { data, error } = await _supabase
        .from('proyectos')
        .select('*')
        .order('fecha', { ascending: false });

    if (error) {
        console.error('Error en Supabase:', error.message);
        return [];
    }

    proyectosCache = data || [];
    return proyectosCache;
}