import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';

import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import i18n from './utils/i18n';
import './styles/variables.css';
import HomePage from './pages/HomePage';


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;