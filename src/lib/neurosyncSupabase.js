import { createClient } from '@supabase/supabase-js';

// Detectamos el entorno automáticamente
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Configuración de Supabase incompleta. Revisa tu archivo .env');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// API de Preferencias
export const preferencesApi = {
  async getOrCreate() {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (data) return data;

    const { data: newPrefs, error: insertError } = await supabase
      .from('user_preferences')
      .insert([{}])
      .select()
      .single();

    if (insertError) throw insertError;
    return newPrefs;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('user_preferences')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

// API de Traducciones
export const translationsApi = {
  async create(sourceText, translatedText, sourceLanguage, targetLanguage) {
    const { data, error } = await supabase
      .from('translations')
      .insert([
        {
          source_text: sourceText,
          translated_text: translatedText,
          source_language: sourceLanguage,
          target_language: targetLanguage,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getRecent(limit = 10) {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
};