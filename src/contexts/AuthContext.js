import React, { createContext, useState, useContext } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to provide the authentication context to the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Register function to store the user
    const register = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // Login function to validate user credentials and set the user
    const login = (userData) => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === userData.email && storedUser.password === userData.password) {
            setUser(storedUser);
            return true; // Successful login
        } else {
            return false; // Failed login
        }
    };

    // Logout function to clear user data from the state and localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Check if a user is authenticated
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
