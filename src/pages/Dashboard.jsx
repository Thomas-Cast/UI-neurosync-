import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {
  Speed,
  CloudSync,
  Security,
  Psychology,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Dashboard() {
  const { setCurrentPage } = useApp();
  const { t } = useLanguage();

  const cards = [
    {
      title: t('startTranslating'),
      description: 'Translate text instantly with AI-powered accuracy',
      icon: <CloudSync sx={{ fontSize: 40 }} />,
      color: '#00d4ff',
      action: () => setCurrentPage('translator'),
    },
    {
      title: t('manageSetting'),
      description: 'Customize your preferences and app settings',
      icon: <Speed sx={{ fontSize: 40 }} />,
      color: '#00ff88',
      action: () => setCurrentPage('settings'),
    },
    {
      title: 'Security First',
      description: 'Enterprise-grade security for your translations',
      icon: <Security sx={{ fontSize: 40 }} />,
      color: '#ff006e',
      action: () => {},
    },
    {
      title: 'AI Assistant',
      description: 'Get intelligent suggestions and improvements',
      icon: <Psychology sx={{ fontSize: 40 }} />,
      color: '#ffd60a',
      action: () => setCurrentPage('translator'),
    },
  ];

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ width: '100%' }}>
      <Box sx={{ mb: 6 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('welcome')}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#7a8199',
              fontWeight: 400,
              fontSize: '1rem',
            }}
          >
            {t('subtitle')}
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} lg={3} key={card.title}>
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -8 }}>
              <Card
                onClick={card.action}
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(26, 31, 58, 0.6)',
                  backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                  border: `1px solid rgba(${
                    card.color === '#00d4ff'
                      ? '0, 212, 255'
                      : card.color === '#00ff88'
                        ? '0, 255, 136'
                        : card.color === '#ff006e'
                          ? '255, 0, 110'
                          : '255, 214, 10'
                  }, 0.2)`,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backdropFilter: 'blur(10px)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${card.color}33 0%, transparent 100%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    borderColor: card.color,
                    boxShadow: `0 0 30px ${card.color}40`,
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ mb: 2, color: card.color }}>
                    {card.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: '#ffffff',
                      fontSize: '1.1rem',
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#b0b8cc',
                      mb: 3,
                      lineHeight: 1.6,
                    }}
                  >
                    {card.description}
                  </Typography>

                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: card.color,
                      borderColor: card.color,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      '&:hover': {
                        backgroundColor: `${card.color}20`,
                        borderColor: card.color,
                      },
                    }}
                  >
                    {t('learnMore')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}