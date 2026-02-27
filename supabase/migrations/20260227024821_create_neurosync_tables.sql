/*
  # Create NeuroSync Database Schema

  1. New Tables
    - `user_preferences`
      - `id` (uuid, primary key)
      - `theme` (text) - dark/light theme preference
      - `language` (text) - language preference
      - `notifications_enabled` (boolean)
      - `auto_translate` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `translations`
      - `id` (uuid, primary key)
      - `source_text` (text) - original text
      - `translated_text` (text) - translated output
      - `source_language` (text) - source language code
      - `target_language` (text) - target language code
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add public access policies (no auth required for demo)
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text DEFAULT 'dark',
  language text DEFAULT 'en',
  notifications_enabled boolean DEFAULT true,
  auto_translate boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text text NOT NULL,
  translated_text text NOT NULL,
  source_language text DEFAULT 'en',
  target_language text DEFAULT 'es',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to preferences"
  ON user_preferences
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to translations"
  ON translations
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_translations_created_at ON translations(created_at);