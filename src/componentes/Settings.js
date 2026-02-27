import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Button,
  Alert,
} from '@mui/material';
import { Settings as SettingsIcon, Check } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { preferencesApi } from '../lib/neurosyncSupabase';

export function Settings() {
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const prefs = await preferencesApi.getOrCreate();
      setPreferences(prefs);
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await preferencesApi.update(preferences.id, preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography sx={{ color: '#7a8199' }}>Loading preferences...</Typography>
      </Box>
    );
  }

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
          Settings & Preferences
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ color: '#00d4ff', fontSize: 28 }}>
                  <SettingsIcon />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Display
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 1,
                      color: '#7a8199',
                      fontWeight: 600,
                      display: 'block',
                    }}
                  >
                    Theme
                  </Typography>
                  <Select
                    value={preferences?.theme || 'dark'}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value)}
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
                    <MenuItem value="dark">Dark Mode</MenuItem>
                    <MenuItem value="light">Light Mode</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 1,
                      color: '#7a8199',
                      fontWeight: 600,
                      display: 'block',
                    }}
                  >
                    Language
                  </Typography>
                  <Select
                    value={preferences?.language || 'en'}
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
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
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
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
                border: '1px solid rgba(0, 255, 136, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ color: '#00ff88', fontSize: 28 }}>
                  <SettingsIcon />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  Notifications
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences?.notifications_enabled || false}
                      onChange={(e) =>
                        handlePreferenceChange('notifications_enabled', e.target.checked)
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#00ff88',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: 'rgba(0, 255, 136, 0.3)',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#b0b8cc', fontWeight: 500 }}>
                      Enable Notifications
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={preferences?.auto_translate || false}
                      onChange={(e) =>
                        handlePreferenceChange('auto_translate', e.target.checked)
                      }
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#00d4ff',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: 'rgba(0, 212, 255, 0.3)',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#b0b8cc', fontWeight: 500 }}>
                      Auto-Translate on Paste
                    </Typography>
                  }
                />

                <Typography
                  variant="caption"
                  sx={{
                    color: '#7a8199',
                    mt: 1,
                    lineHeight: 1.6,
                  }}
                >
                  Automatically translate text when you paste it into the translator
                </Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Box sx={{ mt: 4 }}>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                icon={<Check fontSize="inherit" />}
                sx={{
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  mb: 2,
                  '& .MuiAlert-icon': {
                    color: '#00ff88',
                  },
                }}
              >
                Preferences saved successfully!
              </Alert>
            </motion.div>
          )}

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
              color: '#000000',
              fontWeight: 700,
              fontSize: '0.95rem',
              py: 1.5,
              px: 4,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Save Preferences
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
