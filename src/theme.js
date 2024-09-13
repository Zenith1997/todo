import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D4B99A',  // Main beige for primary elements
        },
        secondary: {
            main: '#E8D8C2',  // Light beige for secondary elements
        },
        tertiary: {
            main: '#D9C4A7',  // Tertiary beige color
        },
        quaternary: {
            main: '#F0E8DA',  // Quaternary beige color
        },
        ashBlue: {
            main: '#9C9EAB',  // Ash blue color
        },
        background: {
            default: '#f6a7e7',  // Very light beige for the app background
            paper: '#FFFFFF',    // White for paper/card elements
        },
        error: {
            main: '#F76C6C',  // Soft red for errors
        },
        success: {
            main: '#8BC34A',  // Green for success
        },
        text: {
            primary: '#3E3B3A',  // Dark brown for primary text
            secondary: '#6D6B6A',  // Medium brown for secondary text
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#3E3B3A',  // Dark brown for headers
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#3E3B3A',  // Dark brown for headers
        },
        body1: {
            fontSize: '1rem',
            color: '#3E3B3A',  // Dark brown for body text
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',  // Button font size (14px)
            color: '#FFFFFF',  // White text for buttons
        },
        caption: {
            fontSize: '0.75rem',  // Smaller font size for captions
        },
        overline: {
            fontSize: '0.625rem',  // Even smaller font size for overlines
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
                    backgroundColor: '#D4B99A',  // Main beige for primary buttons
                    '&:hover': {
                        backgroundColor: '#B89C81',  // Slightly darker beige on hover
                    },
                },
                containedSecondary: {
                    backgroundColor: '#E8D8C2',  // Light beige for secondary buttons
                    '&:hover': {
                        backgroundColor: '#D0C1A2',  // Slightly darker beige on hover
                    },
                },
                containedTertiary: {
                    backgroundColor: '#D9C4A7',  // Tertiary beige for buttons
                    '&:hover': {
                        backgroundColor: '#BFAF8D',  // Slightly darker beige on hover
                    },
                },
                containedQuaternary: {
                    backgroundColor: '#F0E8DA',  // Quaternary beige for buttons
                    '&:hover': {
                        backgroundColor: '#D9D2C4',  // Slightly darker beige on hover
                    },
                },
                containedAshBlue: {
                    backgroundColor: '#9C9EAB',  // Ash blue for buttons
                    '&:hover': {
                        backgroundColor: '#8C8F9A',  // Slightly darker ash blue on hover
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
                    backgroundColor: '#F7F4F1',  // Very light beige for cards
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#D4B99A',  // Main beige for AppBar background
                },
            },
        },
    },
});

export default theme;
