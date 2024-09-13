import React from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Box, Button, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const AddTodoModal = ({ open, onClose, newTodo, setNewTodo, addTodo }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
                    alignItems="center"
                    sx={{ mt: 2 }}
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{ flexGrow: 1 }}
                    >
                        <TextField
                            select
                            label="Priority"
                            value={newTodo.priority}
                            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                            sx={{ mr: 2, width: '150px' }} // Add margin-right for spacing
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
                                sx={{ ml: 2 }} // Add margin-left for spacing
                            />
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    onClick={addTodo}
                    sx={{ mt: 2 }}
                >
                    Add Todo
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AddTodoModal;
