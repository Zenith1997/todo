import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#BFD9E8',  // Soft Blue for primary elements (relaxing and calming)
        },
        secondary: {
            main: '#A1C4E9',  // Light Blue for secondary elements (complementary to primary)
        },
        background: {
            default: '#F0F4F8',  // Very light grayish-blue background for the app (soothing and neutral)
            paper: '#FFFFFF',  // White background for paper/card elements (clean and fresh)
        },
        error: {
            main: '#F76C6C',  // Soft red for error, still gentle
        },
        success: {
            main: '#4CAF50',  // Green for success, natural and calming
        },
        text: {
            primary: '#333333',  // Dark gray for primary text, ensures readability
            secondary: '#555555',  // Medium gray for secondary text, softer than black
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#333333',  // Dark gray for h1 headers
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#333333',  // Dark gray for h2 headers
        },
        body1: {
            fontSize: '1rem',
            color: '#333333',  // Dark gray for body text
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',  // Button font size (14px)
            color: '#FFFFFF',  // White text for buttons
        },
        caption: {
            fontSize: '0.75rem',  // Smaller font size for captions (12px)
        },
        overline: {
            fontSize: '0.625rem',  // Even smaller font size for overlines (10px)
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 16px',
                },
                containedPrimary: {
                    backgroundColor: '#BFD9E8',  // Soft blue for primary buttons
                    '&:hover': {
                        backgroundColor: '#A1C4E9',  // Slightly darker blue on hover
                    },
                },
                containedSecondary: {
                    backgroundColor: '#A1C4E9',  // Light blue for secondary buttons
                    '&:hover': {
                        backgroundColor: '#8CB3D0',  // Slightly darker blue on hover
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: '16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    marginBottom: '24px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // Light shadow for cards
                    backgroundColor: '#FFFFFF',  // White background for card elements
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#BFD9E8',  // Soft blue for AppBar background
                },
            },
        },
    },
});

export default theme;
