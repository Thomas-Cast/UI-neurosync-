import { useState } from 'react';
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
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export function Settings() {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useApp();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoTranslate, setAutoTranslate] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
          {t('settings')}
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ color: '#00d4ff', fontSize: 28 }}>
                  <SettingsIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  Display
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="caption" sx={{ mb: 1, color: '#7a8199', fontWeight: 600, display: 'block' }}>
                    {t('theme')}
                  </Typography>
                  <Select
                    value={theme}
                    onChange={toggleTheme}
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
                    <MenuItem value="dark">{t('darkMode')}</MenuItem>
                    <MenuItem value="light">{t('lightMode')}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
            <Card
              sx={{
                backgroundColor: 'rgba(26, 31, 58, 0.6)',
                backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                border: '1px solid rgba(0, 255, 136, 0.2)',
                backdropFilter: 'blur(10px)',
                p: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ color: '#00ff88', fontSize: 28 }}>
                  <SettingsIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
                  {t('notifications')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#00ff88' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'rgba(0, 255, 136, 0.3)' },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#b0b8cc', fontWeight: 500 }}>
                      {t('enableNotifications')}
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={autoTranslate}
                      onChange={(e) => setAutoTranslate(e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#00d4ff' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'rgba(0, 212, 255, 0.3)' },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: '#b0b8cc', fontWeight: 500 }}>
                      {t('autoTranslate')}
                    </Typography>
                  }
                />
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <Box sx={{ mt: 4 }}>
          {saved && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <Alert
                icon={<Check fontSize="inherit" />}
                sx={{
                  backgroundColor: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88',
                  mb: 2,
                  '& .MuiAlert-icon': { color: '#00ff88' },
                }}
              >
                {t('settingsSaved')}
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
              '&:hover': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)', transform: 'translateY(-2px)' },
            }}
          >
            {t('saveSettings')}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}