import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { TransactionsProvider } from './context/TransactionContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </ThemeProvider>
  </React.StrictMode>
);

