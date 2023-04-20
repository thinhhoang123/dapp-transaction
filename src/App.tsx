import { useState } from 'react';
import { Container } from '@mui/material';
import HeroSection from './components/HeroSections';

function App() {
  return (
    <Container maxWidth="lg">
      <HeroSection />
    </Container>
  );
}

export default App;

