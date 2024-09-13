import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Link,
    Card,
    FormLabel
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import theme   from "../theme";
// Validation schema for Formik
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const [isLogin,setLogin] = useState(true);
    const navigate = useNavigate();
    const { login } = useAuth();


    // Handle form submission
    const handleSubmit = (values, { setSubmitting }) => {
        // Simulate an API call
        setTimeout(() => {
            const success = login(values);
            if (success) {
                navigate('/');
                setLogin(true);
            } else {
             //   alert('Invalid credentials');
                setLogin(false);
            }
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Card
                    sx={{
                        padding: '24px',
                        borderRadius: '12px',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {!isLogin && (
                        <Typography variant="body" component="p"
                                    sx={{
                                        color: (theme) => theme.palette.error.main,  // Access the error color from the theme
                                    }}>
                            Your authentication information is incorrect. Please try again.
                        </Typography>
                    )}
                    <Typography
                        component="h1"
                        variant="h5"

                        sx={{
                            width: '100%',
                            fontSize: 'clamp(1.75rem, 8vw, 2rem)',
                            mb: 2
                        }}
                    >
                        Sign in
                    </Typography>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                            <Form>
                                {/* Email Field */}
                                <Box sx={{ mb: 2 }}>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        fullWidth
                                        margin="normal"
                                        placeholder="your@email.com"
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        InputProps={{
                                            style: { padding: '8px', fontSize: '14px' }
                                        }}
                                        sx={{
                                            maxWidth: '300px',
                                            width: '100%',
                                            height: '35px',
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%',
                                                '& input': {
                                                    padding: '8px',
                                                    boxSizing: 'border-box',
                                                    height: '100%'
                                                },
                                                '& fieldset': {
                                                    borderRadius: '8px'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Password Field */}
                                <Box sx={{ mb: 2 }}>
                                    <FormLabel  sx={{
                                        color: theme.palette.ashBlue.main, // Apply tertiary color from the theme
                                        fontWeight: 500,
                                        fontSize: '1rem',
                                        marginBottom: '8px',
                                        display: 'block',
                                    }} htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={TextField}
                                        name="password"
                                        type="password"
                                        placeholder="●●●●●●●"
                                        fullWidth
                                        margin="normal"
                                        error={touched.password && !!errors.password}
                                        helperText={touched.password && errors.password}
                                        InputProps={{
                                            style: { padding: '8px', fontSize: '14px' }
                                        }}
                                        sx={{
                                            maxWidth: '300px',
                                            width: '100%',
                                            height: '35px',
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%',
                                                '& input': {
                                                    padding: '8px',
                                                    boxSizing: 'border-box',
                                                    height: '100%'
                                                },
                                                '& fieldset': {
                                                    borderRadius: '8px'
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, borderRadius: '8px', padding: '10px' }}
                                    disabled={isSubmitting}
                                >
                                    <Typography>

                                        Sign in
                                    </Typography>
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    {/* Sign-up Link */}
                    <Typography
                        variant="body2"
                        sx={{ mt: 2, textAlign: 'center' }}
                    >
                        Don't have an account? <Link href="/register">Register</Link>
                    </Typography>
                </Card>
            </Box>
        </Container>
    );
};

export default Login;
