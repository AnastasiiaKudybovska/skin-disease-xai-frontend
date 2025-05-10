import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';
import Navbar from './components/Navbar/Navbar';

import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import i18n from './utils/i18n';
import './styles/variables.css';
import HomePage from './pages/HomePage';
import Footer from './components/Footer/Footer';
import DiagnosticPage from './pages/DiagnosticPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() {
  const location = useLocation(); 
  const { pathname } = location; 

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/diagnostics" element={<DiagnosticPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<RegisterPage/>} />
        </Routes>
      {(pathname === '/login' || '/signup') ? null : <Footer />}
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;