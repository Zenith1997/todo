import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D4B99A',  // Beige for primary elements (warm and neutral)
        },
        secondary: {
            main: '#F0E5D8',  // Light beige for secondary elements (complementary to primary)
        },
        background: {
            default: '#FAF9F6',  // Very light beige background for the app (soft and neutral)
            paper: '#FFFFFF',    // White background for paper/card elements (clean and fresh)
        },
        error: {
            main: '#ff2a2a',  //  red for error (noticeable)
        },
        success: {
            main: '#81C784',  // Green for success (natural and calming)
        },
        text: {
            primary: '#4A4A4A',  // Dark gray for primary text (good readability)
            secondary: '#6D6D6D',  // Medium gray for secondary text (softer than black)
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#4A4A4A',  // Dark gray for h1 headers
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#4A4A4A',  // Dark gray for h2 headers
        },
        body1: {
            fontSize: '1rem',
            color: '#4A4A4A',  // Dark gray for body text
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
                    backgroundColor: '#D4B99A',  // Beige for primary buttons
                    '&:hover': {
                        backgroundColor: '#B89C81',  // Slightly darker beige on hover
                    },
                },
                containedSecondary: {
                    backgroundColor: '#F0E5D8',  // Light beige for secondary buttons
                    '&:hover': {
                        backgroundColor: '#D1C4A9',  // Slightly darker beige on hover
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
                    backgroundColor: '#D4B99A',  // Beige for AppBar background
                },
            },
        },
    },
});

export default theme;
