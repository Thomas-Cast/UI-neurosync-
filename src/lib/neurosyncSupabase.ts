import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserPreferences {
  id: string;
  theme: 'dark' | 'light';
  language: string;
  notifications_enabled: boolean;
  auto_translate: boolean;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: string;
  source_text: string;
  translated_text: string;
  source_language: string;
  target_language: string;
  created_at: string;
}

export const preferencesApi = {
  async getOrCreate() {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .maybeSingle();

    if (error) throw error;

    if (data) return data as UserPreferences;

    const { data: newPrefs, error: insertError } = await supabase
      .from('user_preferences')
      .insert([{}])
      .select()
      .single();

    if (insertError) throw insertError;
    return newPrefs as UserPreferences;
  },

  async update(id: string, updates: Partial<UserPreferences>) {
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
    return data as UserPreferences;
  },
};

export const translationsApi = {
  async create(
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string
  ) {
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
    return data as Translation;
  },

  async getRecent(limit = 10) {
    const { data, error } = await supabase
      .from('translations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Translation[];
  },
};