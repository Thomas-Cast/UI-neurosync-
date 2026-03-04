import { Box, Card, CardContent, Typography, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Help as HelpIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export function UserManual() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('gettingStarted'),
      content: 'Learn how to get started with NeuroSync in just a few minutes. Create an account, customize your settings, and start translating.',
    },
    {
      title: t('features'),
      content: 'Explore all available features including real-time translation, auto-save functionality, and language preferences.',
    },
    {
      title: t('troubleshooting'),
      content: 'Find solutions to common issues and get help with frequently encountered problems.',
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
          {t('userManualTitle')}
        </Typography>
        <Typography sx={{ color: '#7a8199', mb: 4 }}>
          {t('userManualContent')}
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid item xs={12} key={section.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Accordion
                sx={{
                  backgroundColor: 'rgba(26, 31, 58, 0.6)',
                  backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { borderColor: 'rgba(0, 212, 255, 0.4)' },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#00d4ff' }} />}>
                  <HelpIcon sx={{ mr: 2, color: '#00d4ff' }} />
                  <Typography sx={{ fontWeight: 600, color: '#ffffff' }}>
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ color: '#b0b8cc', borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}>
                  {section.content}
                </AccordionDetails>
              </Accordion>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <Card
          sx={{
            mt: 4,
            backgroundColor: 'rgba(26, 31, 58, 0.6)',
            backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8) 0%, rgba(15, 20, 37, 0.8) 100%)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#00ff88' }}>
              Video Tutorials
            </Typography>
            <Typography sx={{ color: '#b0b8cc' }}>
              Video tutorials and technical drawings will be available soon to help you master all features of NeuroSync.
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}