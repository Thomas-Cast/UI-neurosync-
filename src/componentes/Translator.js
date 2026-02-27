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
import {
  SwapHoriz,
  VolumeUp,
  ContentCopy,
  Check,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { translationsApi } from '../lib/neurosyncSupabase';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
];

export function Translator() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    loadRecentTranslations();
  }, []);

  const loadRecentTranslations = async () => {
    try {
      const data = await translationsApi.getRecent(5);
      setRecent(data);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockTranslations: Record<string, Record<string, string>> = {
        en: {
          es: 'Hola mundo, este es un texto traducido',
          fr: 'Bonjour le monde, ceci est un texte traduit',
          de: 'Hallo Welt, dies ist ein übersetzter Text',
        },
        es: {
          en: 'Hello world, this is translated text',
          fr: 'Bonjour le monde, ceci est un texte traduit',
        },
        fr: {
          en: 'Hello world, this is a translated text',
          es: 'Hola mundo, este es un texto traducido',
        },
      };

      const key = `${sourceLanguage}_${targetLanguage}`;
      let result =
        mockTranslations[sourceLanguage]?.[targetLanguage] ||
        `Translation from ${sourceLanguage} to ${targetLanguage}: "${sourceText}"`;

      if (!mockTranslations[sourceLanguage]?.[targetLanguage]) {
        result = sourceText
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      setTranslatedText(result);

      await translationsApi.create(
        sourceText,
        result,
        sourceLanguage,
        targetLanguage
      );

      loadRecentTranslations();
    } catch (error) {
      console.error('Translation error:', error);
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
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ width: '100%' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
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
          AI Translator
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card
              sx={{
                backgroundColor: 'rgba(26, 31, 58, 0.6)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 3,
              }}
            >
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 1,
                        color: '#7a8199',
                        fontWeight: 600,
                      }}
                    >
                      From
                    </Typography>
                    <Select
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 212, 255, 0.3)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 212, 255, 0.5)',
                        },
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
                      '&:hover': {
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                      },
                    }}
                  >
                    <SwapHoriz />
                  </Button>
                </Grid>

                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        mb: 1,
                        color: '#7a8199',
                        fontWeight: 600,
                      }}
                    >
                      To
                    </Typography>
                    <Select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 212, 255, 0.05)',
                        color: '#ffffff',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 212, 255, 0.3)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(0, 212, 255, 0.5)',
                        },
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
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                disabled={isLoading}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 212, 255, 0.02)',
                    fontSize: '0.95rem',
                    '& fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.5)',
                    },
                  },
                  '& .MuiOutlinedInput-input::placeholder': {
                    color: '#7a8199',
                    opacity: 0.7,
                  },
                }}
              />

              {isLoading && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    sx={{
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background:
                          'linear-gradient(90deg, #00d4ff, #0099ff, #00d4ff)',
                        backgroundSize: '200% 200%',
                      },
                    }}
                  />
                </Box>
              )}

              {translatedText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 1,
                      color: '#7a8199',
                      fontWeight: 600,
                    }}
                  >
                    Translation
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
                    <Typography
                      sx={{
                        color: '#ffffff',
                        lineHeight: 1.8,
                        fontSize: '0.95rem',
                        wordBreak: 'break-word',
                      }}
                    >
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
                        '&:hover': {
                          backgroundColor: 'rgba(0, 255, 136, 0.1)',
                        },
                      }}
                      variant="outlined"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button
                      startIcon={<VolumeUp />}
                      sx={{
                        color: '#00d4ff',
                        borderColor: '#00d4ff',
                        fontSize: '0.85rem',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        },
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
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                  },
                }}
              >
                {isLoading ? 'Translating...' : 'Translate'}
              </Button>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card
              sx={{
                backgroundColor: 'rgba(26, 31, 58, 0.6)',
                backgroundImage:
                  'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: '#00d4ff',
                }}
              >
                Recent Translations
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {recent.length === 0 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#7a8199',
                      textAlign: 'center',
                      py: 3,
                    }}
                  >
                    No translations yet
                  </Typography>
                ) : (
                  recent.map((translation, index) => (
                    <motion.div
                      key={translation.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          backgroundColor: 'rgba(0, 212, 255, 0.03)',
                          border: '1px solid rgba(0, 212, 255, 0.1)',
                          p: 1.5,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 212, 255, 0.08)',
                            borderColor: 'rgba(0, 212, 255, 0.2)',
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#7a8199',
                            fontSize: '0.75rem',
                            display: 'block',
                            mb: 0.5,
                          }}
                        >
                          {translation.source_language} → {translation.target_language}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b0b8cc',
                            fontSize: '0.85rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {translation.source_text.substring(0, 60)}...
                        </Typography>
                      </Paper>
                    </motion.div>
                  ))
                )}
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
