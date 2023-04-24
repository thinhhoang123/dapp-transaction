import { useState } from 'react';
import { Container } from '@mui/material';
import HeroSection from './components/HeroSections';
import Transactions from './components/Transactions';

function App() {
  return (
    <>
      <main className="main-project">
        <Container maxWidth="lg" className="back">
          <HeroSection />
          <Transactions />
        </Container>
      </main>
    </>
  );
}

export default App;

