// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import theme from './theme';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <TodoList />
                    </PrivateRoute>
                  }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
