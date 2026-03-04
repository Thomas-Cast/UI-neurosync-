import { Box, Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { Email, PhoneInTalk, LiveHelp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function Help() {
  const { t } = useLanguage();

  const supportChannels = [
    {
      icon: <Email sx={{ fontSize: 40 }} />,
      title: 'Email Support',
      description: t('email'),
      color: '#00d4ff',
    },
    {
      icon: <PhoneInTalk sx={{ fontSize: 40 }} />,
      title: 'Live Chat',
      description: t('liveChat'),
      color: '#00ff88',
    },
    {
      icon: <LiveHelp sx={{ fontSize: 40 }} />,
      title: t('faqTitle'),
      description: 'Browse our comprehensive FAQ section for quick answers',
      color: '#ffd60a',
    },
  ];

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ width: '100%' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('helpTitle')}
        </Typography>
        <Typography sx={{ color: '#7a8199', mb: 4 }}>
          We're here to help you get the most out of NeuroSync. Contact us through any of the channels below.
        </Typography>
      </motion.div>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {supportChannels.map((channel, index) => (
          <Grid item xs={12} sm={6} lg={4} key={channel.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(26, 31, 58, 0.6)',
                  backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                  border: `1px solid rgba(${
                    channel.color === '#00d4ff'
                      ? '0, 212, 255'
                      : channel.color === '#00ff88'
                        ? '0, 255, 136'
                        : '255, 214, 10'
                  }, 0.2)`,
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: channel.color,
                    boxShadow: `0 0 30px ${channel.color}40`,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ color: channel.color, mb: 2 }}>
                    {channel.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#ffffff' }}>
                    {channel.title}
                  </Typography>
                  <Typography sx={{ color: '#b0b8cc' }}>
                    {channel.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <Card
          sx={{
            backgroundColor: 'rgba(26, 31, 58, 0.6)',
            backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#00d4ff' }}>
            Send us a message
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 212, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(0, 212, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                  },
                  '& .MuiOutlinedInput-input::placeholder': { color: '#7a8199' },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 212, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(0, 212, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(0, 212, 255, 0.02)',
                    '& fieldset': { borderColor: 'rgba(0, 212, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'rgba(0, 212, 255, 0.5)' },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                  color: '#000000',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  py: 1.5,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
    </Box>
  );
}