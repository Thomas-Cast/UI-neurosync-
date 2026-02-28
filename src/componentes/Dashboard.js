import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import {
  Speed,
  CloudSync,
  Security,
  Psychology,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';

export function Dashboard() {
  const { setCurrentPage } = useNavigation();

  const cards = [
    {
      title: 'Traducción de señas con IA en tiempo real',
      description: 'Sincronización lingüística instantánea potenciada por IA para romper barreras.',
      icon: <CloudSync />,
      color: '#00d4ff',
      action: () => setCurrentPage('translator'),
    },
    {
      title: 'Diferentes formas de traducir',
      description: 'Sincroniza tus traducciones en todos tus dispositivos sin perder el ritmo.',
      icon: <Speed />,
      color: '#00ff88',
      action: () => setCurrentPage('settings'),
    },
    {
      title: 'Seguridad',
      description: 'Tus traducciones protegidas con estándares de seguridad de nivel corporativo.',
      icon: <Security />,
      color: '#ff006e',
      action: () => setCurrentPage('settings'),
    },
    {
      title: 'AI Assistant',
      description: 'Perfecciona tu comunicación con sugerencias e mejoras inteligentes.',
      icon: <Psychology />,
      color: '#ffd60a',
      action: () => setCurrentPage('translator'),
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}
    >
      <Box sx={{ mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Te damos la bienvenida a NeuroSync
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#b0b8cc',
              fontWeight: 400,
              fontSize: '1.1rem',
              maxWidth: '800px',
              lineHeight: 1.6,
            }}
          >
            Tu puente inteligente hacia un mundo sin barreras. 
            <strong> Traduce lengua de señas en cualquier idioma </strong> 
            y sincroniza tus conversaciones al instante con el poder de la IA.
          </Typography>
        </motion.div>
      </Box>

      {/* Grid responsivo: 1 columna en móvil, 2 en tablet, 4 en monitor grande */}
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={card.title}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              style={{ height: '100%' }}
            >
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(26, 31, 58, 0.4)',
                  backgroundImage: 'linear-gradient(135deg, rgba(26, 31, 58, 0.6) 0%, rgba(15, 20, 37, 0.8) 100%)',
                  border: `1px solid rgba(255, 255, 255, 0.1)`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(12px)',
                  position: 'relative',
                  overflow: 'visible', // Evita que los brillos o iconos se corten
                  '&:hover': {
                    borderColor: card.color,
                    boxShadow: `0 10px 40px ${card.color}25`,
                    transform: 'scale(1.02)',
                  },
                }}
                onClick={card.action}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Contenedor del Icono: Aquí corregimos el recorte */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                      borderRadius: '15px',
                      mb: 3,
                      backgroundColor: `${card.color}15`,
                      color: card.color,
                      boxShadow: `0 0 20px ${card.color}20`,
                      '& svg': {
                        fontSize: '32px', // Tamaño controlado para que no se salga
                      }
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      color: '#ffffff',
                      fontSize: '1.25rem',
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#7a8199',
                      mb: 3,
                      lineHeight: 1.7,
                      fontSize: '0.95rem'
                    }}
                  >
                    {card.description}
                  </Typography>

                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      color: card.color,
                      p: 0,
                      fontWeight: 700,
                      '&:hover': { background: 'transparent', letterSpacing: '1px' },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    EXPLORAR →
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