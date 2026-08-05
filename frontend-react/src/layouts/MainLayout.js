import React from 'react';
import { Container, Box } from '@mui/material';
import { Navbar, GlassCard } from '../shared/ui';

export default function MainLayout({ children }) {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgba(20,27,51,1) 0%, rgba(28,36,59,1) 100%)',
      color: '#fff',
      pb: 6,
    }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <GlassCard sx={{ p: { xs: 2, md: 3 } }}>
          {children}
        </GlassCard>
      </Container>
    </Box>
  );
}
