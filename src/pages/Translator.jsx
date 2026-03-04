import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Typography,
  LinearProgress,
  Paper,
} from '@mui/material';
import { SwapHoriz, VolumeUp, ContentCopy, Check } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
];

export function Translator() {
  const { t } = useLanguage();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockTranslations = {
        en_es: 'Hola mundo, este es un texto traducido',
        en_fr: 'Bonjour le monde, ceci est un texte traduit',
        en_de: 'Hallo Welt, dies ist ein übersetzter Text',
        es_en: 'Hello world, this is translated text',
        fr_en: 'Hello world, this is a translated text',
      };

      const key = `${sourceLanguage}_${targetLanguage}`;
      const result = mockTranslations[key] || sourceText.toUpperCase();

      setTranslatedText(result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ width: '100%' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 4,
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('translator')}
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <Card
              sx={{
                backgroundColor: 'rgba(26, 31, 58, 0.6)',
                backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 3,
              }}
            >
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#7a8199', fontWeight: 600 }}>
                      {t('sourceLanguage')}
                    </Typography>
                    <Select
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                      }}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Button
                    onClick={handleSwapLanguages}
                    sx={{
                      minWidth: 40,
                      height: 40,
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      color: '#00d4ff',
                      '&:hover': { backgroundColor: 'rgba(0, 212, 255, 0.2)' },
                    }}
                  >
                    <SwapHoriz />
                  </Button>
                </Grid>

                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#7a8199', fontWeight: 600 }}>
                      {t('targetLanguage')}
                    </Typography>
                    <Select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                      }}
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder={t('textInput')}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 212, 255, 0.02)',
                    fontSize: '0.95rem',
                    '& fieldset': { borderColor: 'rgba(0, 212, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                  },
                  '& .MuiOutlinedInput-input::placeholder': { color: '#7a8199', opacity: 0.7 },
                }}
              />

              {isLoading && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    sx={{
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #00d4ff, #0099ff, #00d4ff)',
                        backgroundSize: '200% 200%',
                      },
                    }}
                  />
                </Box>
              )}

              {translatedText && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <Typography variant="caption" sx={{ display: 'block', mb: 1, color: '#7a8199', fontWeight: 600 }}>
                    {t('output')}
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      backgroundColor: 'rgba(0, 255, 136, 0.05)',
                      border: '1px solid rgba(0, 255, 136, 0.2)',
                      p: 2,
                      mb: 2,
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Typography sx={{ color: '#ffffff', lineHeight: 1.8, fontSize: '0.95rem', wordBreak: 'break-word' }}>
                      {translatedText}
                    </Typography>
                  </Paper>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={copied ? <Check /> : <ContentCopy />}
                      onClick={handleCopy}
                      sx={{
                        color: '#00ff88',
                        borderColor: '#00ff88',
                        fontSize: '0.85rem',
                        '&:hover': { backgroundColor: 'rgba(0, 255, 136, 0.1)' },
                      }}
                      variant="outlined"
                    >
                      {copied ? t('copied') : t('copy')}
                    </Button>
                    <Button
                      startIcon={<VolumeUp />}
                      sx={{
                        color: '#00d4ff',
                        borderColor: '#00d4ff',
                        fontSize: '0.85rem',
                        '&:hover': { backgroundColor: 'rgba(0, 212, 255, 0.1)' },
                      }}
                      variant="outlined"
                    >
                      Speak
                    </Button>
                  </Box>
                </motion.div>
              )}

              <Button
                fullWidth
                variant="contained"
                onClick={handleTranslate}
                disabled={!sourceText.trim() || isLoading}
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  py: 1.5,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)', transform: 'translateY(-2px)' },
                  '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
                }}
              >
                {isLoading ? t('translating') : t('translate')}
              </Button>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Card
              sx={{
                backgroundColor: 'rgba(26, 31, 58, 0.6)',
                backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#00d4ff' }}>
                {t('recentTranslations')}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Typography variant="body2" sx={{ color: '#7a8199', textAlign: 'center', py: 3 }}>
                  {t('noTranslations')}
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}