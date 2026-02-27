import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TranslateIcon from '@mui/icons-material/Translate';
import SettingsIcon from '@mui/icons-material/Settings';

function Sidebar({ onSelect }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1c1c1c',
          color: '#fff'
        },
      }}
    >
      <List>
        <ListItem button onClick={() => onSelect('dashboard')}>
          <ListItemIcon><HomeIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button onClick={() => onSelect('translator')}>
          <ListItemIcon><TranslateIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Traductor" />
        </ListItem>
        <ListItem button onClick={() => onSelect('settings')}>
          <ListItemIcon><SettingsIcon sx={{ color: '#fff' }} /></ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;