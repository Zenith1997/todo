import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {TextField, Button, Container, Typography, Box, Card, FormLabel, Link} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = (values, { setSubmitting }) => {
        // Simulate API call
        setTimeout(() => {
            register(values);
            navigate('/login');
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Card Wrapper */}
                <Card sx={{ padding: '24px', borderRadius: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Typography component="h1" variant="h5" sx={{ width: '100%', fontSize: 'clamp(1.75rem, 8vw, 2rem)', mb: 2 }}>
                        Register
                    </Typography>

                    {/* Formik Form */}
                    <Formik
                        initialValues={{ name: '', email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Box sx={{ mb: 1 }}>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        placeholder="Your Name"
                                        fullWidth
                                        margin="normal"
                                        error={touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                        InputProps={{
                                            style: { padding: '8px', fontSize: '14px' } // Adjust input padding and font size
                                        }}
                                        sx={{
                                            maxWidth: '300px', // Narrower width
                                            width: '100%', // Full width of container up to maxWidth
                                            mb: 1, // Reduced margin bottom
                                            height: '35px', // Set the height of the text field
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%', // Ensure the root matches the height
                                                '& input': {
                                                    padding: '8px', // Adjust input padding
                                                    boxSizing: 'border-box', // Include padding and border in the element's total width and height
                                                    height: '100%', // Ensure input height matches container height
                                                },
                                                '& fieldset': {
                                                    borderRadius: '8px',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mb: 1 }}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Field
                                        as={TextField}
                                        name="email"
                                        placeholder="your@email.com"
                                        fullWidth
                                        margin="normal"
                                        error={touched.email && !!errors.email}
                                        helperText={touched.email && errors.email}
                                        InputProps={{
                                            style: { padding: '8px', fontSize: '14px' } // Adjust input padding and font size
                                        }}
                                        sx={{
                                            maxWidth: '300px', // Narrower width
                                            width: '100%', // Full width of container up to maxWidth
                                            mb: 1, // Reduced margin bottom
                                            height: '35px', // Set the height of the text field
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%', // Ensure the root matches the height
                                                '& input': {
                                                    padding: '8px', // Adjust input padding
                                                    boxSizing: 'border-box', // Include padding and border in the element's total width and height
                                                    height: '100%', // Ensure input height matches container height
                                                },
                                                '& fieldset': {
                                                    borderRadius: '8px',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
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
                                            style: { padding: '8px', fontSize: '14px' } // Adjust input padding and font size
                                        }}
                                        sx={{
                                            maxWidth: '300px', // Narrower width
                                            width: '100%', // Full width of container up to maxWidth
                                            height: '35px', // Set the height of the text field
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%', // Ensure the root matches the height
                                                '& input': {
                                                    padding: '8px', // Adjust input padding
                                                    boxSizing: 'border-box', // Include padding and border in the element's total width and height
                                                    height: '100%', // Ensure input height matches container height
                                                },
                                                '& fieldset': {
                                                    borderRadius: '8px',
                                                },
                                            },
                                        }}
                                    />
                                </Box>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2, mb: 2, borderRadius: '8px', padding: '10px' }}
                                    disabled={isSubmitting}
                                >
                                    Register
                                </Button>
                                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                                    Already have an account? <Link href="/login">Log in</Link>
                                </Typography>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Box>
        </Container>
    );
};

export default Register;
