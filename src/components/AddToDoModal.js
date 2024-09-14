import React from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Box, Button, MenuItem, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';  // Import the close icon
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const AddTodoModal = ({ open, onClose, newTodo, setNewTodo, addTodo, isMobile }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={isMobile}  // This will make it fullscreen on mobile devices
        >
            {/* Conditionally render the close button in mobile view */}
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                    aria-label="close"
                >
                    <Close />
                </IconButton>


            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mt: 2 }}
                >
                    <TextField
                        select
                        label="Priority"
                        value={newTodo.priority}
                        onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                        sx={{ width: '150px', mr: 2 }} // Set consistent width for Priority field
                    >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </TextField>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Due Date and Time"
                            value={newTodo.date}
                            onChange={(date) => setNewTodo({ ...newTodo, date })}
                            renderInput={(params) => <TextField {...params} margin="normal" />}
                            sx={{ width: 'auto', flexGrow: 1 }} // Make the DateTimePicker take up remaining space
                        />
                    </LocalizationProvider>
                </Box>
                <Button
                    variant="contained"
                    onClick={addTodo}
                    sx={{ mt: 3 }}
                    fullWidth
                >
                    Add Task
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddTodoModal;
