import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

// Estilo para el título principal con gradiente
const fullTitleStyles = {
  fontWeight: 800,
  lineHeight: 1.1,
  background: 'linear-gradient(180deg, #ffffff 0%, #00d4ff 50%, #ffffff 100%)',
  backgroundSize: '100% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'background-position 0.8s ease-in-out',
  '&:hover': { backgroundPosition: '0% 100%' }
};

// Estilo para las palabras resaltadas en neón
const neonHighlight = {
  color: '#00d4ff',
  fontWeight: 'bold',
  fontSize: '1.2rem', // Un poco más grande que el texto base
  textShadow: '0 0 10px rgba(0, 212, 255, 0.6)',
  display: 'inline-block'
};

export function Dashboard() {
  return (
    <Box sx={{ 
      color: '#fff', 
      px: 6, 
      py: 2, 
      width: '100%', 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center' 
    }}>
      <Grid container spacing={2} alignItems="center" wrap="nowrap">
        
        {/* LADO IZQUIERDO: TEXTO Y CONTENIDO */}
        <Grid item xs={12} md={5}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" sx={{ ...fullTitleStyles, fontSize: { md: '3.5rem', lg: '4rem' }, mb: 2 }}>
              NeuroSync: <br />
              Sincronizando el Lenguaje, <br />
              conectando mundos.
            </Typography>
            
            <Typography sx={{ color: '#b0b8cc', mb: 4, fontSize: '1.1rem', maxWidth: '480px', lineHeight: 1.7 }}>
              La primera interfaz inteligente que transforma el lenguaje de señas en comunicación universal mediante {' '}
              <Box component="span" sx={neonHighlight}>
                visión computacional
              </Box> {' '}
              en {' '}
              <Box component="span" sx={neonHighlight}>
                tiempo real.
              </Box>
            </Typography>

            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: 'rgba(0, 212, 255, 0.1)', 
                border: '2px solid #00d4ff', 
                color: '#00d4ff',
                borderRadius: '15px', 
                px: 4, py: 1.5, 
                fontWeight: 'bold', 
                textTransform: 'none',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 212, 255, 0.2)', 
                  boxShadow: '0 0 25px #00d4ff',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Comenzar Traducción
            </Button>
          </motion.div>
        </Grid>

        {/* LADO DERECHO: VIDEO (Formato Prototipo) */}
        <Grid item xs={12} md={7}>
          <Box sx={{ width: '100%', pl: { md: 4 } }}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                borderRadius: '30px',
                backgroundColor: '#000',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                width: '100%',
                aspectRatio: '16/10', 
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(0, 212, 255, 0.2)'
              }}
            >
              {/* Video limpio sin controles ni interacción */}
              <video
                autoPlay 
                loop 
                muted 
                playsInline
                disablePictureInPicture
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  pointerEvents: 'none' 
                }}
              >
                <source src="/NeuroSyncVideoPagWeb.mp4" type="video/mp4" />
              </video>

              {/* Status Online - Estilo Prototipo */}
              <Box sx={{ 
                position: 'absolute', 
                top: 20, 
                right: 25, 
                border: '1px solid #00d4ff', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: '8px',
                backgroundColor: 'rgba(5, 7, 20, 0.6)', 
                backdropFilter: 'blur(4px)',
                zIndex: 10
              }}>
                <Typography sx={{ fontSize: '0.65rem', color: '#00d4ff', fontWeight: 'bold', letterSpacing: '1px' }}>
                   STATUS: ONLINE
                </Typography>
              </Box>

              {/* Efecto de línea de escaneo sutil */}
              <Box
                component={motion.div}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                sx={{
                  position: 'absolute',
                  left: 0, 
                  width: '100%', 
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                  zIndex: 2, 
                  opacity: 0.2
                }}
              />
            </Paper>
          </Box>
        </Grid>

      </Grid>
    </Box>
  );
}