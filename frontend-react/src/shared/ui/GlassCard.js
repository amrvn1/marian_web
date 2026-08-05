import React from 'react';
import { Box } from '@mui/material';

export default function GlassCard({ children, sx = {}, ...props }) {
  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: 2,
        boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
        p: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
