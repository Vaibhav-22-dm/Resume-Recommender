import { ThemeProvider } from '@mui/material';
import './App.css';
import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import "./css/styles.css";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#F2F4F7',
      contrastText: '#5E5ADB',
    },
    secondary: {
      light: '#ff7961',
      main: '#5E5ADB',
      dark: '#4b46de',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      light: '#D0D5DD',
      main: '#344054',
      dark: '#F2F4F7',
      contrastText: '#FFFFFF',
    },
  },
  shadows: [
    "none",
    "0 0 6px rgba(0, 0, 0, 0.12)",
    "0 0 6px rgba(0, 0, 0, 0.12)",
    "0 0 6px rgba(0, 0, 0, 0.12)",
    "0 0 6px rgba(0, 0, 0, 0.12)",
    ...Array(20).fill('none')
  ]
});

function App() {

  return (

    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
