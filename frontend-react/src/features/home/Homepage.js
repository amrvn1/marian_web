import React from 'react';
import { Typography, Container } from '@mui/material';
import { GlassCard } from '../../shared/ui';

export default function Homepage() {
  return (
    <Container>
      <GlassCard>
        <Typography variant="h4" gutterBottom>Welcome to LvlUp</Typography>
        <Typography>Discover schools, book interviews, and pay with ease.</Typography>
      </GlassCard>
    </Container>
  );
}
